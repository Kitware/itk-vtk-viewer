importScripts('workbox-sw.prod.v2.0.1.js');

const workboxSW = new self.WorkboxSW({clientsClaim: true})
workboxSW.precache([])

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
