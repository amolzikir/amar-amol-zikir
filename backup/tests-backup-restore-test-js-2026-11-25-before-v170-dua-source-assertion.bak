const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const source = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const start = source.indexOf("function validateBackupTree(");
const end = source.indexOf("\nasync function importAppBackup", start);
if (start < 0 || end < 0) throw new Error("Backup validators were not found");
const mergeStart = source.indexOf("function mergeBackupIds(");
const mergeEnd = source.indexOf("\nfunction renderZikrRoutines", mergeStart);
if (mergeStart < 0 || mergeEnd < 0) throw new Error("Backup merge helper was not found");
const helpers = source.slice(start, end) + "\n" + source.slice(mergeStart, mergeEnd);
const context = {};
vm.runInNewContext(helpers + "\nglobalThis.check={validateBackupTree,validateBackupItem,validateBackupRoutine,mergeBackupIds,backupRecordTimestamp,preferBackupRecord};", context);
const h = context.check;

test("valid backup records and routines pass strict shape validation", () => {
  assert.equal(h.validateBackupItem({id:"note-1",type:"note",title:"নোট",updatedAt:10}), true);
  assert.equal(h.validateBackupRoutine({id:"r1",phrase:"سبحان الله",target:100,count:2,date:"2026-11-24"}), true);
});
test("malformed or prototype-polluting backup data is rejected", () => {
  assert.equal(h.validateBackupItem({id:"",type:"note"}), false);
  assert.equal(h.validateBackupItem({id:"x",type:"unexpected"}), false);
  assert.equal(h.validateBackupTree(JSON.parse('{"__proto__":{"polluted":true}}')), false);
  assert.equal(h.validateBackupRoutine({id:"r",phrase:"",target:0}), false);
});
test("favorite merge preserves current choices, adds unique imported IDs and ignores invalid values", () => {
  const merged = h.mergeBackupIds(["dua-a","dua-b"],["dua-b","dua-c","",3,"dua-c"]);
  assert.deepEqual(Array.from(merged),["dua-a","dua-b","dua-c"]);
});
test("backup export includes Dua favorites and restore merges rather than replaces them", () => {
  assert.ok(source.includes("localData:{zikrRoutines:routines,duaFavorites:favorites}"));
  assert.ok(source.includes("mergedFavorites=mergeBackupIds(before,backupFavorites)"));
  assert.ok(source.includes("savedById.get(x.id)"));
  assert.ok(source.includes("data.itemCount!==data.items.length"));
});
test("Dua entries use verified source references and retain the existing offline library renderer", () => {
  for (const id of ["leaving-home","morning-evening-afiyah","enter-mosque","leave-mosque"]) assert.ok(source.includes('id:"'+id+'"'));
  assert.ok(source.includes("https://shamela.ws/book/1726/6958"));
  assert.ok(source.includes("https://shamela.ws/book/1726/6935"));
  assert.ok(source.includes("https://shamela.ws/book/711/1940"));
  assert.ok(source.includes("function renderDuaLibrary()"));
  assert.ok(source.includes('<option value="নামাজ ও মসজিদ">নামাজ ও মসজিদ</option>'));
});

test("backup merge compares deletedAt as well as updatedAt", () => {
  assert.equal(h.backupRecordTimestamp({updatedAt:10,deletedAt:30}),30);
  assert.equal(h.preferBackupRecord({id:"n",type:"note",updatedAt:10,deletedAt:30},{id:"n",type:"note",updatedAt:20,deletedAt:null}),true);
  assert.equal(h.preferBackupRecord({id:"n",type:"note",updatedAt:30,deletedAt:null},{id:"n",type:"note",updatedAt:10,deletedAt:20}),true);
});
test("a deletion tombstone wins an equal timestamp tie", () => {
  assert.equal(h.preferBackupRecord({id:"n",type:"note",updatedAt:30,deletedAt:30},{id:"n",type:"note",updatedAt:30,deletedAt:null}),true);
  assert.equal(h.preferBackupRecord({id:"n",type:"note",updatedAt:30,deletedAt:null},{id:"n",type:"note",updatedAt:30,deletedAt:30}),false);
});