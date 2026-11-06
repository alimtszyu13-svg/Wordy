/* Wordy service worker: the app opens without internet after the first visit.
   Pages: network first (so updates arrive at once), cached copy when offline.
   Libraries, fonts, icons, audio: cache first. Firebase data is never cached here. */
const V='wordy-v1';
const SHELL=['/','/app.html','/offline.html','/site.css','/manifest.webmanifest','/icons/face.svg','/icons/icon-192.png','/favicon.ico'];
const CDN=/^https:\/\/(cdnjs\.cloudflare\.com|www\.gstatic\.com\/firebasejs|fonts\.googleapis\.com|fonts\.gstatic\.com)\//;
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return; const u=new URL(r.url);
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{ if(res.ok){ const c=res.clone(); caches.open(V).then(x=>x.put(r,c)); } return res; })
      .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match(u.pathname==='/'?'/':'/app.html')).then(m=>m||caches.match('/offline.html'))));
    return; }
  const same=u.origin===location.origin, cdn=CDN.test(r.url);
  if(!same&&!cdn) return;
  if(same&&!/\.(css|js|png|svg|ico|webmanifest|mp3|woff2?)$/.test(u.pathname)) return;
  if(r.headers.has('range')) return; /* audio seeking: let the browser stream it */
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{ if(res.ok||res.type==='opaque'){ const c=res.clone(); caches.open(V).then(x=>x.put(r,c)); } return res; })));
});

/* Reminders from Wordy (Firebase Cloud Messaging, data-only messages sent by functions/index.js) */
self.addEventListener('push',e=>{
  let m={}; try{ m=e.data?e.data.json():{}; }catch(x){ m={}; }
  const d=m.data||{}, n=m.notification||{};
  const title=d.title||n.title||'Wordy', body=d.body||n.body||'Ворди ждёт тебя на короткую тренировку.';
  e.waitUntil(self.registration.showNotification(title,{body,icon:'/icons/icon-192.png',badge:'/icons/icon-192.png',tag:'wordy-daily',renotify:false,data:{url:d.url||'/app.html'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close(); const url=(e.notification.data&&e.notification.data.url)||'/app.html';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){ if(new URL(c.url).origin===location.origin){ c.focus(); return; } }
    return self.clients.openWindow(url); }));
});
