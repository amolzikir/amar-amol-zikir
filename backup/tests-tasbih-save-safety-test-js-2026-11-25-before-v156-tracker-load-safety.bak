const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("let tasbihSaving=false;");
const end = source.indexOf("\nfunction tasbihFeedback", start);
if (start < 0 || end < 0) throw new Error("Tasbih persistence helpers were not found");
const helperSource = source.slice(start, end);

function makeContext(putItem) {
  const context = {
    tasbihRecord: { id: "system-tasbih-counter", count: 12, target: 33, zikr: "سبحان الله" },
    putItem,
    updateTasbihUI: () => {},
    currentUser: null,
    cloud: null,
    navigator: { onLine: false },
    scheduleCloudSyncRetry: () => {},
    toast: () => {},
    console: { error: () => {}, warn: () => {} },
    Date
  };
  vm.runInNewContext(helperSource + "\nglobalThis.persist=persistTasbih; globalThis.isSaving=()=>tasbihSaving;", context);
  return context;
}

test("failed Tasbih write leaves the previous count untouched", async () => {
  const original = { id: "system-tasbih-counter", count: 12, target: 33 };
  const context = makeContext(async () => { throw new Error("disk full"); });
  context.tasbihRecord = original;
  assert.equal(await context.persist({ ...original, count: 13 }), false);
  assert.equal(context.tasbihRecord, original);
  assert.equal(context.tasbihRecord.count, 12);
  assert.equal(context.isSaving(), false);
});

test("successful Tasbih write commits only after IndexedDB succeeds", async () => {
  let stored;
  const context = makeContext(async value => { stored = value; });
  const original = context.tasbihRecord;
  assert.equal(await context.persist({ ...original, count: 13 }), true);
  assert.equal(stored.count, 13);
  assert.equal(context.tasbihRecord.count, 13);
  assert.notEqual(context.tasbihRecord, original);
});

test("overlapping Tasbih writes are rejected without overwriting the first", async () => {
  let release;
  const context = makeContext(() => new Promise(resolve => { release = resolve; }));
  const first = context.persist({ ...context.tasbihRecord, count: 13 });
  await Promise.resolve();
  assert.equal(await context.persist({ ...context.tasbihRecord, count: 14 }), false);
  release();
  assert.equal(await first, true);
  assert.equal(context.tasbihRecord.count, 13);
  assert.equal(context.isSaving(), false);
});

const loadStart = source.indexOf("async function loadTasbih(){");
const loadEnd = source.indexOf("\nI18N[", loadStart);
if (loadStart < 0 || loadEnd < 0) throw new Error("Tasbih loader was not found");
const loadSource = source.slice(loadStart, loadEnd);

function makeLoadContext({ local, remote, putItem }) {
  const context = {
    tasbihRecord: null,
    allItems: async () => local ? [local] : [],
    putItem,
    currentUser: null,
    cloud: null,
    navigator: { onLine: false },
    toast: () => {},
    updateTasbihUI: () => {},
    console: { error: () => {}, warn: () => {} },
    Date
  };
  if (remote) {
    context.currentUser = { uid: "test-user" };
    context.navigator.onLine = true;
    context.cloud = { collection: () => ({ doc: () => ({ collection: () => ({ doc: () => ({
      get: async () => ({ exists: true, data: () => remote }),
      set: async () => {}
    }) }) }) }) };
  }
  vm.runInNewContext(loadSource + "\nglobalThis.load=loadTasbih;", context);
  return context;
}

test("failed local persistence of newer cloud count keeps the older local record active", async () => {
  const local = { id: "system-tasbih-counter", count: 7, updatedAt: 10 };
  const remote = { id: "system-tasbih-counter", count: 19, updatedAt: 20 };
  const context = makeLoadContext({ local, remote, putItem: async () => { throw new Error("disk full"); } });
  assert.equal(await context.load(), true);
  assert.equal(context.tasbihRecord, local);
  assert.equal(context.tasbihRecord.count, 7);
});

test("failed creation of initial local counter does not expose an unsaved zero record", async () => {
  const context = makeLoadContext({ local: null, remote: null, putItem: async () => { throw new Error("disk full"); } });
  assert.equal(await context.load(), false);
  assert.equal(context.tasbihRecord, null);
});
