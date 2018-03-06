const path = require('path')
const mime = require('mime-types')

const mimeToIO = require('./MimeToIO.js')
const getFileExtension = require('./getFileExtension.js')
const extensionToIO = require('./extensionToIO.js')
const ImageIOIndex = require('./ImageIOIndex.js')

const loadEmscriptenModule = require('./loadEmscriptenModule.js')
const writeImageEmscriptenFSFile = require('./writeImageEmscriptenFSFile.js')

/**
 * Write an image to a file on the local filesystem in Node.js.
 *
 * @param: useCompression compression the pixel data when possible
 * @param: image itk.Image instance to write
 * @param: filePath path to the file on the local filesystem.
 *
 * @return empty Promise
 */
const writeImageLocalFile = (useCompression, image, filePath) => {
  return new Promise(function (resolve, reject) {
    const imageIOsPath = path.resolve(__dirname, 'ImageIOs')
    const absoluteFilePath = path.resolve(filePath)
    try {
      const mimeType = mime.lookup(absoluteFilePath)
      const extension = getFileExtension(absoluteFilePath)

      let io = null
      if (mimeToIO.hasOwnProperty(mimeType)) {
        io = mimeToIO[mimeType]
      } else if (extensionToIO.hasOwnProperty(extension)) {
        io = extensionToIO[extension]
      } else {
        for (let idx = 0; idx < ImageIOIndex.length; ++idx) {
          const modulePath = path.join(imageIOsPath, ImageIOIndex[idx])
          const Module = loadEmscriptenModule(modulePath)
          const imageIO = new Module.ITKImageIO()
          Module.mountContainingDirectory(absoluteFilePath)
          imageIO.SetFileName(absoluteFilePath)
          if (imageIO.CanWriteFile(absoluteFilePath)) {
            io = ImageIOIndex[idx]
            Module.unmountContainingDirectory(absoluteFilePath)
            break
          }
          Module.unmountContainingDirectory(absoluteFilePath)
        }
      }
      if (io === null) {
        reject(Error('Could not find IO for: ' + absoluteFilePath))
      }

      const modulePath = path.join(imageIOsPath, io)
      const Module = loadEmscriptenModule(modulePath)
      Module.mountContainingDirectory(absoluteFilePath)
      writeImageEmscriptenFSFile(Module, useCompression, image, absoluteFilePath)
      Module.unmountContainingDirectory(absoluteFilePath)
      resolve(null)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = writeImageLocalFile
