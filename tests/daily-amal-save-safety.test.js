const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("let dailyAmalSaving=false;");
const end = source.indexOf("\nasync function addDailyAmal", start);
if (start < 0 || end < 0) throw new Error("Daily Amal persistence helper was not found");
const helperSource = source.slice(start, end);

function makeContext(putItem) {
  const context = {
    dailyAmalRecord: { id: "system-daily-amal", items: [{ id: "a", name: "ফজর" }], days: {} },
    putItem,
    currentUser: null,
    cloud: null,
    navigator: { onLine: false },
    toast: () => {},
    console: { error: () => {}, warn: () => {} },
    Date
  };
  vm.runInNewContext(helperSource + "\nglobalThis.persist=persistDailyAmal; globalThis.isSaving=()=>dailyAmalSaving;", context);
  return context;
}

test("failed local write leaves the original Daily Amal record untouched", async () => {
  const original = { id: "system-daily-amal", items: [{ id: "a", name: "ফজর" }], days: {} };
  const context = makeContext(async () => { throw new Error("disk full"); });
  context.dailyAmalRecord = original;
  const draft = JSON.parse(JSON.stringify(original));
  draft.items[0].name = "পরিবর্তিত";
  assert.equal(await context.persist(draft), false);
  assert.equal(context.dailyAmalRecord, original);
  assert.equal(context.dailyAmalRecord.items[0].name, "ফজর");
  assert.equal(context.isSaving(), false);
});

test("successful local write commits the draft only after putItem succeeds", async () => {
  let stored;
  const context = makeContext(async value => { stored = value; });
  const original = context.dailyAmalRecord;
  const draft = JSON.parse(JSON.stringify(original));
  draft.items.push({ id: "b", name: "যোহর" });
  assert.equal(await context.persist(draft), true);
  assert.equal(stored, draft);
  assert.equal(context.dailyAmalRecord, draft);
  assert.equal(context.dailyAmalRecord.items.length, 2);
});

test("parallel Daily Amal writes are serialized and the second write is rejected", async () => {
  let release;
  const context = makeContext(() => new Promise(resolve => { release = resolve; }));
  const firstDraft = JSON.parse(JSON.stringify(context.dailyAmalRecord));
  firstDraft.items[0].name = "প্রথম";
  const first = context.persist(firstDraft);
  await Promise.resolve();
  const secondDraft = JSON.parse(JSON.stringify(context.dailyAmalRecord));
  secondDraft.items[0].name = "দ্বিতীয়";
  assert.equal(await context.persist(secondDraft), false);
  release();
  assert.equal(await first, true);
  assert.equal(context.dailyAmalRecord.items[0].name, "প্রথম");
});


test("editing an Amal target preserves historical daily counts", async () => {
  const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  const start = source.indexOf("async function editDailyAmal(id){");
  const end = source.indexOf("\\nasync function moveDailyAmal", start);
  if (start < 0 || end < 0) throw new Error("Daily Amal edit function was not found");
  const context = {
    dailyAmalRecord: {
      id: "system-daily-amal",
      items: [{ id: "a", name: "ফজর", target: 100 }],
      days: { "2026-11-24": { a: 80 } }
    },
    prompt: (() => { const answers = ["ফজর", "50"]; return () => answers.shift(); })(),
    currentLocale: () => "bn-BD",
    tr: value => value,
    toast: () => {},
    renderDailyAmal: () => {},
    persistDailyAmal: async next => { context.dailyAmalRecord = next; return true; }
  };
  vm.runInNewContext(source.slice(start, end) + "\\nglobalThis.edit=editDailyAmal;", context);
  await context.edit("a");
  assert.equal(context.dailyAmalRecord.items[0].target, 50);
  assert.equal(context.dailyAmalRecord.days["2026-11-24"].a, 80);
});
