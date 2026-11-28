(function(root){
"use strict";
const API="https://api.alquran.cloud/v1";
const CACHE_NAME="zikra-quran-reader-v1";
const SURAH_LIST_URL=API+"/surah";
const BOOKMARK_KEY="zikra-quran-reader-last-read-v1";
const BN_TRANSLATION="bn.bengali";
const AUDIO_EDITIONS=Object.freeze({"ar.alafasy":"মিশারি রাশিদ আল-আফাসি","ar.husary":"মাহমুদ খলিল আল-হুসারি","ar.minshawi":"মুহাম্মদ সিদ্দিক আল-মিনশাওয়ি","ar.sudais":"আবদুর রহমান আস-সুদাইস"});
const AUDIO_BASE="https://cdn.islamic.network/quran/audio-surah/64/";
const TAFSIR_BASE="https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@v1.2.3/tafsir/";
const TAFSIR_CACHE_NAME="zikra-quran-tafsir-v1";
const TAFSIR_EDITIONS=Object.freeze({
 "bn-tafsir-abu-bakr-zakaria":"তাফসীর আবু বকর যাকারিয়া",
 "bn-tafsir-ahsanul-bayaan":"তাফসীর আহসানুল বয়ান",
 "bn-tafseer-ibn-e-kaseer":"তাফসীর ইবনে কাসীর (বাংলা)",
 "tafisr-fathul-majid-bn":"তাফসীর ফাতহুল মাজীদ",
 "bengali-mokhtasar":"বাংলা সংক্ষিপ্ত তাফসীর"
});
const TAFSIR_ATTRIBUTION=Object.freeze({
 "bn-tafsir-abu-bakr-zakaria":Object.freeze({contributor:"King Fahd Quran Printing Complex",catalogUrl:"https://qul.tarteel.ai/resources/tafsir/33"}),
 "bn-tafsir-ahsanul-bayaan":Object.freeze({contributor:"Bayaan Foundation",catalogUrl:"https://qul.tarteel.ai/resources/tafsir/32"}),
 "bn-tafseer-ibn-e-kaseer":Object.freeze({contributor:"Tawheed Publication",catalogUrl:"https://qul.tarteel.ai/resources/tafsir/31"}),
 "tafisr-fathul-majid-bn":Object.freeze({contributor:"Tafsir Fathul Majid (QUL edition)",catalogUrl:"https://qul.tarteel.ai/resources/tafsir/39"}),
 "bengali-mokhtasar":Object.freeze({contributor:"Tafsir Center for Quranic Studies",catalogUrl:"https://qul.tarteel.ai/resources/tafsir/267"})
});
const DEFAULT_TAFSIR_EDITION="bn-tafsir-abu-bakr-zakaria";
let surahList=[];
let currentSurah=null;
let currentTranslation=null;
let translationEnabled=true;
let loading=false;
let fontSize=30;
let returnToTracker=false;
let ayahRepeatRemaining=0;
let audioPlaybackRate=1;

function normalizeAudioEdition(value){return Object.prototype.hasOwnProperty.call(AUDIO_EDITIONS,value)?value:null;}
function normalizeAyahRepeatCount(value){const n=Number(value);return [0,1,3,5,10].includes(n)?n:3;}
function normalizeAudioPlaybackRate(value){const n=Number(value);return [0.75,1,1.25,1.5,2].includes(n)?n:1;}
function applyAudioPlaybackRate(){const audio=el("quranReaderAudio");if(audio)try{audio.playbackRate=audioPlaybackRate}catch(e){}}
function normalizeTafsirEdition(value){return Object.prototype.hasOwnProperty.call(TAFSIR_EDITIONS,value)?value:null;}
function getTafsirAttribution(value){const id=normalizeTafsirEdition(value);return id?TAFSIR_ATTRIBUTION[id]:null;}
function buildTafsirUrl(surah,ayah,edition){
 const s=Number(surah),a=Number(ayah),id=normalizeTafsirEdition(edition);
 if(!Number.isInteger(s)||s<1||s>114||!Number.isInteger(a)||a<1||a>286||!id)return null;
 return TAFSIR_BASE+id+"/"+s+"/"+a+".json";
}
function validTafsirData(data,expectedSurah,expectedAyah){
 return !!data&&typeof data==="object"&&Number.isInteger(expectedSurah)&&Number.isInteger(expectedAyah)&&data.surah===expectedSurah&&data.ayah===expectedAyah&&typeof data.text==="string"&&!!data.text.trim()&&data.text.length<=300000;
}
async function fetchTafsirData(surah,ayah,edition){
 const url=buildTafsirUrl(surah,ayah,edition);
 if(!url)throw new Error("Invalid tafsir request");
 let cache=null;
 try{if(root.caches&&typeof root.caches.open==="function")cache=await root.caches.open(TAFSIR_CACHE_NAME)}catch(e){}
 try{
  const response=await root.fetch(url,{method:"GET",headers:{Accept:"application/json"},cache:"no-store"});
  if(!response||!response.ok){const error=new Error("Tafsir service returned "+(response&&response.status));error.status=response&&response.status;throw error;}
  const payload=await response.json();
  if(!validTafsirData(payload,s,a))throw new Error("Tafsir service returned invalid data");
  if(cache)try{await cache.put(url,new Response(JSON.stringify(payload),{status:200,headers:{"Content-Type":"application/json"}}))}catch(e){}
  return payload;
 }catch(networkError){
  if(cache){
   try{const stored=await cache.match(url);if(stored){const payload=await stored.json();if(validTafsirData(payload,s,a))return payload}}catch(e){}
  }
  throw networkError;
 }
}
function getTafsirErrorMessage(error){
 if(error&&error.status===404)return "এই গ্রন্থের ডেটাসেটে এই আয়াতের আলাদা ব্যাখ্যা নেই। চাইলে অন্য তাফসীর নির্বাচন করে দেখুন।";
 return "এই তাফসীরটি এখন আনা যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করুন; আগে খোলা থাকলে ক্যাশ কপি পাওয়া যেতে পারে।";
}
async function toggleTafsirPanel(button){
 if(!currentSurah)return;
 const ayah=Number(button.dataset.quranReaderTafsir);
 const panel=el("quranReaderAyahs")&&el("quranReaderAyahs").querySelector('[data-quran-reader-tafsir-panel="'+ayah+'"]');
 if(!panel)return;
 if(!panel.hidden){panel.hidden=true;return}
 panel.hidden=false;
 const selector=el("quranReaderTafsirEdition");
 const edition=normalizeTafsirEdition(selector?selector.value:DEFAULT_TAFSIR_EDITION)||DEFAULT_TAFSIR_EDITION;
 if(panel.dataset.loadedEdition===edition)return;
 const surah=currentSurah.number;
 panel.textContent="নির্বাচিত তাফসীর থেকে ব্যাখ্যা আনা হচ্ছে…";
 button.disabled=true;
 try{
  const data=await fetchTafsirData(surah,ayah,edition);
  if(!panel.isConnected)return;
  const attribution=getTafsirAttribution(edition);
  panel.innerHTML='<div class="quran-reader-tafsir-text">'+escapeHtml(data.text).replace(/\r?\n/g,"<br>")+'</div><p class="small">গ্রন্থ: '+escapeHtml(TAFSIR_EDITIONS[edition])+'। সংকলন/প্রকাশক: '+escapeHtml(attribution.contributor)+'। গ্রন্থতথ্য: <a href="'+escapeHtml(attribution.catalogUrl)+'" target="_blank" rel="noopener">QUL</a>। ডেটা-উৎস: <a href="https://github.com/spa5k/tafsir_api" target="_blank" rel="noopener">Tafsir API</a>।</p>';
  panel.dataset.loadedEdition=edition;
 }catch(e){
  if(panel.isConnected)panel.textContent=getTafsirErrorMessage(e);
 }finally{button.disabled=false}
}
function buildSurahAudioUrl(surah,edition){const n=Number(surah),id=normalizeAudioEdition(edition);if(!Number.isInteger(n)||n<1||n>114||!id)return null;return AUDIO_BASE+id+"/"+n+".mp3";}
function buildAyahAudioUrl(number,edition){const n=Number(number),id=normalizeAudioEdition(edition);if(!Number.isInteger(n)||n<1||n>6236||!id)return null;return "https://cdn.islamic.network/quran/audio/64/"+id+"/"+n+".mp3";}
function configureSurahAudio(surah){const audio=el("quranReaderAudio"),reciter=el("quranReaderReciter"),label=el("quranReaderAudioStatus");if(!audio||!reciter)return;ayahRepeatRemaining=0;const edition=normalizeAudioEdition(reciter.value)||"ar.alafasy";const url=buildSurahAudioUrl(surah,edition);if(!url)return;audio.pause();audio.src=url;audio.load();applyAudioPlaybackRate();if(label)label.textContent="তিলাওয়াত প্রস্তুত: "+AUDIO_EDITIONS[edition]+"। শুনতে প্লে চাপুন।";}
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
function validTranslationData(data,expectedNumber,expectedAyahCount){
 if(!data||data.number!==expectedNumber||!Number.isInteger(data.numberOfAyahs)||data.numberOfAyahs!==expectedAyahCount||!Array.isArray(data.ayahs)||data.ayahs.length!==expectedAyahCount)return false;
 if(!data.edition||data.edition.identifier!==BN_TRANSLATION)return false;
 for(let i=0;i<data.ayahs.length;i++){
  const a=data.ayahs[i];
  if(!a||a.numberInSurah!==i+1||typeof a.text!=="string"||!a.text.trim())return false;
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
const SAVED_AYAH_KEY="zikra-quran-saved-ayahs-v1";
function normalizeSavedAyahs(value){
 if(!Array.isArray(value))return [];
 const map=new Map();
 value.slice(0,5000).forEach(function(item){
  if(!item)return;
  const surah=Number(item.surah),ayah=Number(item.ayah);
  if(!Number.isInteger(surah)||surah<1||surah>114||!Number.isInteger(ayah)||ayah<1||ayah>286)return;
  const note=typeof item.note==="string"?item.note.slice(0,2000):"";
  const bookmarked=item.bookmarked!==false;
  if(!bookmarked&&!note.trim())return;
  map.set(surah+":"+ayah,{surah,ayah,note,bookmarked,savedAt:Number(item.savedAt)||0});
 });
 return Array.from(map.values()).sort(function(a,b){return a.surah-b.surah||a.ayah-b.ayah});
}
function parseSavedAyahs(raw){try{return normalizeSavedAyahs(JSON.parse(raw||"[]"))}catch(e){return []}}
function personalStorageKey(key){try{return typeof root.personalStorageKey==="function"?root.personalStorageKey(key):key}catch(e){return key}}
let personalSaveQueue=Promise.resolve();
function notifyPersonalDataChanged(){try{if(typeof root.ZikraQuranPersonalChanged==="function")personalSaveQueue=personalSaveQueue.then(()=>root.ZikraQuranPersonalChanged()).catch(e=>{if(root.console)root.console.warn("Quran personal sync pending",e)})}catch(e){}}
function readSavedAyahs(){try{return parseSavedAyahs(root.localStorage.getItem(personalStorageKey(SAVED_AYAH_KEY)))}catch(e){return []}}
function persistSavedAyahs(items){try{root.localStorage.setItem(personalStorageKey(SAVED_AYAH_KEY),JSON.stringify(normalizeSavedAyahs(items)));notifyPersonalDataChanged();return true}catch(e){return false}}
function findSavedAyah(items,surah,ayah){return items.find(function(x){return x.surah===Number(surah)&&x.ayah===Number(ayah)})||null}
function toggleSavedAyah(items,surah,ayah){
 const next=normalizeSavedAyahs(items),existing=findSavedAyah(next,surah,ayah);
 if(existing)existing.bookmarked=!existing.bookmarked;
 else next.push({surah:Number(surah),ayah:Number(ayah),note:"",bookmarked:true,savedAt:Date.now()});
 return normalizeSavedAyahs(next);
}
function saveAyahNote(items,surah,ayah,note){
 const next=normalizeSavedAyahs(items),existing=findSavedAyah(next,surah,ayah);
 const clean=String(note||"").slice(0,2000);
 if(existing){existing.note=clean;existing.savedAt=Date.now()}
 else if(clean.trim())next.push({surah:Number(surah),ayah:Number(ayah),note:clean,bookmarked:false,savedAt:Date.now()});
 return normalizeSavedAyahs(next);
}
const MEMORIZATION_KEY="zikra-quran-memorization-v1";
function normalizeMemorizedAyahs(value){
 if(!Array.isArray(value))return [];
 const map=new Map();
 value.slice(0,6236).forEach(function(item){
  if(!item)return;
  const surah=Number(item.surah),ayah=Number(item.ayah);
  if(!Number.isInteger(surah)||surah<1||surah>114||!Number.isInteger(ayah)||ayah<1||ayah>286)return;
  map.set(surah+":"+ayah,{surah,ayah,memorized:true,savedAt:Number(item.savedAt)||0});
 });
 return Array.from(map.values()).sort(function(a,b){return a.surah-b.surah||a.ayah-b.ayah});
}
function parseMemorizedAyahs(raw){try{return normalizeMemorizedAyahs(JSON.parse(raw||"[]"))}catch(e){return []}}
function readMemorizedAyahs(){try{return parseMemorizedAyahs(root.localStorage.getItem(personalStorageKey(MEMORIZATION_KEY)))}catch(e){return []}}
function persistMemorizedAyahs(items){try{root.localStorage.setItem(personalStorageKey(MEMORIZATION_KEY),JSON.stringify(normalizeMemorizedAyahs(items)));notifyPersonalDataChanged();return true}catch(e){return false}}
function isAyahMemorized(items,surah,ayah){return normalizeMemorizedAyahs(items).some(function(x){return x.surah===Number(surah)&&x.ayah===Number(ayah)})}
function toggleMemorizedAyah(items,surah,ayah){
 const s=Number(surah),a=Number(ayah);
 if(!Number.isInteger(s)||s<1||s>114||!Number.isInteger(a)||a<1||a>286)return normalizeMemorizedAyahs(items);
 const next=normalizeMemorizedAyahs(items),index=next.findIndex(function(x){return x.surah===s&&x.ayah===a});
 if(index>=0)next.splice(index,1);else next.push({surah:s,ayah:a,memorized:true,savedAt:Date.now()});
 return normalizeMemorizedAyahs(next);
}
function countMemorizedAyahs(items,surah){return normalizeMemorizedAyahs(items).filter(function(x){return surah===undefined||x.surah===Number(surah)}).length}
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
 try{return parseBookmark(root.localStorage.getItem(personalStorageKey(BOOKMARK_KEY)))}catch(e){return null}
}
function saveBookmark(surah,ayah){
 const value=normalizeBookmark({surah,ayah,savedAt:Date.now()});
 if(!value)return false;
 try{root.localStorage.setItem(personalStorageKey(BOOKMARK_KEY),JSON.stringify(value));renderBookmarkLabel();notifyPersonalDataChanged();return true}catch(e){status("এই ডিভাইসে শেষ-পড়া অবস্থান সংরক্ষণ করা যায়নি।",true);return false}
}
function renderSavedAyahs(){
 const host=el("quranReaderSavedAyahs"),count=el("quranReaderSavedCount");
 if(!host)return;
 const items=readSavedAyahs();
 if(count)count.textContent="("+bn(items.length)+")";
 if(!items.length){host.textContent="এখনো কোনো আয়াত বুকমার্ক বা নোটে সংরক্ষণ করা হয়নি।";return}
 host.innerHTML=items.map(function(item){
  const meta=surahList.find(function(s){return s.number===item.surah});
  const title=(meta?meta.name:"সূরা "+bn(item.surah))+" — আয়াত "+bn(item.ayah);
  return '<div class="quran-reader-saved-item"><button type="button" data-quran-reader-open-saved="'+item.surah+":"+item.ayah+'">'+escapeHtml(title)+'</button><span class="small">'+(item.bookmarked?"🔖 বুকমার্ক":"📝 নোট")+(item.note.trim()?" • নোট আছে":"")+'</span><button type="button" data-quran-reader-remove-saved="'+item.surah+":"+item.ayah+'" aria-label="সংরক্ষিত আয়াত সরান">×</button></div>';
 }).join("");
}
function renderBookmarkLabel(){
 const b=readBookmark(),node=el("quranReaderResume");
 if(node)node.disabled=!b;
 const label=el("quranReaderLastRead");
 renderSavedAyahs();
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
function normalizeSurahSearch(value){
 return String(value||"").toLocaleLowerCase().replace(/[০-৯]/g,function(d){return String("০১২৩৪৫৬৭৮৯".indexOf(d))}).replace(/[\u200c\u200d\s-]+/g," ").trim();
}
function filterSurahList(list,query){
 const q=normalizeSurahSearch(query);
 if(!Array.isArray(list))return [];
 if(!q)return list.slice();
 return list.filter(function(s){
  const fields=[s.number,s.name,s.englishName,s.englishNameTranslation].map(normalizeSurahSearch);
  return fields.some(function(value){return value.includes(q)});
 });
}
function renderSurahOptions(query){
 const select=el("quranReaderSurah");
 if(!select)return;
 const selected=select.value;
 const matches=filterSurahList(surahList,query);
 select.innerHTML="";
 if(!matches.length){const empty=document.createElement("option");empty.value="";empty.textContent="কোনো সূরা পাওয়া যায়নি";empty.disabled=true;select.appendChild(empty);return}
 matches.forEach(function(s){
  const option=document.createElement("option");
  option.value=String(s.number);
  option.textContent=bn(s.number)+". "+s.name+" — "+s.englishName+" ("+bn(s.numberOfAyahs)+" আয়াত)";
  select.appendChild(option);
 });
 if(matches.some(function(s){return String(s.number)===selected}))select.value=selected;
}
function normalizePracticeRange(start,end,total){
 const from=Number(start),to=Number(end),count=Number(total);
 if(!Number.isInteger(count)||count<1||!Number.isInteger(from)||!Number.isInteger(to)||from<1||to<from||to>count)return null;
 return {start:from,end:to,total:to-from+1};
}
function renderSurah(data,translation,jumpAyah){
 const info=el("quranReaderInfo"),container=el("quranReaderAyahs");
 if(!info||!container)return;
 const meta=surahList.find(x=>x.number===data.number)||data;
 info.textContent=meta.name+"  •  "+meta.englishName+"  •  "+bn(data.numberOfAyahs)+" আয়াত  •  "+(meta.revelationType==="Meccan"?"মাক্কি":"মাদানি");
 const savedItems=readSavedAyahs(),memorizedItems=readMemorizedAyahs();
 info.textContent+="  •  মুখস্থ: "+bn(countMemorizedAyahs(memorizedItems,data.number))+" / "+bn(data.numberOfAyahs);
 container.innerHTML=data.ayahs.map(function(a){
  const translated=translation&&translation.ayahs&&translation.ayahs[a.numberInSurah-1];
  const bangla=translationEnabled&&translated?'<p class="quran-reader-bangla" lang="bn" dir="ltr">'+escapeHtml(translated.text.trim())+'</p>':"";
  const saved=findSavedAyah(savedItems,data.number,a.numberInSurah);
  const note=saved?saved.note:"";
  return '<article class="quran-reader-ayah" id="quran-reader-ayah-'+a.numberInSurah+'"><div class="quran-reader-ayah-tools"><span>আয়াত '+bn(a.numberInSurah)+'</span><button type="button" class="quran-reader-bookmark" data-quran-reader-save="'+a.numberInSurah+'" aria-label="শেষ-পড়া অবস্থান সংরক্ষণ করুন" title="শেষ-পড়া অবস্থান">🔖</button></div><p class="quran-reader-arabic" lang="ar" dir="rtl">'+escapeHtml(a.text.trim())+'</p>'+bangla+'<div class="quran-reader-ayah-actions"><button type="button" data-quran-reader-conceal="'+a.numberInSurah+'" aria-pressed="false">🙈 আয়াত আড়াল করুন</button><button type="button" data-quran-reader-play-ayah="'+a.number+'">▶ আয়াত শুনুন</button><button type="button" data-quran-reader-memorized="'+a.numberInSurah+'">'+(isAyahMemorized(memorizedItems,data.number,a.numberInSurah)?"✓ মুখস্থ হয়েছে":"মুখস্থ চিহ্নিত")+'</button><button type="button" data-quran-reader-toggle-save="'+a.numberInSurah+'">'+(saved&&saved.bookmarked?"★ বুকমার্ক করা":"☆ বুকমার্ক")+'</button><button type="button" data-quran-reader-toggle-note="'+a.numberInSurah+'">✎ ব্যক্তিগত নোট</button><button type="button" data-quran-reader-tafsir="'+a.numberInSurah+'">📚 তাফসির</button></div><div class="quran-reader-tafsir-panel" data-quran-reader-tafsir-panel="'+a.numberInSurah+'" hidden aria-live="polite"></div><div class="quran-reader-note-editor" data-quran-reader-note-editor="'+a.numberInSurah+'" hidden><textarea maxlength="2000" rows="3" data-quran-reader-note-input="'+a.numberInSurah+'" placeholder="এই আয়াত সম্পর্কে আপনার ব্যক্তিগত নোট লিখুন…">'+escapeHtml(note)+'</textarea><button type="button" data-quran-reader-note-save="'+a.numberInSurah+'">নোট সংরক্ষণ</button></div></article>';
 }).join("");
 const target=Number(jumpAyah)||1;
 if(target>1){
  const targetNode=el("quran-reader-ayah-"+target);
  if(targetNode)root.requestAnimationFrame(function(){targetNode.scrollIntoView({block:"start",behavior:"auto"})});
 }
}
async function loadSurah(number,jumpAyah){
 if(loading)return;
 if(practiceState)stopMemorizationPractice();
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
  configureSurahAudio(n);
  currentTranslation=null;
  if(select)select.value=String(n);
  try{currentTranslation=await cachedJson(API+"/surah/"+n+"/"+BN_TRANSLATION,function(value){return validTranslationData(value,n,data.numberOfAyahs)})}catch(translationError){currentTranslation=null}
  renderSurah(data,currentTranslation,jumpAyah||1);
  status(currentTranslation?"আরবি পাঠ ও বাংলা অনুবাদ লোড হয়েছে। অনুবাদ: মুহিউদ্দীন খান।":"আরবি পাঠ লোড হয়েছে; বাংলা অনুবাদ এই মুহূর্তে পাওয়া যায়নি।",!currentTranslation);
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
 returnToTracker=!!(tracker&&tracker.classList.contains("show"));
 if(tracker)tracker.classList.remove("show");
 if(reader)reader.classList.add("show");
 let savedFont=30;
 try{savedFont=Number(root.localStorage.getItem(personalStorageKey("zikra-quran-font-size-v1")))||30}catch(e){}
 fontSize=Number.isFinite(savedFont)&&savedFont>=24&&savedFont<=42?savedFont:30;
 try{audioPlaybackRate=normalizeAudioPlaybackRate(root.localStorage.getItem(personalStorageKey("zikra-quran-audio-speed-v1")))}catch(e){audioPlaybackRate=1}
 const speedSelect=el("quranReaderAudioSpeed");if(speedSelect)speedSelect.value=String(audioPlaybackRate);
 applyFontSize();applyAudioPlaybackRate();
 loadSurahList();
}
function closeQuranReader(){
 const reader=el("quranReader"),tracker=el("quranTracker");
 if(reader)reader.classList.remove("show");
 const audio=el("quranReaderAudio");if(audio)audio.pause();
 if(returnToTracker&&tracker)tracker.classList.add("show");
 returnToTracker=false;
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
function startMemorizationPractice(){
 if(practiceState)stopMemorizationPractice();
 const from=el("quranPracticeFrom"),to=el("quranPracticeTo"),next=el("quranPracticeNext"),stop=el("quranPracticeStop");
 if(!currentSurah){status("আগে একটি সূরা নির্বাচন করুন।",true);return}
 const range=normalizePracticeRange(from&&from.value,to&&to.value,currentSurah.numberOfAyahs);
 if(!range){status("সঠিক আয়াতের সীমা দিন। যেমন: ১ থেকে ৫।",true);return}
 const cards=Array.from({length:range.total},(_,i)=>el("quran-reader-ayah-"+(range.start+i)));
 if(cards.some(card=>!card)){status("নির্বাচিত আয়াতগুলো লোড হয়নি। আবার সূরা খুলুন।",true);return}
 cards.forEach(card=>card.querySelectorAll(".quran-reader-arabic,.quran-reader-bangla").forEach(part=>part.classList.add("quran-reader-concealed")));
 practiceState={cards,index:0};
 if(next)next.disabled=false;if(stop)stop.disabled=false;
 status("মুখস্থ পরীক্ষা শুরু। "+bn(range.total)+"টি আয়াত আড়াল করা হয়েছে। পরের আয়াত দেখুন চাপুন।");
}
function revealNextPracticeAyah(){
 if(!practiceState||practiceState.index>=practiceState.cards.length){status("এই অনুশীলনের সব আয়াত দেখানো হয়েছে।");return}
 const card=practiceState.cards[practiceState.index++];
 card.querySelectorAll(".quran-reader-arabic,.quran-reader-bangla").forEach(part=>part.classList.remove("quran-reader-concealed"));
 card.scrollIntoView({block:"center",behavior:"smooth"});
 status("আয়াত "+bn(practiceState.index)+" / "+bn(practiceState.cards.length)+" দেখানো হয়েছে।");
 if(practiceState.index>=practiceState.cards.length){const next=el("quranPracticeNext");if(next)next.disabled=true;status("মুখস্থ পরীক্ষা সম্পন্ন। সব নির্বাচিত আয়াত দেখানো হয়েছে।")}
}
function stopMemorizationPractice(){
 if(practiceState)practiceState.cards.forEach(card=>card.querySelectorAll(".quran-reader-arabic,.quran-reader-bangla").forEach(part=>part.classList.remove("quran-reader-concealed")));
 practiceState=null;const next=el("quranPracticeNext"),stop=el("quranPracticeStop");if(next)next.disabled=true;if(stop)stop.disabled=true;
 status("মুখস্থ পরীক্ষার মোড বন্ধ হয়েছে।");
}
let practiceState=null;
function wire(){
 const open=el("openQuranReader"),close=el("closeQuranReader"),select=el("quranReaderSurah"),search=el("quranReaderSearch"),prev=el("quranReaderPrev"),next=el("quranReaderNext"),resume=el("quranReaderResume"),ayahs=el("quranReaderAyahs"),smaller=el("quranReaderSmaller"),larger=el("quranReaderLarger"),translationToggle=el("quranReaderTranslationToggle");
 const reciter=el("quranReaderReciter"),audio=el("quranReaderAudio"),audioStatus=el("quranReaderAudioStatus"),repeatSelect=el("quranReaderRepeatCount"),speedSelect=el("quranReaderAudioSpeed");
 if(reciter)reciter.addEventListener("change",function(){if(currentSurah)configureSurahAudio(currentSurah.number)});
 if(speedSelect)speedSelect.addEventListener("change",function(){audioPlaybackRate=normalizeAudioPlaybackRate(speedSelect.value);speedSelect.value=String(audioPlaybackRate);applyAudioPlaybackRate();try{root.localStorage.setItem(personalStorageKey("zikra-quran-audio-speed-v1"),String(audioPlaybackRate));notifyPersonalDataChanged()}catch(e){}if(audioStatus)audioStatus.textContent="তিলাওয়াতের গতি "+audioPlaybackRate.toLocaleString("en-US")+"× করা হয়েছে।"});
 if(audio)audio.addEventListener("error",function(){ayahRepeatRemaining=0;if(audioStatus)audioStatus.textContent="এই মুহূর্তে তিলাওয়াত চালানো যাচ্ছে না। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"});
 if(audio)audio.addEventListener("ended",function(){if(ayahRepeatRemaining===Infinity||ayahRepeatRemaining>0){if(ayahRepeatRemaining!==Infinity)ayahRepeatRemaining--;audio.currentTime=0;const replay=audio.play();if(replay&&typeof replay.catch==="function")replay.catch(function(){ayahRepeatRemaining=0;if(audioStatus)audioStatus.textContent="পুনরাবৃত্তি চালানো যায়নি। আবার আয়াতের বোতাম চাপুন।"});}else if(audioStatus)audioStatus.textContent="আয়াতের পুনরাবৃত্তি সম্পন্ন হয়েছে।";});
 const practiceStart=el("quranPracticeStart"),practiceNext=el("quranPracticeNext"),practiceStop=el("quranPracticeStop");
 if(practiceStart)practiceStart.addEventListener("click",startMemorizationPractice);
 if(practiceNext)practiceNext.addEventListener("click",revealNextPracticeAyah);
 if(practiceStop)practiceStop.addEventListener("click",stopMemorizationPractice);
 if(open)open.addEventListener("click",openQuranReader);
 if(close)close.addEventListener("click",closeQuranReader);
 if(select)select.addEventListener("change",function(){if(select.value)loadSurah(Number(select.value),1)});
 if(search)search.addEventListener("input",function(){const selected=select?select.value:"";renderSurahOptions(search.value);if(select&&selected&&Array.from(select.options).some(function(o){return o.value===selected}))select.value=selected});
 if(prev)prev.addEventListener("click",function(){if(currentSurah&&currentSurah.number>1)loadSurah(currentSurah.number-1,1)});
 if(next)next.addEventListener("click",function(){if(currentSurah&&currentSurah.number<114)loadSurah(currentSurah.number+1,1)});
 if(resume)resume.addEventListener("click",resumeReading);
 if(translationToggle){translationEnabled=translationToggle.checked;translationToggle.addEventListener("change",function(){translationEnabled=translationToggle.checked;if(currentSurah)renderSurah(currentSurah,currentTranslation,1)})}
 if(ayahs)ayahs.addEventListener("click",function(event){
  const button=event.target.closest("[data-quran-reader-save]");
  const playAyah=event.target.closest("[data-quran-reader-play-ayah]");
  if(playAyah){const globalAyah=Number(playAyah.dataset.quranReaderPlayAyah),edition=normalizeAudioEdition(reciter?reciter.value:"ar.alafasy")||"ar.alafasy",url=buildAyahAudioUrl(globalAyah,edition),repeatCount=normalizeAyahRepeatCount(repeatSelect?repeatSelect.value:3);if(!url||!audio){status("এই আয়াতের অডিও ঠিকানা পাওয়া যায়নি।",true);return}audio.pause();ayahRepeatRemaining=repeatCount===0?Infinity:repeatCount-1;audio.src=url;audio.load();applyAudioPlaybackRate();if(audioStatus)audioStatus.textContent=repeatCount===0?"নির্বাচিত আয়াত ধারাবাহিকভাবে পুনরাবৃত্তি হবে।": "নির্বাচিত আয়াত "+bn(repeatCount)+" বার শোনা হবে।";const playResult=audio.play();if(playResult&&typeof playResult.catch==="function")playResult.catch(function(){ayahRepeatRemaining=0;if(audioStatus)audioStatus.textContent="আয়াতের তিলাওয়াত চালানো যায়নি। আবার প্লে চাপুন।"});return}
  const conceal=event.target.closest("[data-quran-reader-conceal]");
  if(conceal){const card=conceal.closest(".quran-reader-ayah");if(!card)return;const parts=card.querySelectorAll(".quran-reader-arabic,.quran-reader-bangla");const hidden=conceal.getAttribute("aria-pressed")!=="true";parts.forEach(function(part){part.classList.toggle("quran-reader-concealed",hidden)});conceal.setAttribute("aria-pressed",hidden?"true":"false");conceal.textContent=hidden?"👁️ আয়াত দেখান":"🙈 আয়াত আড়াল করুন";status(hidden?"আয়াতের লেখা আড়াল করা হয়েছে। মনে মনে পড়ে লেখা মিলিয়ে নিন।":"আয়াতের লেখা আবার দেখানো হচ্ছে।");return}
  const savedOpen=event.target.closest("[data-quran-reader-open-saved]");
  if(savedOpen){const parts=savedOpen.dataset.quranReaderOpenSaved.split(":").map(Number);if(parts.length===2){if(select)select.value=String(parts[0]);loadSurah(parts[0],parts[1])}return}
  const savedRemove=event.target.closest("[data-quran-reader-remove-saved]");
  if(savedRemove){const parts=savedRemove.dataset.quranReaderRemoveSaved.split(":").map(Number);const next=readSavedAyahs().filter(function(x){return x.surah!==parts[0]||x.ayah!==parts[1]});if(persistSavedAyahs(next)){renderSavedAyahs();if(currentSurah)renderSurah(currentSurah,currentTranslation,1);status("সংরক্ষিত আয়াত ও তার নোট সরানো হয়েছে।")}return}
  const memorized=event.target.closest("[data-quran-reader-memorized]");
  if(memorized){const n=Number(memorized.dataset.quranReaderMemorized),next=toggleMemorizedAyah(readMemorizedAyahs(),currentSurah.number,n);if(persistMemorizedAyahs(next)){renderSurah(currentSurah,currentTranslation,n);status(isAyahMemorized(next,currentSurah.number,n)?"আয়াতটি মুখস্থ হিসেবে সংরক্ষণ করা হয়েছে।":"মুখস্থের চিহ্ন তুলে নেওয়া হয়েছে।")}else status("মুখস্থের অগ্রগতি সংরক্ষণ করা যায়নি। ডিভাইসের স্টোরেজ পরীক্ষা করুন।",true);return}
  const toggle=event.target.closest("[data-quran-reader-toggle-save]");
  if(toggle){const n=Number(toggle.dataset.quranReaderToggleSave),next=toggleSavedAyah(readSavedAyahs(),currentSurah.number,n);if(persistSavedAyahs(next)){renderSavedAyahs();renderSurah(currentSurah,currentTranslation,n);status("বুকমার্কের অবস্থা সংরক্ষণ করা হয়েছে।")}else status("বুকমার্ক সংরক্ষণ করা যায়নি।",true);return}
  const tafsirToggle=event.target.closest("[data-quran-reader-tafsir]");
  if(tafsirToggle){toggleTafsirPanel(tafsirToggle);return}
  const noteToggle=event.target.closest("[data-quran-reader-toggle-note]");
  if(noteToggle){const editor=ayahs.querySelector('[data-quran-reader-note-editor="'+Number(noteToggle.dataset.quranReaderToggleNote)+'"]');if(editor)editor.hidden=!editor.hidden;return}
  const noteSave=event.target.closest("[data-quran-reader-note-save]");
  if(noteSave){const n=Number(noteSave.dataset.quranReaderNoteSave),input=ayahs.querySelector('[data-quran-reader-note-input="'+n+'"]');const next=saveAyahNote(readSavedAyahs(),currentSurah.number,n,input?input.value:"");if(persistSavedAyahs(next)){renderSavedAyahs();renderSurah(currentSurah,currentTranslation,n);status("ব্যক্তিগত নোট এই ডিভাইসে সংরক্ষিত হয়েছে।")}else status("নোট সংরক্ষণ করা যায়নি। ডিভাইসের স্টোরেজ পরীক্ষা করুন।",true);return}
  if(!button||!currentSurah)return;
  const ayah=Number(button.dataset.quranReaderSave);
  if(saveBookmark(currentSurah.number,ayah)){
   status("শেষ-পড়া অবস্থান সংরক্ষিত হয়েছে: সূরা "+bn(currentSurah.number)+", আয়াত "+bn(ayah)+"।");
   button.textContent="✓";button.setAttribute("aria-label","শেষ-পড়া অবস্থান সংরক্ষিত");
  }
 });
 const savedList=el("quranReaderSavedAyahs");
 if(savedList)savedList.addEventListener("click",function(event){
  const open=event.target.closest("[data-quran-reader-open-saved]");
  if(open){const parts=open.dataset.quranReaderOpenSaved.split(":").map(Number);if(parts.length===2){if(select)select.value=String(parts[0]);loadSurah(parts[0],parts[1])}return}
  const remove=event.target.closest("[data-quran-reader-remove-saved]");
  if(remove){const parts=remove.dataset.quranReaderRemoveSaved.split(":").map(Number);const next=readSavedAyahs().filter(function(x){return x.surah!==parts[0]||x.ayah!==parts[1]});if(persistSavedAyahs(next)){renderSavedAyahs();if(currentSurah)renderSurah(currentSurah,currentTranslation,1);status("সংরক্ষিত আয়াত ও তার নোট সরানো হয়েছে।")}else status("সংরক্ষিত তালিকা হালনাগাদ করা যায়নি।",true)}
 });
 if(smaller)smaller.addEventListener("click",function(){fontSize=Math.max(24,fontSize-2);try{root.localStorage.setItem(personalStorageKey("zikra-quran-font-size-v1"),String(fontSize));notifyPersonalDataChanged()}catch(e){}applyFontSize()});
 if(larger)larger.addEventListener("click",function(){fontSize=Math.min(42,fontSize+2);try{root.localStorage.setItem(personalStorageKey("zikra-quran-font-size-v1"),String(fontSize));notifyPersonalDataChanged()}catch(e){}applyFontSize()});
 renderBookmarkLabel();
}
function getPersonalDataSnapshot(){
 let font=30;try{font=Number(root.localStorage.getItem(personalStorageKey("zikra-quran-font-size-v1")))||30}catch(e){}
 let speed=1;try{speed=normalizeAudioPlaybackRate(root.localStorage.getItem(personalStorageKey("zikra-quran-audio-speed-v1")))}catch(e){}
 return {bookmark:readBookmark(),savedAyahs:readSavedAyahs(),memorizedAyahs:readMemorizedAyahs(),fontSize:Number.isFinite(font)&&font>=24&&font<=42?font:30,audioPlaybackRate:speed};
}
function refreshPersonalData(){renderBookmarkLabel();if(currentSurah)renderSurah(currentSurah,currentTranslation,1);}
function applyPersonalDataSnapshot(snapshot){
 if(!snapshot||typeof snapshot!=="object")return false;
 try{
  const bookmark=normalizeBookmark(snapshot.bookmark),saved=normalizeSavedAyahs(snapshot.savedAyahs),memorized=normalizeMemorizedAyahs(snapshot.memorizedAyahs);
  const font=Number(snapshot.fontSize),safeFont=Number.isFinite(font)&&font>=24&&font<=42?font:30;
  const safeSpeed=normalizeAudioPlaybackRate(snapshot.audioPlaybackRate);
  const key=k=>personalStorageKey(k);
  if(bookmark)root.localStorage.setItem(key(BOOKMARK_KEY),JSON.stringify(bookmark));else root.localStorage.removeItem(key(BOOKMARK_KEY));
  root.localStorage.setItem(key(SAVED_AYAH_KEY),JSON.stringify(saved));
  root.localStorage.setItem(key(MEMORIZATION_KEY),JSON.stringify(memorized));
  root.localStorage.setItem(key("zikra-quran-font-size-v1"),String(safeFont));
  root.localStorage.setItem(key("zikra-quran-audio-speed-v1"),String(safeSpeed));
  audioPlaybackRate=safeSpeed;const speedSelect=el("quranReaderAudioSpeed");if(speedSelect)speedSelect.value=String(safeSpeed);
  fontSize=safeFont;applyFontSize();applyAudioPlaybackRate();renderBookmarkLabel();
  if(currentSurah)renderSurah(currentSurah,currentTranslation,1);
  return true;
 }catch(e){return false}
}
root.ZikraQuranReader={validSurahList:validSurahList,filterSurahList:filterSurahList,normalizePracticeRange:normalizePracticeRange,normalizeSurahSearch:normalizeSurahSearch,validSurahData:validSurahData,validTranslationData:validTranslationData,normalizeBookmark:normalizeBookmark,parseBookmark:parseBookmark,normalizeAudioEdition:normalizeAudioEdition,normalizeAyahRepeatCount:normalizeAyahRepeatCount,normalizeAudioPlaybackRate:normalizeAudioPlaybackRate,buildSurahAudioUrl:buildSurahAudioUrl,buildAyahAudioUrl:buildAyahAudioUrl,normalizeSavedAyahs:normalizeSavedAyahs,parseSavedAyahs:parseSavedAyahs,toggleSavedAyah:toggleSavedAyah,saveAyahNote:saveAyahNote,normalizeMemorizedAyahs:normalizeMemorizedAyahs,parseMemorizedAyahs:parseMemorizedAyahs,toggleMemorizedAyah:toggleMemorizedAyah,isAyahMemorized:isAyahMemorized,countMemorizedAyahs:countMemorizedAyahs,getPersonalDataSnapshot:getPersonalDataSnapshot,applyPersonalDataSnapshot:applyPersonalDataSnapshot,refreshPersonalData:refreshPersonalData,normalizeTafsirEdition:normalizeTafsirEdition,getTafsirAttribution:getTafsirAttribution,buildTafsirUrl:buildTafsirUrl,validTafsirData:validTafsirData,getTafsirErrorMessage:getTafsirErrorMessage,escapeHtml:escapeHtml};
root.openQuranReader=openQuranReader;
root.closeQuranReader=closeQuranReader;
if(typeof document!=="undefined"){
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",wire,{once:true});
 else wire();
}
})(typeof window!=="undefined"?window:globalThis);
