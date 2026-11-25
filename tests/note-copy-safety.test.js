const fs=require("node:fs");
const path=require("node:path");
const {test}=require("node:test");
const assert=require("node:assert/strict");
const source=fs.readFileSync(path.join(__dirname,"..","index.html"),"utf8");
const start=source.indexOf("async function makeNoteCopy(){");
const end=source.indexOf("\nfunction openReminder()",start);
if(start<0||end<0)throw new Error("makeNoteCopy function was not found");
const fn=source.slice(start,end);
test("copy operation ignores rapid duplicate requests",()=>{
 assert.match(fn,/if\(!viewing\|\|makeNoteCopy\.saving\)return/);
 assert.match(fn,/makeNoteCopy\.saving=true/);
 assert.match(fn,/makeNoteCopy\.saving=false/);
});
test("copy write failure preserves the original note and reports a retryable error",()=>{
 assert.match(fn,/try\{await putItem\(copy\)\}catch\(e\)/);
 assert.match(fn,/নোটের কপি তৈরি হয়নি—মূল নোট অক্ষত আছে, আবার চেষ্টা করুন/);
 assert.ok(fn.indexOf("catch(e)")<fn.indexOf("await render()"));
 assert.ok(fn.includes("syncCloud()"));
});
