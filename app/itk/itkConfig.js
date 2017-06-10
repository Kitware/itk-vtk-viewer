var config = require('config');

var itkConfig = {
  webWorkersPath: 'itk/WebWorkers',
  imageIOsPath: '../../itk/ImageIOs'
};

if (typeof config.has === 'function') {
  if (config.has('itk.imageIOsPath')) {
    itkConfig['imageIOsPath'] = config.get('itk.imageIOsPath');
  }

  if (config.has('itk.webWorkersPath')) {
    itkConfig['webWorkersPath'] = config.get('itk.webWorkersPath');
  }
}

module.exports = itkConfig;