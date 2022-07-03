import { readAsArrayBuffer } from 'promise-file-reader'

import readImageArrayBuffer from './readImageArrayBuffer.js'
import ReadImageResult from './ReadImageResult.js'

async function readImageFile (webWorker: Worker | null, file: File): Promise<ReadImageResult> {
  const arrayBuffer = await readAsArrayBuffer(file)
  return await readImageArrayBuffer(webWorker, arrayBuffer, file.name, file.type)
}

export default readImageFile
