import { readAsArrayBuffer } from 'promise-file-reader'

import readImageArrayBuffer from './readImageArrayBuffer.js'
import ReadImageResult from './ReadImageResult.js'

async function readImageBlob (webWorker: Worker | null, blob: Blob, fileName: string, mimeType: string): Promise<ReadImageResult> {
  const arrayBuffer = await readAsArrayBuffer(blob)
  return await readImageArrayBuffer(webWorker, arrayBuffer, fileName, mimeType)
}

export default readImageBlob
