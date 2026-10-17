const CACHE_NAME = 'aev-battle-offline-v1';
const APP_FILES = ['./', './index.html'];
const THREE_MODULE = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_FILES);
    try {
      const response = await fetch(THREE_MODULE, { mode: 'cors', cache: 'reload' });
      if (response.ok) await cache.put(THREE_MODULE, response);
    } catch (error) {
      // The app shell still installs; the module is cached on a later successful visit.
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('aev-battle-') && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const isThreeModule = request.url === THREE_MODULE;
  const isAppPage = url.origin === self.location.origin && (request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/'));

  if (isThreeModule) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(THREE_MODULE);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) await cache.put(THREE_MODULE, response.clone());
      return response;
    })());
    return;
  }

  if (isAppPage) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put('./index.html', response.clone());
        return response;
      } catch (error) {
        return (await cache.match(request)) || (await cache.match('./index.html')) || Response.error();
      }
    })());
  }
});
