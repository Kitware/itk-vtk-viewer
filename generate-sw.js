const workboxBuild = require('workbox-build')

workboxBuild.injectManifest({
  "globDirectory": "dist/",
  "globPatterns": [
    "*.{jpg,png,html,js}"
  ],
  "swSrc": "src/serviceWorker.js",
  "swDest": "dist/serviceWorker.js",
  "globIgnores": [
    "serviceWorker.js"
  ]
}).then(() => {
  console.log('The production service worker has been generated.');
})
