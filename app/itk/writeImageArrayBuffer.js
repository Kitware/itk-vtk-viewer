var PromiseWorker = require('promise-worker-transferable');

var config = require('./itkConfig.js');

var worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js');
var promiseWorker = new PromiseWorker(worker);

/**
 * Write a file ArrayBuffer from an image in the browser.
 *
 * @param: useCompression compression the pixel buffer when possible
 * @param: image itk.Image instance to write
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
var writeImageArrayBuffer = function writeImageArrayBuffer(useCompression, image, fileName, mimeType) {
  return promiseWorker.postMessage({ operation: 'writeImage', name: fileName, type: mimeType, image: image, useCompression: useCompression, config: config }, [image.buffer.buffer]);
};

module.exports = writeImageArrayBuffer;