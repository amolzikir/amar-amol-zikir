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

test("daily hadith stays fixed per date and does not repeat until the collection is exhausted", () => {
  const fnMatch = html.match(/function dailyHadithIndex\(date=new Date\(\),storage=window\.localStorage\)\{[\s\S]*?\n\}/);
  assert.ok(fnMatch, "persistent no-repeat index function should exist");
  const values = new Map();
  const storage = {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); }
  };
  const context = {
    DAILY_HADITHS: hadiths,
    DAILY_HADITH_STATE_KEY: "amol-zikir-daily-hadith-v172",
    Date,
    Math,
    window: { localStorage: storage }
  };
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + ")", context);
  const first = indexFor(new Date(2026, 0, 1));
  assert.equal(first, 0);
  assert.equal(indexFor(new Date(2026, 0, 1)), first, "same day should keep the same hadith");
  const sequence = [first];
  for (let day = 2; day <= hadiths.length; day++) {
    sequence.push(indexFor(new Date(2026, 0, day)));
  }
  assert.equal(new Set(sequence).size, hadiths.length, "each entry should appear once before reset");
  assert.equal(indexFor(new Date(2026, 0, hadiths.length + 1)), 0, "start a fresh cycle only after all entries were shown");
  assert.match(html, /renderDailyHadith\(\)/);
});

test("daily hadith refreshes when local day changes while visible or after app resume", () => {
  assert.match(html, /function refreshDailyHadithIfVisible\(\)/);
  assert.match(html, /document\.addEventListener\(["']visibilitychange["'],refreshDailyHadithIfVisible\)/);
  assert.match(html, /window\.addEventListener\(["']focus["'],refreshDailyHadithIfVisible\)/);
  assert.match(html, /function scheduleDailyHadithRollover\(\)/);
  assert.match(html, /window\.setTimeout\(\(\)=>\{refreshDailyHadithIfVisible\(\);scheduleDailyHadithRollover\(\)\}/);
});

test("daily hadith still changes by local date when browser storage cannot be written", () => {
  const fnMatch = html.match(/function dailyHadithIndex\(date=new Date\(\),storage=window\.localStorage\)\{[\s\S]*?\n\}/);
  const failingStorage = { getItem() { return null; }, setItem() { throw new Error("storage unavailable"); } };
  const context = { DAILY_HADITHS: hadiths, DAILY_HADITH_STATE_KEY: "amol-zikir-daily-hadith-v172", Date, Math, window: { localStorage: failingStorage } };
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + ")", context);
  const a = indexFor(new Date(2026, 0, 1));
  const b = indexFor(new Date(2026, 0, 2));
  assert.notEqual(a, b, "storage failure must not freeze the same hadith every day");
});

test("daily hadith migrates legacy saved state without cursor or seen history", () => {
  const fnMatch = html.match(/function dailyHadithIndex\\(date=new Date\\(\\),storage=window\\.localStorage\\)\\{[\\s\\S]*?\\n\\}/);
  assert.ok(fnMatch);
  const values = new Map([[ "amol-zikir-daily-hadith-v172", JSON.stringify({day:"2026-01-01",index:0}) ]]);
  const storage = { getItem(key){return values.get(key)||null;}, setItem(key,value){values.set(key,String(value));} };
  const context = { DAILY_HADITHS: hadiths, DAILY_HADITH_STATE_KEY:"amol-zikir-daily-hadith-v172", Date, Math, window:{localStorage:storage} };
  const indexFor = vm.runInNewContext("(" + fnMatch[0] + ")", context);
  assert.equal(indexFor(new Date(2026,0,2)),1,"legacy first hadith should advance to the next entry");
  const sequence=[1];
  for(let day=3;day<=hadiths.length;day++) sequence.push(indexFor(new Date(2026,0,day)));
  assert.equal(new Set(sequence).size,hadiths.length-1,"legacy migration must preserve no-repeat history");
});
