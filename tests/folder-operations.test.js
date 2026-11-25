const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const {test}=require("node:test");
const assert=require("node:assert/strict");
const source=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const start=source.indexOf("function buildFolderDeleteWrites(");
const end=source.indexOf("\nasync function folderMenuAction",start);
if(start<0||end<0)throw new Error("Folder operation helpers were not found");
const context={};
vm.runInNewContext(source.slice(start,end)+"\nglobalThis.helpers={buildFolderDeleteWrites,buildFolderReorderWrites};",context);
const h=context.helpers;
test("non-recursive folder deletion preserves children and reparents them",()=>{
 const folder={id:"f",type:"folder",parentId:"root",updatedAt:1};
 const child={id:"n",type:"note",parentId:"f",updatedAt:2};
 const nested={id:"sub",type:"folder",parentId:"f",updatedAt:3};
 const writes=h.buildFolderDeleteWrites([folder,child,nested],folder,false,99);
 assert.equal(writes.length,3);
 assert.equal(writes[0].parentId,"root");
 assert.equal(writes[1].parentId,"root");
 assert.equal(writes[2].deletedAt,99);
 assert.equal(writes[2].updatedAt,99);
});
test("recursive folder deletion tombstones every descendant but not unrelated records",()=>{
 const folder={id:"f",type:"folder"};
 const child={id:"n",type:"note",parentId:"f"};
 const nested={id:"sub",type:"folder",parentId:"f"};
 const grandchild={id:"g",type:"note",parentId:"sub"};
 const other={id:"other",type:"note",parentId:"elsewhere"};
 const writes=h.buildFolderDeleteWrites([folder,child,nested,grandchild,other],folder,true,123);
 assert.deepEqual(Array.from(writes,x=>x.id),["f","n","sub","g"]);
 assert.ok(writes.every(x=>x.deletedAt===123&&x.updatedAt===123));
});
test("folder reorder produces one complete ordered batch",()=>{
 const writes=h.buildFolderReorderWrites([{id:"b"},{id:"a"}],456);
 assert.deepEqual(Array.from(writes,x=>[x.id,x.sortOrder,x.updatedAt]),[["b",1,456],["a",2,456]]);
});
test("folder delete and reorder use one IndexedDB batch write, not per-record writes",()=>{
 assert.match(source,/await putItemsBatch\(writes\)/);
 assert.match(source,/putItemsBatch\(buildFolderReorderWrites\(siblings,Date\.now\(\)\)\)/);
});

test("folder metadata save guards duplicate writes and preserves prior state on failure",()=>{
 const fn=source.slice(source.indexOf("async function saveFolderPatch("),source.indexOf("\nfunction buildFolderDeleteWrites"));
 assert.ok(fn.includes("if(!menuFolderId||saveFolderPatch.saving)return false"));
 assert.ok(fn.includes("saveFolderPatch.saving=true"));
 assert.ok(fn.includes("await putItem(candidate)"));
 assert.ok(fn.indexOf("catch(e)")<fn.indexOf("await render()"));
 assert.ok(fn.includes("আগের তথ্য অক্ষত আছে, আবার চেষ্টা করুন"));
});
test("folder reorder is guarded and reports batch failure without rendering success",()=>{
 const fn=source.slice(source.indexOf("async function reorderFolder("),source.indexOf("\nasync function folderMenuAction"));
 assert.ok(fn.includes("if(reorderFolder.saving)return false"));
 assert.ok(fn.includes("await putItemsBatch(buildFolderReorderWrites(siblings,Date.now()))"));
 assert.ok(fn.indexOf("catch(e)")<fn.indexOf("await render()"));
 assert.ok(fn.includes("আগের ক্রম অক্ষত আছে, আবার চেষ্টা করুন"));
});
test("folder move revalidates destination and rejects descendant cycles",()=>{
 const fn=source.slice(source.indexOf("async function moveFolderToSelected("),source.indexOf('\n$("moveFolderNow").onclick'));
 assert.ok(fn.includes("if(!target||descendants.has(newParent))"));
 assert.ok(fn.includes("moveFolderToSelected.saving"));
 assert.ok(fn.indexOf("await putItem(candidate)")<fn.indexOf("closeFolderMenu()"));
 assert.ok(fn.indexOf("catch(e)")<fn.indexOf("closeFolderMenu()"));
 assert.ok(fn.includes("আগের অবস্থান অক্ষত আছে, আবার চেষ্টা করুন"));
});
