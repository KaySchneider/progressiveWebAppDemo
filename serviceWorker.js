//we must change the cacheName to see our changes to app.js ;)
var cacheName = "simpleStartpageCacheV3"; //we define an cacheName to identify the cache and the version
//here we add all the files we want later to cache
var filesToCache=[
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


//here we start with the event listener
self.addEventListener('install', function(e) {
    console.debug('called install!');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    )
});

self.addEventListener('activate', function(e) {
    //this is called when the service worker is activated!
    //its also called when the service worker was updated
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key){
                if(key !== cacheName) {
                    //its important to remove the old caches
                    console.debug("[ServiceWorker] Removing old cache ", key);
                    return caches.delete(key);
                }
            }))
        })
    )
});

self.addEventListener('fetch', function(e) {
    console.debug('event fetch');
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});