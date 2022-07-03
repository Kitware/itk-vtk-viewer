import { readAsArrayBuffer } from 'promise-file-reader'

import ReadDICOMTagsResult from './ReadDICOMTagsResult.js'
import readDICOMTagsArrayBuffer from './readDICOMTagsArrayBuffer.js'

async function readDICOMTags (webWorker: Worker, file: File, tags: string[] | null = null): Promise<ReadDICOMTagsResult> {
  const arrayBuffer = await readAsArrayBuffer(file)
  return await readDICOMTagsArrayBuffer(webWorker, arrayBuffer, tags)
}

export default readDICOMTags
