const fs=require("node:fs");
const path=require("node:path");
const {test}=require("node:test");
const assert=require("node:assert/strict");
const source=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const start=source.indexOf("async function saveEditor(){");
const end=source.indexOf("\nfunction editViewedNote()",start);
if(start<0||end<0)throw new Error("saveEditor function was not found");
const fn=source.slice(start,end);
test("note save ignores rapid duplicate taps while a write is pending",()=>{
 assert.match(fn,/if\(saveEditor\.saving\)return/);
 assert.match(fn,/saveEditor\.saving=true/);
 assert.match(fn,/saveEditor\.saving=false/);
});
test("save controls stay disabled during the local write and are restored",()=>{
 assert.match(fn,/saveButton\.disabled=true;cancelButton\.disabled=true/);
 assert.match(fn,/saveButton\.disabled=false;cancelButton\.disabled=false/);
 assert.match(fn,/saveButton\.textContent="সংরক্ষণ হচ্ছে…"/);
});
test("local write failure is reported without closing the editor or clearing typed fields",()=>{
 assert.match(fn,/try\{await putItem\(x\)\}catch\(e\)/);
 assert.match(fn,/সংরক্ষণ করা যায়নি—লেখা অক্ষত আছে, আবার চেষ্টা করুন/);
 assert.ok(fn.indexOf("catch(e)")<fn.indexOf("closeEditor()"));
 assert.ok(fn.indexOf("closeEditor()")>fn.indexOf("finally"));
});
