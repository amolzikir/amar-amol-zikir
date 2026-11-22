const CACHE="amol-zikir-v46";
const FILES=["./","./index.html","./manifest.webmanifest"];
const FIREBASE=[
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js",
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js",
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>caches.open(CACHE)).then(c=>Promise.all(FIREBASE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("amol-zikir-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=="GET")return;
 if(u.origin===location.origin||u.hostname==="www.gstatic.com"){
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{let copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match("./index.html"))));
 }
});