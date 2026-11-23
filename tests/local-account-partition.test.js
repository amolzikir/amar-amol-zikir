const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf('const DB_NAME="AmolZikirLocal"');
const end = source.indexOf("\nlet dbLocal,", start);
if (start < 0 || end < 0) throw new Error("Account database helpers were not found in index.html");
const helpers = source.slice(start, end);

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function makeEnvironment(seed = {}, storageSeed = {}) {
  const databases = new Map();
  for (const [name, records] of Object.entries(seed)) {
    const db = makeDb(name);
    for (const item of records) db.items.set(item.id, clone(item));
    databases.set(name, db);
  }
  function makeDb(name) {
    return {
      name, items: new Map(), closed: false,
      objectStoreNames: { contains: () => true },
      createObjectStore() {},
      close() { this.closed = true; },
      transaction(_storeName, mode) {
        const db = this;
        const tx = {
          objectStore() {
            return {
              getAll() {
                const req = {};
                queueMicrotask(() => { req.result = [...db.items.values()].map(clone); req.onsuccess?.(); });
                return req;
              },
              put(item) {
                db.items.set(item.id, clone(item));
                const req = {};
                queueMicrotask(() => { req.onsuccess?.(); if (mode === "readwrite") tx.oncomplete?.(); });
                return req;
              }
            };
          }
        };
        return tx;
      }
    };
  }
  const indexedDB = {
    open(name) {
      const req = {};
      queueMicrotask(() => {
        let db = databases.get(name);
        if (!db) {
          db = makeDb(name);
          databases.set(name, db);
          req.result = db;
          req.onupgradeneeded?.();
        } else req.result = db;
        req.onsuccess?.();
      });
      return req;
    }
  };
  const values = new Map(Object.entries(storageSeed));
  const localStorage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
  const context = { indexedDB, localStorage, console, Promise, Map, String, Number, JSON, Error, queueMicrotask };
  const code = `let dbLocal=null,dailyAmalRecord=null,tasbihRecord=null,quranTrackerRecord=null,currentUser=null;\n${helpers}\nglobalThis.inspect=()=>({dbLocal,activeLocalDbName,localCloudAccountAllowed,personalStorageKey});`;
  vm.runInNewContext(code, context);
  return { context, databases, values };
}

test("first owner receives a verified copy while the legacy database remains intact", async () => {
  const legacyItem = { id: "note-1", type: "note", title: "পুরোনো নোট", updatedAt: 10 };
  const env = makeEnvironment({ AmolZikirLocal: [legacyItem] }, { "amol-local-cloud-owner-uid": "user-a" });
  await vm.runInNewContext("selectLocalDatabase('user-a')", env.context);
  const state = env.context.inspect();
  assert.equal(state.activeLocalDbName, "AmolZikirLocalAccount_user-a");
  assert.equal(state.localCloudAccountAllowed("user-a"), true);
  assert.deepEqual(env.databases.get("AmolZikirLocalAccount_user-a").items.get("note-1"), legacyItem);
  assert.deepEqual(env.databases.get("AmolZikirLocal").items.get("note-1"), legacyItem);
  assert.equal(env.values.get("amol-local-db-v129-user-a"), "done");
});

test("a different Google account gets a separate empty database, not the legacy user's notes", async () => {
  const legacyItem = { id: "private-a", type: "note", title: "A-এর নোট", updatedAt: 10 };
  const env = makeEnvironment({ AmolZikirLocal: [legacyItem] }, { "amol-local-cloud-owner-uid": "user-a" });
  await vm.runInNewContext("selectLocalDatabase('user-b')", env.context);
  const state = env.context.inspect();
  assert.equal(state.activeLocalDbName, "AmolZikirLocalAccount_user-b");
  assert.equal(state.localCloudAccountAllowed("user-b"), true);
  assert.equal(env.databases.get("AmolZikirLocalAccount_user-b").items.size, 0);
  assert.deepEqual(env.databases.get("AmolZikirLocal").items.get("private-a"), legacyItem);
  assert.equal(state.localCloudAccountAllowed("user-a"), false);
});

