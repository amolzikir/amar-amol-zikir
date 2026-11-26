const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const match = html.match(/const DAILY_HADITHS=(\[[\s\S]*?\]);/);
assert.ok(match, "daily hadith collection should exist");
const hadiths = JSON.parse(match[1]);

test("daily hadith library contains eighteen distinct source-backed entries", () => {
  assert.equal(hadiths.length, 18);
  assert.deepEqual(hadiths.map(x => x.url), [
    "https://shamela.ws/book/735/7589",
    "https://shamela.ws/book/735/33",
    "https://shamela.ws/book/735/27",
    "https://shamela.ws/book/711/206",
    "https://shamela.ws/book/735/9073",
    "https://shamela.ws/book/711/178",
    "https://shamela.ws/book/711/7858",
    "https://shamela.ws/book/711/2142",
    "https://shamela.ws/book/735/136",
    "https://shamela.ws/book/735/13",
    "https://shamela.ws/book/711/1696",
    "https://shamela.ws/book/711/7188",
    "https://shamela.ws/book/711/180",
    "https://shamela.ws/book/1435/3384",
    "https://shamela.ws/book/1435/3381",
    "https://shamela.ws/book/711/8000",
    "https://shamela.ws/book/711/7876",
    "https://shamela.ws/book/711/5841"
  ]);
  assert.equal(new Set(hadiths.map(x => x.arabic)).size, hadiths.length);
  for (const item of hadiths) {
    assert.ok(item.arabic.length > 10);
    assert.ok(item.meaning.length > 10);
    assert.ok(item.lesson.length > 10);
    assert.match(item.url, /^https:\/\/shamela\.ws\/book\/(735|711|1435)\//);
    assert.match(item.source, /(সহিহ (বুখারি|মুসলিম)|সুনান তিরমিযি)/);
  }
  assert.match(html, /বাংলা অর্থ \(সহজ ভাবার্থ\)/);
  assert.match(html, /সব হাদিস শেষ না হওয়া পর্যন্ত একই হাদিস আবার আসবে না/);
});

test("daily hadith is deterministic by local date and cycles without repeats", () => {
  const fnMatch = html.match(/function dailyHadithIndex\(date=new Date\(\)\)\{[\s\S]*?\n\}/);
  assert.ok(fnMatch, "date-based daily index function should exist");
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + ")", { DAILY_HADITHS: hadiths, Date, Math });
  const first = indexFor(new Date(2026, 0, 1));
  assert.equal(indexFor(new Date(2026, 0, 1)), first, "same date should keep the same hadith");
  const sequence = [];
  for (let day = 1; day <= hadiths.length; day++) sequence.push(indexFor(new Date(2026, 0, day)));
  assert.equal(new Set(sequence).size, hadiths.length, "18 consecutive dates must show 18 different entries");
  assert.equal(indexFor(new Date(2026, 0, hadiths.length + 1)), first, "cycle may repeat only after all entries were shown");
  assert.match(html, /renderDailyHadith\(\)/);
});

test("daily hadith selection is independent of stale or unavailable browser storage", () => {
  const fnMatch = html.match(/function dailyHadithIndex\(date=new Date\(\)\)\{[\s\S]*?\n\}/);
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + ")", { DAILY_HADITHS: hadiths, Date, Math });
  const stale = JSON.stringify({day:"2026-01-01",index:0,cursor:1,seen:[0]});
  const untouched = stale;
  const a = indexFor(new Date(2026, 0, 2));
  const b = indexFor(new Date(2026, 0, 3));
  assert.notEqual(a, b, "successive dates must advance regardless of persisted legacy state");
  assert.equal(stale, untouched, "legacy storage data is not modified or deleted");
});
test("daily hadith refreshes when local day changes while visible or after app resume", () => {
  assert.match(html, /function refreshDailyHadithIfVisible\(\)/);
  assert.match(html, /document\.addEventListener\(["']visibilitychange["'],refreshDailyHadithIfVisible\)/);
  assert.match(html, /window\.addEventListener\(["']focus["'],refreshDailyHadithIfVisible\)/);
  assert.match(html, /function scheduleDailyHadithRollover\(\)/);
  assert.match(html, /window\.setTimeout\(\(\)=>\{refreshDailyHadithIfVisible\(\);scheduleDailyHadithRollover\(\)\}/);
});

test("daily hadith rotation ignores unavailable or legacy browser storage", () => {
  const fnMatch = html.match(/function dailyHadithIndex\(date=new Date\(\)\)\{[\s\S]*?\n\}/);
  assert.ok(fnMatch);
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + ")", { DAILY_HADITHS: hadiths, Date, Math });
  const a = indexFor(new Date(2026, 0, 1));
  const b = indexFor(new Date(2026, 0, 2));
  assert.notEqual(a, b);
  assert.equal(indexFor(new Date(2026, 0, 1)), a);
  assert.equal(indexFor(new Date(2026, 0, 19)), a);
});

