import readImageFile from './readImageFile.js'
import readMeshFile from './readMeshFile.js'

import getFileExtension from './getFileExtension.js'
import extensionToMeshIO from './extensionToMeshIO.js'

import ReadImageResult from './ReadImageResult.js'
import ReadMeshResult from './ReadMeshResult.js'

async function readFile (webWorker: Worker | null, file: File): Promise<ReadImageResult | ReadMeshResult > {
  const extension = getFileExtension(file.name)
  const isMesh = extensionToMeshIO.has(extension)
  if (isMesh) {
    try {
      const result = await readMeshFile(webWorker, file)
      return result
    } catch (unused) {
      if (webWorker != null) {
        webWorker.terminate()
      }
      return await readImageFile(null, file)
    }
  } else {
    return await readImageFile(webWorker, file)
  }
}

export default readFile
