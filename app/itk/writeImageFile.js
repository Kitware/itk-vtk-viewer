var PromiseWorker = require('promise-worker-transferable');
var PromiseFileReader = require('promise-file-reader');

var config = require('./itkConfig.js');

var worker = new window.Worker(config.webWorkersPath + '/ImageIOWorker.js');
var promiseWorker = new PromiseWorker(worker);

var readImageFile = function readImageFile(file) {
  return PromiseFileReader.readAsArrayBuffer(file).then(function (arrayBuffer) {
    return promiseWorker.postMessage({ name: file.name, type: file.type, buffer: arrayBuffer, config: config }, [arrayBuffer]);
  });
};

module.exports = readImageFile;