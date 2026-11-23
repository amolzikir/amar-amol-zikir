const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("function isDailyAmalRecoveryRecord");
const end = source.indexOf("\nasync function recoverPreviousDailyAmal", start);
if (start < 0 || end < 0) throw new Error("Daily Amal recovery selector was not found");
const context = {};
vm.runInNewContext(source.slice(start, end) + "\nglobalThis.choose=chooseDailyAmalRecoveryCandidate; globalThis.isDaily=isDailyAmalRecoveryRecord;", context);

test("recovery chooses the newest non-deleted record that contains saved items", () => {
  const older = { id: "system-daily-amal", updatedAt: 10, items: [{ id: "a", name: "পুরোনো" }] };
  const newer = { id: "system-daily-amal", updatedAt: 20, items: [{ id: "b", name: "নতুন" }] };
  const selected = context.choose([
    { source: "legacy", record: older },
    { source: "cloud", record: newer },
    { source: "deleted", record: { ...newer, deletedAt: 30, updatedAt: 30 } },
    { source: "empty", record: { ...newer, items: [] } }
  ]);
  assert.equal(selected.source, "cloud");
  assert.equal(selected.record.items[0].name, "নতুন");
});

test("recovery refuses empty, missing, or deleted records", () => {
  assert.equal(context.choose([
    { source: "empty", record: { items: [], updatedAt: 100 } },
    { source: "deleted", record: { items: [{ id: "x" }], deletedAt: 101 } },
    { source: "missing", record: null }
  ]), null);
});

test("recovery does not combine records and thereby avoids reviving removed entries", () => {
  const a = { source: "legacy", record: { id: "system-daily-amal", updatedAt: 10, items: [{ id: "keep" }] } };
  const b = { source: "cloud", record: { id: "system-daily-amal", updatedAt: 20, items: [{ id: "newer" }] } };
  const selected = context.choose([a, b]);
  assert.equal(selected, b);
  assert.deepEqual(Array.from(selected.record.items, x => x.id), ["newer"]);
});

test("recovery recognizes alternate IDs only when the record is clearly Daily Amal", () => {
  assert.equal(context.isDaily({ id: "old-id", type: "daily-amal", items: [{ name: "ফজর" }] }), true);
  assert.equal(context.isDaily({ id: "note-1", title: "সাধারণ নোট", items: [{ name: "লেখা" }] }), false);
  assert.equal(context.isDaily({ id: "old-id", tab: "__system__", title: "দৈনিক আমল", items: [{ name: "যিকির" }] }), true);
});
