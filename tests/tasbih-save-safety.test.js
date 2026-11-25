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
