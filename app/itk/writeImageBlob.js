var PromiseWorker = require('promise-worker-transferable');
var PromiseFileReader = require('promise-file-reader');

var config = require('./itkConfig.js');

var worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js');
var promiseWorker = new PromiseWorker(worker);

/**
 * @param: useCompression compression the pixel buffer when possible
 * @param: image itk.Image instance to write
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
var writeImageBlob = function writeImageBlob(useCompression, image, fileName, mimeType) {
  return promiseWorker.postMessage({ operation: 'write', name: fileName, type: mimeType, image: image, useCompression: useCompression, config: config }, [image.buffer]);
};

module.exports = writeImageBlob;