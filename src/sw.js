var cacheName = 'material-demo'
var filesToCache = [
  '/index.html',
  '/manifest.json',
  '/material/material.css',
  '/dist/vendor/roboto/fonts/Regular/Roboto-Regular.woff2?v=1.1.0',
  '/dist/vendor/roboto/fonts/Italic/Roboto-Italic.woff2?v=1.1.0',
  '/dist/vendor/roboto/fonts/Light/Roboto-Light.woff2?v=1.1.0',
  '/img/iconx512.png',
  '/img/icon.png',
  '/dist/styles.css',
  '/dist/bundle.js'
]

self.addEventListener('install', function (e) {
  console.log('[ServiceWorker] Install')
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener('activate', function (e) {
  console.log('[ServiceWorker] Activate')
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e, e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request)
    })
  )
})
