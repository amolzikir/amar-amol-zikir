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

test("Quran reader searches surahs by Arabic, English, Bengali and Bengali numerals", () => {
  const list = makeSurahList();
  list[0].name = "سورة الفاتحة";
  list[0].englishName = "Al-Fatiha";
  list[1].name = "سورة البقرة";
  list[1].englishName = "Al-Baqara";
  assert.equal(reader.filterSurahList(list, "الفاتحة").length, 1);
  assert.equal(reader.filterSurahList(list, "al-fatiha")[0].number, 1);
  assert.equal(reader.filterSurahList(list, "২")[0].number, 2);
  assert.equal(reader.filterSurahList(list, "").length, 114);
  assert.equal(reader.filterSurahList(list, "not-a-surah").length, 0);
});

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

 
test("Quran reader normalizes and safely parses multiple saved ayahs", () => {
  const items = reader.normalizeSavedAyahs([
    { surah: 2, ayah: 255, note: "আয়াতুল কুরসি", bookmarked: true, savedAt: 10 },
    { surah: 1, ayah: 1, note: "", bookmarked: true },
    { surah: 115, ayah: 1, bookmarked: true },
    { surah: 2, ayah: 287, bookmarked: true },
    { surah: 3, ayah: 1, note: "   ", bookmarked: false },
    { surah: 2, ayah: 255, note: "সর্বশেষ নোট", bookmarked: true }
  ]);
  assert.equal(items.length, 2);
  assert.equal(items[1].note, "সর্বশেষ নোট");
  assert.deepEqual(JSON.parse(JSON.stringify(reader.parseSavedAyahs("{bad json"))), []);
  assert.equal(reader.parseSavedAyahs(JSON.stringify([{surah:1,ayah:1,bookmarked:true}])).length, 1);
});

test("Quran reader toggles bookmarks without losing notes and saves private notes", () => {
  const first = reader.toggleSavedAyah([], 2, 255);
  assert.equal(first.length, 1);
  assert.equal(first[0].bookmarked, true);
  const withNote = reader.saveAyahNote(first, 2, 255, "মহান শিক্ষা");
  assert.equal(withNote[0].note, "মহান শিক্ষা");
  const unbookmarked = reader.toggleSavedAyah(withNote, 2, 255);
  assert.equal(unbookmarked.length, 1);
  assert.equal(unbookmarked[0].bookmarked, false);
  assert.equal(unbookmarked[0].note, "মহান শিক্ষা");
  const noteOnly = reader.saveAyahNote([], 3, 18, "নিজের উপলব্ধি");
  assert.equal(noteOnly.length, 1);
  assert.equal(noteOnly[0].bookmarked, false);
  assert.equal(reader.saveAyahNote([], 3, 18, "   ").length, 0);
  assert.equal(reader.saveAyahNote([], 3, 18, "x".repeat(2500))[0].note.length, 2000);
});


test("Quran reader accepts only the supported Bengali tafsir editions", () => {
  assert.equal(reader.normalizeTafsirEdition("bn-tafsir-abu-bakr-zakaria"), "bn-tafsir-abu-bakr-zakaria");
  assert.equal(reader.normalizeTafsirEdition("bn-tafsir-ahsanul-bayaan"), "bn-tafsir-ahsanul-bayaan");
  assert.equal(reader.normalizeTafsirEdition("bn-tafseer-ibn-e-kaseer"), "bn-tafseer-ibn-e-kaseer");
  assert.equal(reader.normalizeTafsirEdition("tafisr-fathul-majid-bn"), "tafisr-fathul-majid-bn");
  assert.equal(reader.normalizeTafsirEdition("bengali-mokhtasar"), "bengali-mokhtasar");
  assert.equal(reader.normalizeTafsirEdition("javascript:alert(1)"), null);
});

test("Quran reader builds safe tafsir URLs only for valid surah, ayah and edition", () => {
  assert.equal(reader.buildTafsirUrl(1, 1, "bn-tafsir-abu-bakr-zakaria"), "https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@v1.2.3/tafsir/bn-tafsir-abu-bakr-zakaria/1/1.json");
  assert.equal(reader.buildTafsirUrl(0, 1, "bn-tafsir-abu-bakr-zakaria"), null);
  assert.equal(reader.buildTafsirUrl(115, 1, "bn-tafsir-abu-bakr-zakaria"), null);
  assert.equal(reader.buildTafsirUrl(2, 287, "bn-tafsir-abu-bakr-zakaria"), null);
  assert.equal(reader.buildTafsirUrl(2, 1, "unknown-edition"), null);
});

test("Quran reader accepts tafsir only when its surah and ayah metadata match", () => {
  const valid = { surah: 2, ayah: 255, text: "তাফসীরের ব্যাখ্যা" };
  assert.equal(reader.validTafsirData(valid, 2, 255), true);
  assert.equal(reader.validTafsirData({ ...valid, surah: 3 }, 2, 255), false);
  assert.equal(reader.validTafsirData({ ...valid, ayah: 256 }, 2, 255), false);
  assert.equal(reader.validTafsirData({ ...valid, text: " " }, 2, 255), false);
  assert.equal(reader.validTafsirData({ ...valid, text: 123 }, 2, 255), false);
  assert.equal(reader.validTafsirData({ ...valid, text: "x".repeat(300001) }, 2, 255), false);
  assert.equal(reader.validTafsirData({ text: valid.text }, 2, 255), false);
  assert.equal(reader.validTafsirData(null, 2, 255), false);
  assert.match(reader.getTafsirErrorMessage({ status: 404 }), /এই আয়াতের আলাদা ব্যাখ্যা নেই/);
  assert.match(reader.getTafsirErrorMessage(new Error("offline")), /ইন্টারনেট সংযোগ পরীক্ষা করুন/);
  assert.equal(reader.escapeHtml("<script>alert(1)</script>"), "&lt;script&gt;alert(1)&lt;/script&gt;");
});


test("Quran reader provides verified catalog attribution for every Bengali tafsir edition", () => {
  const expected = [
    ["bn-tafsir-abu-bakr-zakaria", "King Fahd Quran Printing Complex", "https://qul.tarteel.ai/resources/tafsir/33"],
    ["bn-tafsir-ahsanul-bayaan", "Bayaan Foundation", "https://qul.tarteel.ai/resources/tafsir/32"],
    ["bn-tafseer-ibn-e-kaseer", "Tawheed Publication", "https://qul.tarteel.ai/resources/tafsir/31"],
    ["tafisr-fathul-majid-bn", "Tafsir Fathul Majid (QUL edition)", "https://qul.tarteel.ai/resources/tafsir/39"],
    ["bengali-mokhtasar", "Tafsir Center for Quranic Studies", "https://qul.tarteel.ai/resources/tafsir/267"]
  ];
  for (const [edition, contributor, catalogUrl] of expected) {
    assert.deepEqual(reader.getTafsirAttribution(edition), { contributor, catalogUrl });
  }
  assert.equal(reader.getTafsirAttribution("unknown-edition"), null);
  assert.equal(reader.getTafsirAttribution("javascript:alert(1)"), null);
});
