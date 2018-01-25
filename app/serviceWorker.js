importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new self.WorkboxSW({clientsClaim: true})
workboxSW.precache([
  {
    "url": "favicon-32x32.png",
    "revision": "7b1da026f1c9dc9d8caadbe4bdb7b2a8"
  },
  {
    "url": "index.html",
    "revision": "57cef5539b7a89a70858d97948c68d32"
  },
  {
    "url": "itkVtkImageViewer.js",
    "revision": "6960ede69a0750ca5eea949dfbe70e55"
  },
  {
    "url": "test.html",
    "revision": "a7927ae23ec755b9f0b3110a5d316f80"
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
