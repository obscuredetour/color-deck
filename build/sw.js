importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// custom adjustments
console.log('App & Service Worker is running.');

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.precaching.precacheAndRoute([
  {
    "url": "css/main.css",
    "revision": "a05d65b3f7cdf18311ab24a08f344d0a"
  },
  {
    "url": "index.html",
    "revision": "0e99ec242ed04e771d25fc42f233b7aa"
  },
  {
    "url": "js/app.js",
    "revision": "15fefc9b08a62422fefa50a580f2a208"
  },
  {
    "url": "js/iro.min.js",
    "revision": "911098ff029402385f3c95c826533903"
  }
]);