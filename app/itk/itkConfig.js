var config = require('config');

// Note: For the WASM files to be loaded, imageIOsPath must have the path
// '../ImageIOs' relative to webWorkersPath
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