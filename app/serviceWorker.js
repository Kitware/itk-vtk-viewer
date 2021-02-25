/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("autoworkbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "autoworkbox-v4.3.1"});

importScripts(
  "autoprecache-manifest.870d42406272213b6d5be017dabe759a.js"
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "b4ead4d3696006a600b8.jpg",
    "revision": "e73ecf6eac4e16c51b94aff6ec40ac3f"
  },
  {
    "url": "f15a50b65e584afdbf29.png",
    "revision": "d607682ba3901d2d5de998c3355079f8"
  },
  {
    "url": "favicon-32x32.png",
    "revision": "7b1da026f1c9dc9d8caadbe4bdb7b2a8"
  },
  {
    "url": "index.html",
    "revision": "a2b34729386d363499348b41885886cd"
  },
  {
    "url": "itkVtkViewer.js",
    "revision": "01a08f01fa2f8e2e37e3bd071994da4a"
  },
  {
    "url": "itkVtkViewerCDN.js",
    "revision": "d8794785dc5e3730dc0b2856df0873c5"
  },
  {
    "url": "test.html",
    "revision": "7ae13ed21ff30dda487760df4b24897c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.js|\.png|\.wasm$/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"itk-vtk-viewer-StaleWhileRevalidate", plugins: [new workbox.expiration.Plugin({ maxEntries: 50, maxAgeSeconds: 1209600, purgeOnQuotaError: false })] }), 'GET');
