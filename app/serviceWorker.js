importScripts('workbox-sw.prod.v2.1.2.js');

const workboxSW = new self.WorkboxSW({clientsClaim: true})
workboxSW.precache([
  {
    "url": "favicon-32x32.png",
    "revision": "7b1da026f1c9dc9d8caadbe4bdb7b2a8"
  },
  {
    "url": "index.html",
    "revision": "7dcaab8e807ddf80153fbf12dd223413"
  },
  {
    "url": "itkVtkImageViewer.js",
    "revision": "f456eb8b7a993295190dcd336b05bcee"
  },
  {
    "url": "test.html",
    "revision": "a7927ae23ec755b9f0b3110a5d316f80"
  },
  {
    "url": "workbox-sw.prod.v2.1.2.js",
    "revision": "685d1ceb6b9a9f94aacf71d6aeef8b51"
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
