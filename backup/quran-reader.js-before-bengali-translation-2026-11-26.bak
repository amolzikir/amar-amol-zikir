(function(root){
"use strict";
const API="https://api.alquran.cloud/v1";
const CACHE_NAME="zikra-quran-reader-v1";
const SURAH_LIST_URL=API+"/surah";
const BOOKMARK_KEY="zikra-quran-reader-last-read-v1";
let surahList=[];
let currentSurah=null;
let loading=false;
let fontSize=30;

function validSurahList(data){
 if(!Array.isArray(data)||data.length!==114)return false;
 const seen=new Set();
 for(let i=0;i<data.length;i++){
  const s=data[i];
  if(!s||s.number!==i+1||typeof s.name!=="string"||!s.name||typeof s.englishName!=="string"||!Number.isInteger(s.numberOfAyahs)||s.numberOfAyahs<1||s.numberOfAyahs>286)return false;
  if(seen.has(s.number))return false;
  seen.add(s.number);
 }
 return seen.size===114;
}
function validSurahData(data,expectedNumber){
 if(!data||data.number!==expectedNumber||!Number.isInteger(data.numberOfAyahs)||!Array.isArray(data.ayahs)||data.ayahs.length!==data.numberOfAyahs)return false;
 if(!data.edition||data.edition.identifier!=="quran-uthmani")return false;
 for(let i=0;i<data.ayahs.length;i++){
  const a=data.ayahs[i];
  if(!a||a.numberInSurah!==i+1||!Number.isInteger(a.number)||typeof a.text!=="string"||!a.text.trim())return false;
 }
 return true;
}
function normalizeBookmark(value){
 if(!value||!Number.isInteger(Number(value.surah))||!Number.isInteger(Number(value.ayah)))return null;
 const surah=Number(value.surah),ayah=Number(value.ayah);
 if(surah<1||surah>114||ayah<1||ayah>286)return null;
 return {surah,ayah,savedAt:Number(value.savedAt)||0};
}
function parseBookmark(raw){
 try{return normalizeBookmark(JSON.parse(raw||"null"))}catch(e){return null}
}
function escapeHtml(value){
 return String(value).replace(/[&<>"']/g,function(ch){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]});
}
function bn(value){return Number(value||0).toLocaleString("bn-BD")}
function el(id){return typeof document!=="undefined"?document.getElementById(id):null}
function status(message,isError){
 const node=el("quranReaderStatus");
 if(node){node.textContent=message;node.dataset.state=isError?"error":"info"}
}
function readBookmark(){
 try{return parseBookmark(root.localStorage.getItem(BOOKMARK_KEY))}catch(e){return null}
}
function saveBookmark(surah,ayah){
 const value=normalizeBookmark({surah,ayah,savedAt:Date.now()});
 if(!value)return false;
 try{root.localStorage.setItem(BOOKMARK_KEY,JSON.stringify(value));renderBookmarkLabel();return true}catch(e){status("এই ডিভাইসে শেষ-পড়া অবস্থান সংরক্ষণ করা যায়নি।",true);return false}
}
function renderBookmarkLabel(){
 const b=readBookmark(),node=el("quranReaderResume");
 if(node)node.disabled=!b;
 const label=el("quranReaderLastRead");
 if(label){
  if(!b)label.textContent="এখনো শেষ-পড়া অবস্থান সংরক্ষণ করা হয়নি";
  else{
   const s=surahList.find(x=>x.number===b.surah);
   label.textContent="শেষ পড়া: "+(s?s.englishName:"সূরা "+bn(b.surah))+" — আয়াত "+bn(b.ayah);
  }
 }
}
async function cachedJson(url,validator){
 let cache=null;
 try{if(root.caches&&typeof root.caches.open==="function")cache=await root.caches.open(CACHE_NAME)}catch(e){}
 try{
  const response=await root.fetch(url,{method:"GET",headers:{Accept:"application/json"},cache:"no-store"});
  if(!response||!response.ok)throw new Error("Quran service returned "+(response&&response.status));
  const payload=await response.json();
  if(!payload||payload.code!==200||!payload.data||validator&&!validator(payload.data))throw new Error("Quran service returned invalid or unverified data");
  if(cache)try{await cache.put(url,new Response(JSON.stringify(payload),{status:200,headers:{"Content-Type":"application/json"}}))}catch(e){}
  return payload.data;
 }catch(networkError){
  if(cache){
   try{
    const stored=await cache.match(url);
    if(stored){const payload=await stored.json();if(payload&&payload.code===200&&payload.data&&(!validator||validator(payload.data)))return payload.data}
   }catch(e){}
  }
  throw networkError;
 }
}
function renderSurahOptions(){
 const select=el("quranReaderSurah");
 if(!select)return;
 select.innerHTML="";
 surahList.forEach(function(s){
  const option=document.createElement("option");
  option.value=String(s.number);
  option.textContent=bn(s.number)+". "+s.name+" — "+s.englishName+" ("+bn(s.numberOfAyahs)+" আয়াত)";
  select.appendChild(option);
 });
}
function renderSurah(data,jumpAyah){
 const info=el("quranReaderInfo"),container=el("quranReaderAyahs");
 if(!info||!container)return;
 const meta=surahList.find(x=>x.number===data.number)||data;
 info.textContent=meta.name+"  •  "+meta.englishName+"  •  "+bn(data.numberOfAyahs)+" আয়াত  •  "+(meta.revelationType==="Meccan"?"মাক্কি":"মাদানি");
 container.innerHTML=data.ayahs.map(function(a){
  return '<article class="quran-reader-ayah" id="quran-reader-ayah-'+a.numberInSurah+'"><div class="quran-reader-ayah-tools"><span>আয়াত '+bn(a.numberInSurah)+'</span><button type="button" class="quran-reader-bookmark" data-quran-reader-save="'+a.numberInSurah+'" aria-label="এই আয়াত থেকে আবার পড়া শুরু করুন" title="শেষ-পড়া অবস্থান হিসেবে রাখুন">🔖</button></div><p class="quran-reader-arabic" lang="ar" dir="rtl">'+escapeHtml(a.text.trim())+'</p></article>';
 }).join("");
 const target=Number(jumpAyah)||1;
 if(target>1){
  const targetNode=el("quran-reader-ayah-"+target);
  if(targetNode)root.requestAnimationFrame(function(){targetNode.scrollIntoView({block:"start",behavior:"auto"})});
 }
}
async function loadSurah(number,jumpAyah){
 if(loading)return;
 const n=Number(number);
 if(!Number.isInteger(n)||n<1||n>114)return;
 loading=true;
 const select=el("quranReaderSurah");
 const prev=el("quranReaderPrev"),next=el("quranReaderNext");
 if(select)select.disabled=true;
 if(prev)prev.disabled=true;
 if(next)next.disabled=true;
 status("সূরার আরবি পাঠ আনা হচ্ছে…");
 try{
  currentSurah=null;
  const info=el("quranReaderInfo"),container=el("quranReaderAyahs");
  if(info)info.textContent="";
  if(container)container.innerHTML="";
  const data=await cachedJson(API+"/surah/"+n+"/quran-uthmani",function(value){return validSurahData(value,n)});
  currentSurah=data;
  if(select)select.value=String(n);
  renderSurah(data,jumpAyah||1);
  status("সূরা লোড হয়েছে। ইন্টারনেট ছাড়াও এই সূরাটি এই ডিভাইসে পড়তে পারবেন।");
 }catch(e){
  status("এই সূরাটি আনতে পারিনি। ইন্টারনেট পরীক্ষা করুন; আগে খোলা সূরা হলে অফলাইন কপি পাওয়া যাবে।",true);
  const container=el("quranReaderAyahs");
  if(container&&!currentSurah)container.innerHTML="";
 }finally{
  loading=false;
  if(select)select.disabled=false;
  if(prev)prev.disabled=n<=1;
  if(next)next.disabled=n>=114;
 }
}
async function loadSurahList(){
 if(surahList.length===114){
  const saved=readBookmark();
  await loadSurah(saved?saved.surah:1,saved?saved.ayah:1);
  return;
 }
 status("সূরার তালিকা আনা হচ্ছে…");
 try{
  const data=await cachedJson(SURAH_LIST_URL,validSurahList);
  surahList=data;
  renderSurahOptions();
  renderBookmarkLabel();
  const saved=readBookmark();
  await loadSurah(saved?saved.surah:1,saved?saved.ayah:1);
 }catch(e){
  status("সূরার তালিকা আনতে ইন্টারনেট চালু করুন। আগে তালিকা লোড হয়ে থাকলে অফলাইন কপিও ব্যবহার করা যাবে।",true);
 }
}
function openQuranReader(){
 const tracker=el("quranTracker"),reader=el("quranReader");
 if(tracker)tracker.classList.remove("show");
 if(reader)reader.classList.add("show");
 let savedFont=30;
 try{savedFont=Number(root.localStorage.getItem("zikra-quran-font-size-v1"))||30}catch(e){}
 fontSize=Number.isFinite(savedFont)&&savedFont>=24&&savedFont<=42?savedFont:30;
 applyFontSize();
 loadSurahList();
}
function closeQuranReader(){
 const reader=el("quranReader"),tracker=el("quranTracker");
 if(reader)reader.classList.remove("show");
 if(tracker)tracker.classList.add("show");
}
function applyFontSize(){
 const node=el("quranReaderAyahs");
 if(node)node.style.setProperty("--quran-reader-font-size",fontSize+"px");
 const label=el("quranReaderFontValue");
 if(label)label.textContent=bn(fontSize);
}
function resumeReading(){
 const saved=readBookmark();
 if(!saved){status("আগে কোনো আয়াতকে শেষ-পড়া অবস্থান হিসেবে সংরক্ষণ করুন।");return}
 if(el("quranReaderSurah"))el("quranReaderSurah").value=String(saved.surah);
 loadSurah(saved.surah,saved.ayah);
}
function wire(){
 const open=el("openQuranReader"),close=el("closeQuranReader"),select=el("quranReaderSurah"),prev=el("quranReaderPrev"),next=el("quranReaderNext"),resume=el("quranReaderResume"),ayahs=el("quranReaderAyahs"),smaller=el("quranReaderSmaller"),larger=el("quranReaderLarger");
 if(open)open.addEventListener("click",openQuranReader);
 if(close)close.addEventListener("click",closeQuranReader);
 if(select)select.addEventListener("change",function(){loadSurah(Number(select.value),1)});
 if(prev)prev.addEventListener("click",function(){if(currentSurah&&currentSurah.number>1)loadSurah(currentSurah.number-1,1)});
 if(next)next.addEventListener("click",function(){if(currentSurah&&currentSurah.number<114)loadSurah(currentSurah.number+1,1)});
 if(resume)resume.addEventListener("click",resumeReading);
 if(ayahs)ayahs.addEventListener("click",function(event){
  const button=event.target.closest("[data-quran-reader-save]");
  if(!button||!currentSurah)return;
  const ayah=Number(button.dataset.quranReaderSave);
  if(saveBookmark(currentSurah.number,ayah)){
   status("শেষ-পড়া অবস্থান সংরক্ষিত হয়েছে: সূরা "+bn(currentSurah.number)+", আয়াত "+bn(ayah)+"।");
   button.textContent="✓";button.setAttribute("aria-label","শেষ-পড়া অবস্থান সংরক্ষিত");
  }
 });
 if(smaller)smaller.addEventListener("click",function(){fontSize=Math.max(24,fontSize-2);try{root.localStorage.setItem("zikra-quran-font-size-v1",String(fontSize))}catch(e){}applyFontSize()});
 if(larger)larger.addEventListener("click",function(){fontSize=Math.min(42,fontSize+2);try{root.localStorage.setItem("zikra-quran-font-size-v1",String(fontSize))}catch(e){}applyFontSize()});
 renderBookmarkLabel();
}
root.ZikraQuranReader={validSurahList:validSurahList,validSurahData:validSurahData,normalizeBookmark:normalizeBookmark,parseBookmark:parseBookmark,escapeHtml:escapeHtml};
root.openQuranReader=openQuranReader;
root.closeQuranReader=closeQuranReader;
if(typeof document!=="undefined"){
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",wire,{once:true});
 else wire();
}
})(typeof window!=="undefined"?window:globalThis);
