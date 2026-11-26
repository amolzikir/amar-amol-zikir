const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");

const source = fs.readFileSync(path.join(__dirname, "..", "quran-reader.js"), "utf8");
const context = { console };
context.globalThis = context;
vm.runInNewContext(source, context, { filename: "quran-reader.js" });
const reader = context.ZikraQuranReader;

function makeSurahList() {
  return Array.from({ length: 114 }, (_, i) => ({
    number: i + 1,
    name: "سورة",
    englishName: "Surah " + (i + 1),
    numberOfAyahs: i === 1 ? 286 : 7
  }));
}

test("Quran reader accepts a complete ordered list of all 114 surahs", () => {
  assert.equal(reader.validSurahList(makeSurahList()), true);
});

test("Quran reader rejects incomplete, duplicated, or out-of-order surah metadata", () => {
  const short = makeSurahList().slice(0, 113);
  assert.equal(reader.validSurahList(short), false);
  const duplicate = makeSurahList();
  duplicate[1].number = 1;
  assert.equal(reader.validSurahList(duplicate), false);
  const missingName = makeSurahList();
  missingName[0].name = "";
  assert.equal(reader.validSurahList(missingName), false);
});

test("Quran reader accepts only complete sequential Uthmani surah text", () => {
  const surah = {
    number: 1,
    numberOfAyahs: 2,
    edition: { identifier: "quran-uthmani" },
    ayahs: [
      { number: 1, numberInSurah: 1, text: "بِسْمِ اللَّهِ" },
      { number: 2, numberInSurah: 2, text: "الْحَمْدُ لِلَّهِ" }
    ]
  };
  assert.equal(reader.validSurahData(surah, 1), true);
  assert.equal(reader.validSurahData({ ...surah, ayahs: surah.ayahs.slice(0, 1) }, 1), false);
  assert.equal(reader.validSurahData({ ...surah, edition: { identifier: "quran-uthmani-quran-academy" } }, 1), false);
  assert.equal(reader.validSurahData({ ...surah, ayahs: [{ ...surah.ayahs[0], numberInSurah: 2 }, surah.ayahs[1]] }, 1), false);
  assert.equal(reader.validSurahData({ ...surah, number: 2 }, 1), false);
});

test("Quran reader accepts complete sequential Bengali translation from the selected edition", () => {
  const translation = {
    number: 1,
    numberOfAyahs: 2,
    edition: { identifier: "bn.bengali" },
    ayahs: [
      { numberInSurah: 1, text: "পরম করুণাময়, অতি দয়ালু আল্লাহর নামে।" },
      { numberInSurah: 2, text: "সমস্ত প্রশংসা আল্লাহর জন্য।" }
    ]
  };
  assert.equal(reader.validTranslationData(translation, 1, 2), true);
  assert.equal(reader.validTranslationData({ ...translation, ayahs: translation.ayahs.slice(0, 1) }, 1, 2), false);
  assert.equal(reader.validTranslationData({ ...translation, edition: { identifier: "bn.other" } }, 1, 2), false);
  assert.equal(reader.validTranslationData({ ...translation, ayahs: [{ ...translation.ayahs[0], numberInSurah: 2 }, translation.ayahs[1]] }, 1, 2), false);
  assert.equal(reader.validTranslationData({ ...translation, number: 2 }, 1, 2), false);
  assert.equal(reader.validTranslationData({ ...translation, ayahs: [{ numberInSurah: 1, text: " " }, translation.ayahs[1]] }, 1, 2), false);
});

test("Quran reader validates saved surah and ayah positions", () => {
  assert.deepEqual(JSON.parse(JSON.stringify(reader.normalizeBookmark({ surah: 2, ayah: 255, savedAt: 10 }))), { surah: 2, ayah: 255, savedAt: 10 });
  assert.equal(reader.normalizeBookmark({ surah: 0, ayah: 1 }), null);
  assert.equal(reader.normalizeBookmark({ surah: 115, ayah: 1 }), null);
  assert.equal(reader.normalizeBookmark({ surah: 2, ayah: 287 }), null);
  assert.equal(reader.parseBookmark("{bad json"), null);
});

test("Quran reader escapes untrusted strings before rendering markup", () => {
  assert.equal(reader.escapeHtml("<img src=x onerror=alert(1)>"), "&lt;img src=x onerror=alert(1)&gt;");
});


test("Quran reader allows only supported reciters and valid surah audio URLs", () => {
  assert.equal(reader.normalizeAudioEdition("ar.alafasy"), "ar.alafasy");
  assert.equal(reader.normalizeAudioEdition("ar.husary"), "ar.husary");
  assert.equal(reader.normalizeAudioEdition("https://evil.example/audio.mp3"), null);
  assert.equal(reader.buildSurahAudioUrl(1, "ar.alafasy"), "https://cdn.islamic.network/quran/audio-surah/64/ar.alafasy/1.mp3");
  assert.equal(reader.buildSurahAudioUrl(114, "ar.sudais"), "https://cdn.islamic.network/quran/audio-surah/64/ar.sudais/114.mp3");
  assert.equal(reader.buildSurahAudioUrl(0, "ar.alafasy"), null);
  assert.equal(reader.buildSurahAudioUrl(115, "ar.alafasy"), null);
  assert.equal(reader.buildSurahAudioUrl(1, "unknown"), null);
});
