const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const dailyStart = source.indexOf("async function loadDailyAmal(){");
const dailyEnd = source.indexOf("\nlet dailyCalendarMonth", dailyStart);
const tasbihStart = source.indexOf("async function loadTasbih(){");
const tasbihEnd = source.indexOf("\nI18N[", tasbihStart);
if (dailyStart < 0 || dailyEnd < 0 || tasbihStart < 0 || tasbihEnd < 0) {
  throw new Error("System tracker loaders were not found");
}
const dailySource = source.slice(dailyStart, dailyEnd);
const tasbihSource = source.slice(tasbihStart, tasbihEnd);

function cloudStub({ remote = null, readError = null, writeError = null } = {}) {
  return {
    collection: () => ({ doc: () => ({ collection: () => ({ doc: () => ({
      get: async () => {
        if (readError) throw readError;
        return { exists: !!remote, data: () => remote };
      },
      set: async () => { if (writeError) throw writeError; }
    }) }) }) })
  };
}

function contextFor(loaderSource, { local = null, remote = null, readError = null, writeError = null, online = true, putItem = async () => {} } = {}) {
  const context = {
    retries: 0,
    dailyAmalRecord: null,
    tasbihRecord: null,
    allItems: async () => local ? [local] : [],
    putItem,
    currentUser: { uid: "test-user" },
    cloud: cloudStub({ remote, readError, writeError }),
    navigator: { onLine: online },
    scheduleCloudSyncRetry: () => { context.retries++; },
    toast: () => {},
    renderDailyAmal: () => {},
    updateTasbihUI: () => {},
    localDateKey: () => "2026-11-25",
    $: () => ({ value: "" }),
    console: { error: () => {}, warn: () => {} },
    Date
  };
  vm.runInNewContext(loaderSource + "\nglobalThis.load=" + (loaderSource === dailySource ? "loadDailyAmal" : "loadTasbih") + "; globalThis.record=()=> " + (loaderSource === dailySource ? "dailyAmalRecord" : "tasbihRecord") + ";", context);
  return context;
}

test("Daily Amal keeps the old local record active when a newer cloud copy cannot be saved locally", async () => {
  const local = { id: "system-daily-amal", items: [{ id: "local" }], updatedAt: 10 };
  const remote = { id: "system-daily-amal", items: [{ id: "remote" }], updatedAt: 20 };
  const ctx = contextFor(dailySource, { local, remote, putItem: async () => { throw new Error("disk full"); } });
  assert.equal(await ctx.load(), true);
  assert.equal(ctx.record(), local);
  assert.equal(ctx.record().items[0].id, "local");
  assert.equal(ctx.retries, 1);
});

test("Daily Amal does not create an empty record when cloud read fails and no local record exists", async () => {
  let writes = 0;
  const ctx = contextFor(dailySource, { readError: new Error("offline"), putItem: async () => { writes++; } });
  assert.equal(await ctx.load(), false);
  assert.equal(ctx.record(), null);
  assert.equal(writes, 0);
  assert.equal(ctx.retries, 1);
});

test("Daily Amal cloud seed failure schedules the shared retry", async () => {
  const local = { id: "system-daily-amal", items: [], updatedAt: 10 };
  const ctx = contextFor(dailySource, { local, writeError: new Error("unavailable") });
  assert.equal(await ctx.load(), true);
  assert.equal(ctx.record(), local);
  assert.equal(ctx.retries, 1);
});

test("Tasbih does not create a zero counter when cloud read fails and no local record exists", async () => {
  let writes = 0;
  const ctx = contextFor(tasbihSource, { readError: new Error("offline"), putItem: async () => { writes++; } });
  assert.equal(await ctx.load(), false);
  assert.equal(ctx.record(), null);
  assert.equal(writes, 0);
  assert.equal(ctx.retries, 1);
});

test("Tasbih initial cloud seed failure schedules the shared retry", async () => {
  const ctx = contextFor(tasbihSource, { writeError: new Error("unavailable") });
  assert.equal(await ctx.load(), true);
  assert.equal(ctx.record().count, 0);
  assert.equal(ctx.retries, 1);
  assert.equal(ctx.record().history.total, 0);
  assert.equal(ctx.record().history.legacyCount, 0);
  assert.equal(Object.keys(ctx.record().history.days).length, 0);
});

test("Tasbih keeps the previous local counter when a newer cloud copy cannot be saved", async () => {
  const local = { id: "system-tasbih-counter", count: 8, updatedAt: 10 };
  const remote = { id: "system-tasbih-counter", count: 21, updatedAt: 20 };
  const ctx = contextFor(tasbihSource, { local, remote, putItem: async () => { throw new Error("disk full"); } });
  assert.equal(await ctx.load(), true);
  assert.equal(ctx.record(), local);
  assert.equal(ctx.record().count, 8);
  assert.equal(ctx.record().history, undefined);
  assert.equal(ctx.retries, 1);
});

test("Daily Amal does not create a new empty record offline before cloud data can be checked", async () => {
  let writes = 0;
  const ctx = contextFor(dailySource, { online: false, putItem: async () => { writes++; } });
  assert.equal(await ctx.load(), false);
  assert.equal(ctx.record(), null);
  assert.equal(writes, 0);
});

test("Tasbih does not create a new zero counter offline before cloud data can be checked", async () => {
  let writes = 0;
  const ctx = contextFor(tasbihSource, { online: false, putItem: async () => { writes++; } });
  assert.equal(await ctx.load(), false);
  assert.equal(ctx.record(), null);
  assert.equal(writes, 0);
});
