const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("let quranTrackerRecord=null,quranTrackerSaving=false;");
const end = source.indexOf("\nfunction renderQuranTracker", start);
if (start < 0 || end < 0) throw new Error("Quran tracker persistence helpers were not found");
const helperSource = source.slice(start, end);

function makeContext({ local = null, remote = null, cloudGetError = false, putItem = async () => {} } = {}) {
  const context = {
    quranTrackerRecord: null,
    allItems: async () => local ? [local] : [],
    putItem,
    currentUser: remote || cloudGetError ? { uid: "test-user" } : null,
    cloud: remote || cloudGetError ? { collection: () => ({ doc: () => ({ collection: () => ({ doc: () => ({
      get: async () => { if (cloudGetError) throw new Error("network unavailable"); return { exists: !!remote, data: () => remote }; },
      set: async () => {}
    }) }) }) }) } : null,
    navigator: { onLine: !!(remote || cloudGetError) },
    toast: () => {},
    renderQuranTracker: () => {},
    syncCloud: () => {},
    localDateKey: () => "2026-11-25",
    $: () => ({ value: "" }),
    console: { error: () => {}, warn: () => {} },
    Date
  };
  vm.runInNewContext(helperSource + "\nglobalThis.persist=persistQuranTracker; globalThis.load=loadQuranTracker; globalThis.isSaving=()=>quranTrackerSaving; globalThis.record=()=>quranTrackerRecord; globalThis.setRecord=(v)=>quranTrackerRecord=v;", context);
  return context;
}

test("failed Quran tracker write preserves the previous record", async () => {
  const original = { id: "system-quran-tracker", entries: [{ entryId: "old", pages: 3 }] };
  const context = makeContext({ putItem: async () => { throw new Error("disk full"); } });
  context.setRecord(original);
  const draft = { ...original, entries: [...original.entries, { entryId: "new", pages: 2 }] };
  assert.equal(await context.persist(draft), false);
  assert.equal(context.record(), original);
  assert.equal(context.record().entries.length, 1);
  assert.equal(context.isSaving(), false);
});

test("successful Quran tracker write commits only after IndexedDB succeeds", async () => {
  let stored;
  const context = makeContext({ putItem: async value => { stored = value; } });
  const original = { id: "system-quran-tracker", entries: [] };
  context.setRecord(original);
  const draft = { ...original, entries: [{ entryId: "new", pages: 4 }] };
  assert.equal(await context.persist(draft), true);
  assert.equal(stored, draft);
  assert.equal(context.record(), draft);
});

test("overlapping Quran tracker writes are rejected", async () => {
  let release;
  const context = makeContext({ putItem: () => new Promise(resolve => { release = resolve; }) });
  const original = { id: "system-quran-tracker", entries: [] };
  context.setRecord(original);
  const first = context.persist({ ...original, entries: [{ entryId: "first" }] });
  await Promise.resolve();
  assert.equal(await context.persist({ ...original, entries: [{ entryId: "second" }] }), false);
  release();
  assert.equal(await first, true);
  assert.equal(context.record().entries[0].entryId, "first");
  assert.equal(context.isSaving(), false);
});

test("failed local persistence of newer cloud Quran data keeps the older local record", async () => {
  const local = { id: "system-quran-tracker", entries: [{ entryId: "local" }], updatedAt: 10 };
  const remote = { id: "system-quran-tracker", entries: [{ entryId: "remote" }], updatedAt: 20 };
  const context = makeContext({ local, remote, putItem: async () => { throw new Error("disk full"); } });
  assert.equal(await context.load(), true);
  assert.equal(context.record(), local);
  assert.equal(context.record().entries[0].entryId, "local");
});

test("failed initial Quran tracker creation does not expose an unsaved empty record", async () => {
  const context = makeContext({ putItem: async () => { throw new Error("disk full"); } });
  assert.equal(await context.load(), false);
  assert.equal(context.record(), null);
});


test("cloud read failure still loads an existing local Quran tracker", async () => {
  const local = { id: "system-quran-tracker", entries: [{ entryId: "safe-local" }], updatedAt: 10 };
  const context = makeContext({ local, cloudGetError: true });
  assert.equal(await context.load(), true);
  assert.equal(context.record(), local);
  assert.equal(context.record().entries[0].entryId, "safe-local");
});

test("newer cloud Quran data is persisted locally before becoming active", async () => {
  const local = { id: "system-quran-tracker", entries: [{ entryId: "old-local" }], updatedAt: 10 };
  const remote = { id: "system-quran-tracker", entries: [{ entryId: "new-cloud" }], updatedAt: 20 };
  let stored;
  const context = makeContext({ local, remote, putItem: async value => { stored = value; } });
  assert.equal(await context.load(), true);
  assert.equal(stored, remote);
  assert.equal(context.record(), remote);
  assert.equal(context.record().entries[0].entryId, "new-cloud");
});
