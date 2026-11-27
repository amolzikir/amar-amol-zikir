const { test } = require("node:test");
const assert = require("node:assert/strict");
const goal = require("../quran-goal.js");

test("normalizes only supported khatm goals and real calendar dates", () => {
  assert.deepEqual(goal.normalizeKhatmGoal({ days: 30, startDate: "2026-11-27" }), { days: 30, startDate: "2026-11-27", createdAt: 0 });
  assert.equal(goal.normalizeKhatmGoal({ days: 14, startDate: "2026-11-27" }), null);
  assert.equal(goal.normalizeKhatmGoal({ days: 30, startDate: "2026-02-30" }), null);
});

test("calculates khatm progress only from entries inside the goal period", () => {
  const entries = [
    { date: "2026-11-26", pages: 20 },
    { date: "2026-11-27", pages: 10 },
    { date: "2026-11-28", pages: 5 },
    { date: "2026-12-01", pages: 100 }
  ];
  const result = goal.calculateKhatmProgress(entries, { days: 30, startDate: "2026-11-27" }, "2026-11-28");
  assert.equal(result.pages, 15);
  assert.equal(result.remainingPages, 589);
  assert.equal(result.percent, 2);
  assert.equal(result.elapsedDays, 2);
  assert.equal(result.targetDate, "2026-12-26");
  assert.equal(result.daysRemaining, 28);
});

test("caps displayed completion at one Quran and handles completed and overdue goals", () => {
  const result = goal.calculateKhatmProgress([{ date: "2026-11-27", pages: 700 }], { days: 30, startDate: "2026-11-27" }, "2026-12-30");
  assert.equal(result.pages, 604);
  assert.equal(result.remainingPages, 0);
  assert.equal(result.percent, 100);
  assert.equal(result.completed, true);
  assert.equal(result.pace, "complete");
  assert.equal(result.daysRemaining, 0);
});

test("returns null when a goal has not been set", () => {
  assert.equal(goal.calculateKhatmProgress([], null, "2026-11-27"), null);
});
