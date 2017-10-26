var PromiseWorker = require('promise-worker-transferable');

var config = require('./itkConfig.js');

var worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js');
var promiseWorker = new PromiseWorker(worker);

/**
 * Read an image from a file ArrayBuffer in the browser.
 *
 * @param: data arrayBuffer that contains the file contents
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
var readImageArrayBuffer = function readImageArrayBuffer(arrayBuffer, fileName, mimeType) {
  return promiseWorker.postMessage({ operation: 'readImage', name: fileName, type: mimeType, data: arrayBuffer, config: config }, [arrayBuffer]);
};

module.exports = readImageArrayBuffer;