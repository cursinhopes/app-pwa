const CACHE_NAME = 'cursinho-pes-v4';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/css/bootstrap.min.css',
  './assets/css/main.css',
  './assets/font/bootstrap-icons.woff2',
  './assets/font/MaterialIconsOutlined.woff2',
  './assets/font/MaterialSymbolsOutlined.woff2',
  './assets/font/Merriweather.woff2',
  './assets/font/Merriweather-Italic.woff2',
  './assets/img/bg-draws-25.png',
  './assets/img/logo-pes-circular.png',
  './assets/js/libs/bootstrap.bundle.min.js',
  './assets/js/libs/jquery.min.js',
  './assets/js/libs/jquery.mobile.custom.min.js',
  './assets/js/libs/jquery.validate.min.js',
  './assets/js/libs/jquery.maskedinput.min.js',
  './assets/js/libs/html5-qrcode.min.js',
  './assets/js/main.js'
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