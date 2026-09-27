/* CARACOLES · Revalidacion automatica de recursos, sin renombrados.
   GitHub Pages controla su propia cache CDN: la publicacion sigue pudiendo
   tardar. No se guardan copias persistentes en CacheStorage. */
'use strict';

self.addEventListener('install',event=>{
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});

const scopePath=new URL(self.registration.scope).pathname;
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin || !url.pathname.startsWith(scopePath))return;

  // Los PDF quedan al margen; site.js genera un parametro nuevo por pulsacion.
  if(/\.pdf$/i.test(url.pathname))return;

  const navigate=request.mode==='navigate';
  const staticAsset=url.pathname.startsWith(scopePath+'assets/') &&
    /\.(?:css|js|png|jpe?g|webp|svg|gif)$/i.test(url.pathname);
  const manifest=url.pathname===scopePath+'manifest.webmanifest';
  if(!navigate && !staticAsset && !manifest)return;

  // no-cache obliga al navegador a revalidar incluso si su copia local
  // sigue vigente. Si el contenido no cambia, HTTP puede devolver 304.
  event.respondWith(fetch(request,{cache:'no-cache'}));
});
