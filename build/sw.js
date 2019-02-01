importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

// custom adjustments
console.log('Service Worker is running.');

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
    "url": "about.html",
    "revision": "c7367f796222132d5256cb4e87d5c5c7"
  },
  {
    "url": "css/main.css",
    "revision": "d71c9d18ac66472c2329088217c1efec"
  },
  {
    "url": "how-to-use.html",
    "revision": "d2e21d953a51e9c84d29da251efe8843"
  },
  {
    "url": "index.html",
    "revision": "38c24c061da69cd9826bdc902a32306e"
  },
  {
    "url": "js/app.js",
    "revision": "8f8734b3eecdde6257e572f4ebe64a10"
  },
  {
    "url": "js/clipboard.min.js",
    "revision": "f06c52bfddb458ad87349acf9fac06c5"
  },
  {
    "url": "js/github-buttons.js",
    "revision": "ade2f6764be01faa8b90d28976b3377f"
  },
  {
    "url": "js/iro.min.js",
    "revision": "f8ce197d22414b5cc828727d0a48c83e"
  },
  {
    "url": "og.index.html",
    "revision": "f8fb77ef6b9d8f1c96e03ba47643685c"
  }
]);