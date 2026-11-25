const fs=require("node:fs");
const path=require("node:path");
const {test}=require("node:test");
const assert=require("node:assert/strict");
const source=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
function extract(name,next){
 const start=source.indexOf(name);
 const end=source.indexOf(next,start);
 if(start<0||end<0)throw new Error(name+" function was not found");
 return source.slice(start,end);
}
const toggle=extract("async function toggleViewedFlag(","\nasync function removeViewed");
const remove=extract("async function removeViewed(){","\nfunction localDateKey");
test("note flag changes ignore rapid duplicate requests and always release the guard",()=>{
 assert.match(toggle,/if\(!viewing\|\|toggleViewedFlag\.saving\)return/);
 assert.match(toggle,/toggleViewedFlag\.saving=true/);
 assert.match(toggle,/toggleViewedFlag\.saving=false/);
});
test("failed note flag writes preserve the displayed note and show a retry message",()=>{
 assert.match(toggle,/try\{await putItem\(updated\)\}catch\(e\)/);
 assert.match(toggle,/নোট অক্ষত আছে, আবার চেষ্টা করুন/);
 assert.ok(toggle.indexOf("catch(e)")<toggle.indexOf("viewing=updated"));
});
test("note deletion ignores duplicate requests and keeps the viewer open if saving fails",()=>{
 assert.match(remove,/if\(!viewing\|\|removeViewed\.saving\)return/);
 assert.match(remove,/removeViewed\.saving=true/);
 assert.match(remove,/removeViewed\.saving=false/);
 assert.match(remove,/নোট মুছে ফেলা যায়নি—নোট অক্ষত আছে/);
 assert.ok(remove.indexOf("catch(e)")<remove.indexOf("closeViewer()"));
});
test("note deletion closes the viewer only after the tombstone is saved locally",()=>{
 assert.ok(remove.indexOf("await putItem(x)")<remove.indexOf("closeViewer()"));
});
