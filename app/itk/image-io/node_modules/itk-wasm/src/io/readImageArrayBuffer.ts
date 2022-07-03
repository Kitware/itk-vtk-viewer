import createWebWorkerPromise from '../core/internal/createWebWorkerPromise.js'
import Image from '../core/Image.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PipelineInput from '../pipeline/PipelineInput.js'

import config from '../itkConfig.js'

import ReadImageResult from './ReadImageResult.js'

async function readImageArrayBuffer (webWorker: Worker | null, arrayBuffer: ArrayBuffer, fileName: string, mimeType: string): Promise<ReadImageResult> {
  let worker = webWorker
  const { webworkerPromise, worker: usedWorker } = await createWebWorkerPromise(worker)
  worker = usedWorker

  const filePath = `./${fileName}`
  const args = [filePath, '0', '--memory-io', '--quiet']
  const outputs = [
    { type: InterfaceTypes.Image }
  ]
  const inputs = [
    { type: InterfaceTypes.BinaryFile, data: { path: filePath, data: new Uint8Array(arrayBuffer) } }
  ] as PipelineInput[]

  const transferables: ArrayBuffer[] = [arrayBuffer]
  interface RunReadImagePipelineResult {
    stdout: string
    stderr: string
    outputs: any[]
  }
  const result: RunReadImagePipelineResult = await webworkerPromise.postMessage(
    {
      operation: 'readImage',
      config: config,
      mimeType,
      fileName,
      pipelinePath: 'ReadImage', // placeholder
      args,
      outputs,
      inputs
    },
    transferables
  )
  return { image: result.outputs[0].data as Image, webWorker: worker }
}

export default readImageArrayBuffer
