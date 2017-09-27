importScripts('workbox-sw.prod.v2.0.1.js');

const workboxSW = new self.WorkboxSW({clientsClaim: true})
workboxSW.precache([
  {
    "url": "5a5c11b4d55ab3a86a26a147af7b9bdf.jpg",
    "revision": "5a5c11b4d55ab3a86a26a147af7b9bdf"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "7b1da026f1c9dc9d8caadbe4bdb7b2a8"
  },
  {
    "url": "index.html",
    "revision": "381f05ac59669ecb8b1aa9f9b9152539"
  },
  {
    "url": "itkVtkImageViewer.js",
    "revision": "9d04c5b01360f46ccba358069cd85657"
  },
  {
    "url": "test.html",
    "revision": "a7927ae23ec755b9f0b3110a5d316f80"
  },
  {
    "url": "workbox-sw.prod.v2.0.1.js",
    "revision": "679d4e73dc756b21e46ee8f1bb52c882"
  }
])

workboxSW.router.registerRoute(
  /\.js|\.png$/,
  workboxSW.strategies.cacheFirst({
  cacheName: 'cacheFirstContent',
  cacheExpiration: {
    maxEntries: 50,
    maxAgeSeconds: 7 * 24 * 60 * 60 * 26,
    }
  })
);
