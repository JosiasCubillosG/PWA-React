importScripts("/precache-manifest.b677a3af4ffe1d3a24828627a5adfcff.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute("/index.html")

workbox.googleAnalytics.initialize()

workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, 
    workbox.strategies.staleWhileRevalidate(),
    'GET')

workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/images\/media\/meals\/.*/,
  workbox.strategies.cacheFirst({
    cacheableResponse: {statuses: [0, 200]},
    cacheName: "api-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7*24*60*60
      })
    ]
  }),
  'GET')

// Last fuentes van con Cache First y vencen al mes
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/, 
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60
      })
    ]
  }),
  'GET')
  
// Todo lo demás usa Network First
workbox.routing.registerRoute(/^https?.*/,
  workbox.strategies.networkFirst(), 'GET')
