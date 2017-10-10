var path = require('path');
var mime = require('mime-types');

var config = require('./itkConfig.js');

var mimeToIO = require('./MimeToIO.js');
var getFileExtension = require('./getFileExtension.js');
var extensionToIO = require('./extensionToIO.js');
var ImageIOIndex = require('./ImageIOIndex.js');

var loadEmscriptenModule = require('./loadEmscriptenModule.js');
var writeImageEmscriptenFSFile = require('./writeImageEmscriptenFSFile.js');

/**
 * Write an image to a file on the local filesystem in Node.js.
 *
 * @param: useCompression compression the pixel buffer when possible
 * @param: image itk.Image instance to write
 * @param: filePath path to the file on the local filesystem.
 */
var writeImageLocalFile = function writeImageLocalFile(useCompression, image, filePath) {
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
        for (var idx = 0; idx < ImageIOIndex.length; ++idx) {
          var _modulePath = path.join(config.imageIOsPath, ImageIOIndex[idx]);
          var _Module = loadEmscriptenModule(_modulePath);
          var imageIO = new _Module.ITKImageIO();
          _Module.mountContainingDirectory(filePath);
          imageIO.SetFileName(filePath);
          if (imageIO.CanWriteFile(filePath)) {
            io = ImageIOIndex[idx];
            _Module.unmountContainingDirectory(filePath);
            break;
          }
          _Module.unmountContainingDirectory(filePath);
        }
      }
      if (io === null) {
        reject(Error('Could not find IO for: ' + filePath));
      }

      var modulePath = path.join(config.imageIOsPath, io);
      var Module = loadEmscriptenModule(modulePath);
      Module.mountContainingDirectory(filePath);
      writeImageEmscriptenFSFile(Module, useCompression, image, filePath);
      Module.unmountContainingDirectory(filePath);
      resolve(null);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = writeImageLocalFile;