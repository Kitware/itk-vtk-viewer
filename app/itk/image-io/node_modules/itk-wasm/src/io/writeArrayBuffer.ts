import writeImageArrayBuffer from './writeImageArrayBuffer.js'
import writeMeshArrayBuffer from './writeMeshArrayBuffer.js'

import getFileExtension from './getFileExtension.js'
import extensionToMeshIO from './extensionToMeshIO.js'
import mimeToMeshIO from './internal/MimeToMeshIO.js'

import Image from '../core/Image.js'
import Mesh from '../core/Mesh.js'

import WriteArrayBufferResult from './WriteArrayBufferResult.js'

async function writeArrayBuffer (webWorker: Worker | null, imageOrMesh: Image | Mesh, fileName: string, mimeType: string = '', useCompression: boolean = false): Promise<WriteArrayBufferResult> {
  if (typeof imageOrMesh === 'boolean') {
    throw new Error('useCompression is now the argument position in itk-wasm')
  }

  const extension = getFileExtension(fileName)
  const isMesh = !!extensionToMeshIO.has(extension) || !!mimeToMeshIO.has(mimeType)
  if (isMesh) {
    return await writeMeshArrayBuffer(webWorker, imageOrMesh as Mesh, fileName, mimeType, { useCompression })
      .catch(async function () {
        if (webWorker != null) {
          webWorker.terminate()
        }
        return await writeImageArrayBuffer(null, imageOrMesh as Image, fileName, mimeType, useCompression)
      })
  } else {
    return await writeImageArrayBuffer(webWorker, imageOrMesh as Image, fileName, mimeType, useCompression)
  }
}

export default writeArrayBuffer
