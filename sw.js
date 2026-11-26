const CACHE="amol-zikir-v184";
const FILES=["./","./index.html","./manifest.webmanifest","./assets/app-icon.jpg"];
const FIREBASE=[
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>caches.open(CACHE)).then(c=>Promise.all(FIREBASE.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener("message",e=>{if(e.data&&e.data.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("amol-zikir-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function cachedAppShell(request){return caches.match(request).then(cached=>cached||caches.match("./index.html")).then(cached=>cached||new Response("অফলাইন: অ্যাপের সংরক্ষিত কপি পাওয়া যায়নি। ইন্টারনেট চালু করে আবার চেষ্টা করুন।",{status:503,statusText:"Offline"}))}
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=="GET")return;
 if(u.origin===location.origin&&(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")||u.pathname.endsWith("/"))){
  e.respondWith(fetch(new Request(e.request,{cache:"no-store"})).then(resp=>{
   if(resp.ok)return caches.open(CACHE).then(c=>c.put(e.request,resp.clone())).then(()=>resp);
   if(resp.status>=500)return cachedAppShell(e.request).then(cached=>cached||resp);
   return resp;
  }).catch(()=>cachedAppShell(e.request)));return;
 }
 if(u.origin===location.origin||u.hostname==="www.gstatic.com"){
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(resp=>{
   if(!resp.ok)return resp;
   return caches.open(CACHE).then(c=>c.put(e.request,resp.clone())).then(()=>resp);
  }).catch(()=>new Response("",{status:503,statusText:"Offline"}))));
 }
});
