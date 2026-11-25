const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("function scheduleCloudSyncRetry(){");
const end = source.indexOf("\nasync function syncCloud", start);
if (start < 0 || end < 0) throw new Error("Cloud retry scheduler was not found");
const helper = source.slice(start, end);

function makeContext({ online = true, signedIn = true } = {}) {
  const scheduled = [];
  const context = {
    currentUser: signedIn ? { uid: "test-user" } : null,
    cloud: signedIn ? {} : null,
    navigator: { onLine: online },
    syncRetryTimer: null,
    syncRetryDelay: 3000,
    setTimeout: (fn, delay) => { const token = { fn, delay }; scheduled.push(token); return token; },
    syncCloud: () => { context.syncCalls++; },
    syncCalls: 0
  };
  vm.runInNewContext(helper + "\nglobalThis.schedule=scheduleCloudSyncRetry;", context);
  context.scheduled = scheduled;
  return context;
}

test("failed direct cloud save schedules one full sync retry", () => {
  const context = makeContext();
  assert.equal(context.schedule(), true);
  assert.equal(context.scheduled.length, 1);
  assert.equal(context.scheduled[0].delay, 3000);
  assert.equal(context.syncRetryDelay, 6000);
  context.scheduled[0].fn();
  assert.equal(context.syncRetryTimer, null);
  assert.equal(context.syncCalls, 1);
});

test("multiple failed saves share the existing retry timer", () => {
  const context = makeContext();
  assert.equal(context.schedule(), true);
  assert.equal(context.schedule(), false);
  assert.equal(context.scheduled.length, 1);
});

test("retry is not scheduled while offline or signed out", () => {
  for (const context of [makeContext({ online: false }), makeContext({ signedIn: false })]) {
    assert.equal(context.schedule(), false);
    assert.equal(context.scheduled.length, 0);
  }
});

test("retry backoff is capped at five minutes", () => {
  const context = makeContext();
  context.syncRetryDelay = 240000;
  context.schedule();
  assert.equal(context.scheduled[0].delay, 240000);
  assert.equal(context.syncRetryDelay, 300000);
});
