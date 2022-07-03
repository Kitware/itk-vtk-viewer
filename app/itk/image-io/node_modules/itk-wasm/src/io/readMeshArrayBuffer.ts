import createWebWorkerPromise from '../core/internal/createWebWorkerPromise.js'
import Mesh from '../core/Mesh.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PipelineInput from '../pipeline/PipelineInput.js'

import config from '../itkConfig.js'

import ReadMeshResult from './ReadMeshResult.js'

async function readMeshArrayBuffer (webWorker: Worker | null, arrayBuffer: ArrayBuffer, fileName: string, mimeType: string): Promise<ReadMeshResult> {
  let worker = webWorker
  const { webworkerPromise, worker: usedWorker } = await createWebWorkerPromise(worker)
  worker = usedWorker

  const filePath = `./${fileName}`
  const args = [filePath, '0', '--memory-io', '--quiet']
  const outputs = [
    { type: InterfaceTypes.Mesh }
  ]
  const inputs = [
    { type: InterfaceTypes.BinaryFile, data: { path: filePath, data: new Uint8Array(arrayBuffer) } }
  ] as PipelineInput[]

  const transferables: ArrayBuffer[] = [arrayBuffer]
  interface RunReadMeshPipelineResult {
    stdout: string
    stderr: string
    outputs: any[]
  }

  const result: RunReadMeshPipelineResult = await webworkerPromise.postMessage(
    {
      operation: 'readMesh',
      config: config,
      mimeType,
      fileName,
      pipelinePath: 'ReadMesh', // placeholder
      args,
      outputs,
      inputs
    },
    transferables
  )
  return { mesh: result.outputs[0].data as Mesh, webWorker: worker }
}

export default readMeshArrayBuffer