test("newer target records win and deleted timestamps participate in merge ordering", async () => {
  const env = makeEnvironment();
  const merged = vm.runInNewContext(`mergeMigrationItems(
    [
      {id:"same",title:"legacy-old",updatedAt:10},
      {id:"deleted",title:"legacy-delete",updatedAt:10,deletedAt:40},
      {id:"new",title:"legacy-new",updatedAt:20}
    ],
    [
      {id:"same",title:"target-new",updatedAt:30},
      {id:"deleted",title:"target-old",updatedAt:15},
      {id:"keep",title:"target-only",updatedAt:5}
    ]
  )`, env.context);
  const byId = new Map(merged.map(x => [x.id, x]));
  assert.equal(byId.get("same").title, "target-new");
  assert.equal(byId.get("deleted").deletedAt, 40);
  assert.equal(byId.get("new").title, "legacy-new");
  assert.equal(byId.get("keep").title, "target-only");
});

test("returning to the first account reopens its own saved database", async () => {
  const env = makeEnvironment({ AmolZikirLocal: [{ id: "old", type: "note", title: "legacy", updatedAt: 1 }] }, { "amol-local-cloud-owner-uid": "user-a" });
  await vm.runInNewContext("selectLocalDatabase('user-a')", env.context);
  env.databases.get("AmolZikirLocalAccount_user-a").items.set("a-only", { id: "a-only", title: "A private" });
  await vm.runInNewContext("selectLocalDatabase('user-b')", env.context);
  await vm.runInNewContext("selectLocalDatabase('user-a')", env.context);
  const state = env.context.inspect();
  assert.equal(state.activeLocalDbName, "AmolZikirLocalAccount_user-a");
  assert.equal(env.databases.get("AmolZikirLocalAccount_user-a").items.has("a-only"), true);
});

test("personal favorites and routines migrate only into their original account", async () => {
  const env = makeEnvironment({ AmolZikirLocal: [] }, {
    "amol-local-cloud-owner-uid": "user-a",
    "amol-dua-favorites": "[\"dua-1\"]",
    "amol-zikr-routines": "[{\"id\":\"routine-a\"}]"
  });
  await vm.runInNewContext("selectLocalDatabase('user-a')", env.context);
  const state = env.context.inspect();
  assert.equal(state.personalStorageKey("amol-dua-favorites"), "amol-dua-favorites::account::user-a");
  assert.equal(env.values.get("amol-dua-favorites::account::user-a"), "[\"dua-1\"]");
  assert.equal(state.personalStorageKey("amol-zikr-routines"), "amol-zikr-routines::account::user-a");
  assert.equal(env.values.get("amol-zikr-routines::account::user-a"), "[{\"id\":\"routine-a\"}]");
  await vm.runInNewContext("currentUser={uid:'user-b'};selectLocalDatabase('user-b')", env.context);
  const other = env.context.inspect();
  assert.equal(other.personalStorageKey("amol-dua-favorites"), "amol-dua-favorites::account::user-b");
  assert.equal(env.values.has("amol-dua-favorites::account::user-b"), false);
  assert.equal(env.values.get("amol-dua-favorites"), "[\"dua-1\"]");
});

test("guest personal storage never inherits a signed-in owner's favorites", async () => {
  const env = makeEnvironment({ AmolZikirLocal: [] }, {
    "amol-local-cloud-owner-uid": "user-a",
    "amol-dua-favorites": "[\"private-dua\"]"
  });
  await vm.runInNewContext("selectLocalDatabase(null)", env.context);
  const state = env.context.inspect();
  assert.equal(state.personalStorageKey("amol-dua-favorites"), "amol-dua-favorites::guest");
  assert.equal(env.values.has("amol-dua-favorites::guest"), false);
});
