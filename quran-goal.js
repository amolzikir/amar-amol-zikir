(function(root){
"use strict";
const TOTAL_PAGES=604;
const ALLOWED_DAYS=Object.freeze([30,60,90,120,180,365]);
function validDateKey(value){return typeof value==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&!Number.isNaN(Date.parse(value+"T00:00:00Z"))&&new Date(value+"T00:00:00Z").toISOString().slice(0,10)===value}
function normalizeKhatmGoal(value){
 if(!value||typeof value!=="object")return null;
 const days=Number(value.days),startDate=String(value.startDate||"");
 if(!ALLOWED_DAYS.includes(days)||!validDateKey(startDate))return null;
 return {days,startDate,createdAt:Number(value.createdAt)||0};
}
function calculateKhatmProgress(entries,goal,today){
 const g=normalizeKhatmGoal(goal);
 if(!g)return null;
 const todayKey=validDateKey(today)?today:new Date().toISOString().slice(0,10);
 const start=Date.parse(g.startDate+"T00:00:00Z"),now=Date.parse(todayKey+"T00:00:00Z");
 const elapsedDays=Math.max(1,Math.floor((now-start)/86400000)+1);
 const counted=(Array.isArray(entries)?entries:[]).filter(x=>x&&validDateKey(String(x.date||""))&&x.date>=g.startDate&&x.date<=todayKey);
 const pages=counted.reduce((sum,x)=>sum+Math.max(0,Number.isFinite(Number(x.pages))?Number(x.pages):0),0);
 const completedPages=Math.min(TOTAL_PAGES,pages),remainingPages=Math.max(0,TOTAL_PAGES-completedPages);
 const daysRemaining=Math.max(0,g.days-elapsedDays);
 const plannedDailyPages=TOTAL_PAGES/g.days;
 const expectedPages=Math.min(TOTAL_PAGES,elapsedDays*plannedDailyPages);
 const targetDate=new Date(start+(g.days-1)*86400000).toISOString().slice(0,10);
 return {days:g.days,startDate:g.startDate,today:todayKey,targetDate,elapsedDays,daysRemaining,totalPages:TOTAL_PAGES,pages:completedPages,rawPages:pages,remainingPages,percent:Math.min(100,Math.round(completedPages/TOTAL_PAGES*100)),plannedDailyPages,requiredDailyPages:daysRemaining?remainingPages/daysRemaining:remainingPages,expectedPages,pace:completedPages>=TOTAL_PAGES?"complete":completedPages>=expectedPages?"ahead":"behind",completed:completedPages>=TOTAL_PAGES};
}
const api={TOTAL_PAGES,ALLOWED_DAYS,validDateKey,normalizeKhatmGoal,calculateKhatmProgress};
root.ZikraQuranGoal=api;
if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof globalThis!=="undefined"?globalThis:this);
