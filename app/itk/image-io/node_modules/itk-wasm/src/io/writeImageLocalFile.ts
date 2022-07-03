import path from 'path'
import mime from 'mime-types'

import mimeToIO from './internal/MimeToImageIO.js'
import getFileExtension from './getFileExtension.js'
import extensionToIO from './extensionToImageIO.js'
import ImageIOIndex from './internal/ImageIOIndex.js'

import loadEmscriptenModule from '../core/internal/loadEmscriptenModuleNode.js'
import runPipelineEmscripten from '../pipeline/internal/runPipelineEmscripten.js'
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'
import findLocalImageIOPath from './internal/findLocalImageIOPath.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PipelineInput from '../pipeline/PipelineInput.js'
import PipelineOutput from '../pipeline/PipelineOutput.js'

import Image from '../core/Image.js'

/**
 * Write an image to a file on the local filesystem in Node.js.
 *
 * @param: image itk.Image instance to write
 * @param: filePath path to the file on the local filesystem.
 * @param: useCompression compression the pixel data when possible
 *
 * @return Promise<null>
 */
async function writeImageLocalFile (image: Image, filePath: string, useCompression: boolean = false): Promise<null> {
  if (typeof image === 'boolean') {
    throw new Error('useCompression is now the last argument in itk-wasm')
  }

  const imageIOsPath = findLocalImageIOPath()
  const absoluteFilePath = path.resolve(filePath)
  const mimeType = mime.lookup(absoluteFilePath)
  const extension = getFileExtension(absoluteFilePath)

  const args = ['0', absoluteFilePath, '--memory-io', '--quiet']
  if (useCompression) {
    args.push('--use-compression')
  }
  const desiredOutputs = [
  ] as PipelineOutput[]
  const inputs = [
    { type: InterfaceTypes.Image, data: image }
  ] as PipelineInput[]

  let io = null
  if (mimeType !== false && mimeToIO.has(mimeType)) {
    io = mimeToIO.get(mimeType)
  } else if (extensionToIO.has(extension)) {
    io = extensionToIO.get(extension)
  } else {
    for (let idx = 0; idx < ImageIOIndex.length; ++idx) {
      const modulePath = path.join(imageIOsPath, ImageIOIndex[idx] + 'WriteImage.js')
      const writeImageModule = await loadEmscriptenModule(modulePath) as PipelineEmscriptenModule
      const mountedFilePath = writeImageModule.mountContainingDir(absoluteFilePath)
      const { returnValue } = runPipelineEmscripten(writeImageModule, args, desiredOutputs, inputs)
      writeImageModule.unmountContainingDir(mountedFilePath)
      if (returnValue === 0) {
        return null
      }
    }
  }
  if (io === null) {
    throw Error('Could not find IO for: ' + absoluteFilePath)
  }

  const modulePath = path.join(imageIOsPath, io as string + 'WriteImage.js')
  const writeImageModule = await loadEmscriptenModule(modulePath) as PipelineEmscriptenModule
  const mountedFilePath = writeImageModule.mountContainingDir(absoluteFilePath)
  runPipelineEmscripten(writeImageModule, args, desiredOutputs, inputs)
  writeImageModule.unmountContainingDir(mountedFilePath)
  return null
}

export default writeImageLocalFile
