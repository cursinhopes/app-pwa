const APP_VERSION = 'v0.1.0';
const CACHE_NAME = `app-cache-${APP_VERSION}`;

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './icons/icon-48.webp',
  './icons/icon-72.webp',
  './icons/icon-96.webp',
  './icons/icon-128.webp',
  './icons/icon-192.webp',
  './icons/icon-256.webp',
  './icons/icon-512.webp',
  './assets/AdminDashboard-lANtlgrg.js',
  './assets/api-B4PbNhwG.js',
  './assets/bg-draws-25-2gwT0LHz.png',
  './assets/dist-CgbWuuq4.js',
  './assets/Home-DSljXcmc.js',
  './assets/index-lbsu0YXM.css',
  './assets/index-lbsu0YXM.css',
  './assets/index-Q8bq6Tn0.js',
  './assets/ionic-8Q9-QJYw.css',
  './assets/ionic-BJCPpJVZ.js',
  './assets/Login-BipGDMnF.js',
  './assets/Login-DUGDC7OD.css',
  './assets/logo-header-PJNAaBuh.png',
  './assets/logo-pes-circle-D6qlPk9C.png',
  './assets/MaterialSymbolsOutlined-Bh870CJt.woff2',
  './assets/Merriweather-BUlHP3aG.woff2',
  './assets/Merriweather-Italic-BbZJL_JF.woff2',
  './assets/NotFound-C8EIkarP.js',
  './assets/Roboto-italic-BZYj8CJm.woff2',
  './assets/Roboto-normal-ccAYIvAh.woff2',
  './assets/rolldown-runtime-hePW80VL.js',
  './assets/ScanCode-Bt32Yf-7.js',
  './assets/storage-CrOw00l9.js',
  './assets/Unauthorized-aQiPHhQ4.js',
  './assets/vendor-BTcoGTzl.js',
  './assets/web-ASTYnRdb.js',
  './assets/web-BY3ZXy4Z.js',
];

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando e cacheando ativos...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Apagando cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {

        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(event.request).then((networkResponse) => {
            return networkResponse;
        });
      })
  );
});