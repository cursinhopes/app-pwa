self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Apenas repassa a requisição para a rede (não faz cache offline neste exemplo)
    event.respondWith(fetch(event.request));
});