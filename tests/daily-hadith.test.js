const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const match = html.match(/const DAILY_HADITHS=(\[[\s\S]*?\]);/);
assert.ok(match, "daily hadith collection should exist");
const hadiths = JSON.parse(match[1]);

test("daily hadith collection contains three source-backed entries", () => {
  assert.equal(hadiths.length, 3);
  assert.deepEqual(hadiths.map(x => x.url), [
    "https://shamela.ws/book/735/7589",
    "https://shamela.ws/book/735/33",
    "https://shamela.ws/book/735/27"
  ]);
  assert.match(hadiths[0].source, /৪৭৩৯/);
  assert.match(hadiths[1].source, /১৩/);
  assert.match(hadiths[2].source, /১০/);
  for (const item of hadiths) {
    assert.ok(item.arabic.length > 10);
    assert.ok(item.meaning.length > 10);
    assert.ok(item.lesson.length > 10);
    assert.match(item.url, /^https:\/\/shamela\.ws\/book\/735\//);
  }
});

test("daily hadith rotation is stable and advances once per local calendar day", () => {
  const fnMatch = html.match(/function dailyHadithIndex\(date=new Date\(\)\)\{[\s\S]*?\n\}/);
  assert.ok(fnMatch, "daily index function should exist");
  const context = { DAILY_HADITHS: hadiths, Date, Math };
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + "; dailyHadithIndex)", context);
  assert.equal(indexFor(new Date(2026, 0, 1)), 0);
  assert.equal(indexFor(new Date(2026, 0, 2)), 1);
  assert.equal(indexFor(new Date(2026, 0, 3)), 2);
  assert.equal(indexFor(new Date(2026, 0, 4)), 0);
  assert.match(html, /renderDailyHadith\(\)/);
});
