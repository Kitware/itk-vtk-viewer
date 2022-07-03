import readImageArrayBuffer from './readImageArrayBuffer.js'
import readMeshArrayBuffer from './readMeshArrayBuffer.js'

import getFileExtension from './getFileExtension.js'
import extensionToMeshIO from './extensionToMeshIO.js'
import mimeToMeshIO from './internal/MimeToMeshIO.js'

import ReadImageResult from './ReadImageResult.js'
import ReadMeshResult from './ReadMeshResult.js'

async function readArrayBuffer (webWorker: Worker | null, arrayBuffer: ArrayBuffer, fileName: string, mimeType: string): Promise<ReadImageResult | ReadMeshResult > {
  const extension = getFileExtension(fileName)
  const isMesh = !!extensionToMeshIO.has(extension) || !!mimeToMeshIO.has(mimeType)
  if (isMesh) {
    return await readMeshArrayBuffer(webWorker, arrayBuffer, fileName, mimeType)
      .catch(async function () {
        if (webWorker !== null) {
          webWorker.terminate()
        }
        return await readImageArrayBuffer(null, arrayBuffer, fileName, mimeType)
      })
  } else {
    return await readImageArrayBuffer(webWorker, arrayBuffer, fileName, mimeType)
  }
}

export default readArrayBuffer
