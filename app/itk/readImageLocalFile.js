var path = require('path');
var mime = require('mime-types');

var config = require('./itkConfig.js');

var mimeToIO = require('./MimeToIO.js');
var getFileExtension = require('./getFileExtension.js');
var extensionToIO = require('./extensionToIO.js');

var loadEmscriptenModule = require('./loadEmscriptenModule.js');
var readImageEmscriptenFSFile = require('./readImageEmscriptenFSFile.js');

/**
 * Read an image from a file on the local filesystem in Node.js.
 *
 * @param: filePath path to the file on the local filesystem.
 */
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