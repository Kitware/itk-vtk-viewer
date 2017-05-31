var path = require('path');
var mime = require('mime-types');

var config = require('./itkConfig.js');

var mimeToIO = require('./itkMimeToIO.js');
var getFileExtension = require('./itkgetFileExtension.js');
var extensionToIO = require('./itkExtensionToIO.js');

var loadEmscriptenModule = require('./itkloadEmscriptenModule.js');
var readImageEmscriptenFSFile = require('./itkreadImageEmscriptenFSFile.js');

var readImageLocalFile = function readImageLocalFile(filePath) {
  return new Promise(function (resolve, reject) {
    try {
      var mimeType = mime.lookup(filePath);
      var extension = getFileExtension(filePath);

      var io = null;
      if (mimeToIO.hasOwnProperty(mimeType)) {
        io = mimeToIO[mimeType];
      } else if (extensionToIO.hasOwnProperty(extension)) {
        io = extensionToIO[extension];
      } else {
        // todo: Iterate through available IO's and have them run
        // .CanReadFile(filePath)
      }
      if (io === null) {
        reject(Error('Could not find IO for: ' + filePath));
      }

      var modulePath = path.join(config.imageIOsPath, io);
      var Module = loadEmscriptenModule(modulePath);
      Module.mountContainingDirectory(filePath);
      var image = readImageEmscriptenFSFile(Module, filePath);
      Module.unmountContainingDirectory(filePath);
      resolve(image);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = readImageLocalFile;