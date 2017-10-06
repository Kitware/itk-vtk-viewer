importScripts('workbox-sw.prod.v2.0.1.js');

const workboxSW = new self.WorkboxSW({clientsClaim: true})
workboxSW.precache([
  {
    "url": "favicon-32x32.png",
    "revision": "7b1da026f1c9dc9d8caadbe4bdb7b2a8"
  },
  {
    "url": "index.html",
    "revision": "0811d78702c85fe08f9beed09f58ec00"
  },
  {
    "url": "itkVtkImageViewer.js",
    "revision": "c7487cdefaf1079d2e951b6dfa03222f"
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
