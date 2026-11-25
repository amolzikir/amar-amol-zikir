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
const save=extract("async function saveReminder(){","\nasync function clearReminder");
const clear=extract("async function clearReminder(){","\nasync function checkReminders");
for(const [name,fn] of [["save",save],["clear",clear]]){
 test(name+" reminder write ignores duplicate taps and releases its guard",()=>{
  assert.ok(fn.includes("if(!viewing||"+name+"Reminder.saving)return"));
  assert.ok(fn.includes(name+"Reminder.saving=true"));
  assert.ok(fn.includes(name+"Reminder.saving=false"));
 });
 test(name+" reminder commits the candidate only after IndexedDB succeeds",()=>{
  assert.ok(fn.includes("const candidate={...viewing,reminderAt:"));
  assert.ok(fn.indexOf("await putItem(candidate)")<fn.indexOf("viewing=candidate"));
  assert.ok(fn.indexOf("catch(e)")<fn.indexOf("viewing=candidate"));
 });
 test(name+" reminder failure preserves the current viewer and leaves the panel open",()=>{
  assert.ok(fn.includes("আগের তথ্য অক্ষত আছে, আবার চেষ্টা করুন"));
  assert.ok(fn.indexOf("catch(e)")<fn.indexOf('$("reminderPanel").classList.remove("show")'));
  assert.ok(fn.indexOf("catch(e)")<fn.indexOf("syncCloud()"));
 });
}

const check=extract("async function checkReminders(){","\nasync function runFind");
test("reminder completion checks cannot overlap",()=>{
 assert.ok(check.includes("if(!dbLocal||checkReminders.running)return"));
 assert.ok(check.includes("checkReminders.running=true"));
 assert.ok(check.includes("finally{checkReminders.running=false}"));
});
test("a failed reminder completion write is isolated and later reminders continue",()=>{
 assert.ok(check.includes("await putItem(candidate)"));
 assert.ok(check.includes("catch(e){console.error(\"Reminder completion save failed\",e);continue}"));
 assert.ok(check.indexOf("await putItem(candidate)")<check.indexOf("const msg="));
});
test("successfully completed reminders trigger one Cloud sync after local commits",()=>{
 assert.ok(check.includes("changed=true"));
 assert.ok(check.includes("if(changed)await syncCloud()"));
 assert.ok(check.indexOf("finally{checkReminders.running=false}")<check.indexOf("if(changed)await syncCloud()"));
});
