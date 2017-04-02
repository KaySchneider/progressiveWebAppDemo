var cacheName = "simpleStartpageCacheV5";
var filesToCache = [
    '/bower_components/material-design-lite/material.min.css',
    '/css/styles.css',
    '/bower_components/material-design-lite/material.min.js',
    '/bower_components/handlebars/handlebars.min.js',
    '/js/app.js',
    '/images/amazonLogo.png',
    '/images/facebookLogo.png',
    '/images/youtubeLogo.png',
    '/manifest.json',
    '/images/hackIcon.png',
    '/'
];


self.addEventListener('install', function(e) {
    //is called when the service worker will be installed
    console.debug('called install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);                
        })
    )
});

self.addEventListener('activate', function(e) {
//is called when the current service worker is activated by the browser
    //here we clear old cache versions. 
    console.debug('called activated');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
    console.log('called fetch');
    e.respondWith(
        caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
        })
    );
});