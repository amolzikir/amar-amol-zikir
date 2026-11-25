const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const match = html.match(/function getBangladeshHijriEffectiveDate\(date,hour,minute\)\{[\s\S]*?\n\}/);
if (!match) throw new Error("Bangladesh sunset date helper was not found");
const context = { Date, Math };
vm.runInNewContext(match[0] + "\nthis.getBangladeshHijriEffectiveDate=getBangladeshHijriEffectiveDate;", context);
const effectiveDate = (y,m,d,h,min) => context.getBangladeshHijriEffectiveDate(new Date(Date.UTC(y,m-1,d)),h,min);

test("Hijri date remains on civil date before Dhaka sunset", () => {
  const result = effectiveDate(2026, 11, 25, 17, 10);
  if (result.toISOString().slice(0,10) !== "2026-11-25") throw new Error("Date advanced before sunset");
});

test("Hijri date advances at Dhaka sunset", () => {
  const result = effectiveDate(2026, 11, 25, 17, 12);
  if (result.toISOString().slice(0,10) !== "2026-11-26") throw new Error("Date did not advance at sunset");
});

test("month begins after sunset on the eve of announced first day", () => {
  const before = effectiveDate(2026, 11, 11, 17, 14);
  const after = effectiveDate(2026, 11, 11, 17, 15);
  if (before.toISOString().slice(0,10) !== "2026-11-11") throw new Error("Unexpected pre-sunset date");
  if (after.toISOString().slice(0,10) !== "2026-11-12") throw new Error("Announced Hijri month did not begin after sunset on its eve");
});

test("Hijri sunset helper handles leap-year dates", () => {
  const result = effectiveDate(2028, 2, 29, 23, 0);
  if (result.toISOString().slice(0,10) !== "2028-03-01") throw new Error("Leap-day rollover failed");
});
