var PromiseWorker = require('promise-worker-transferable');

var config = require('./itkConfig.js');

var worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js');
var promiseWorker = new PromiseWorker(worker);

/**
 * @param: buffer arrayBuffer that contains the file contents
 * @param: fileName string that contains the file name
 * @param: mimeType optional mime-type string
 */
var readImageArrayBuffer = function readImageArrayBuffer(arrayBuffer, fileName, mimeType) {
  return promiseWorker.postMessage({ name: fileName, type: mimeType, buffer: arrayBuffer }, [arrayBuffer]);
};

module.exports = readImageArrayBuffer;