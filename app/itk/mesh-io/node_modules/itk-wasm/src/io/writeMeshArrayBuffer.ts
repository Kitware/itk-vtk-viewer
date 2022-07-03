import createWebWorkerPromise from '../core/internal/createWebWorkerPromise.js'

import Mesh from '../core/Mesh.js'

import config from '../itkConfig.js'
import WriteArrayBufferResult from './WriteArrayBufferResult.js'
import WriteMeshOptions from './WriteMeshOptions.js'
import PipelineInput from '../pipeline/PipelineInput.js'
import PipelineOutput from '../pipeline/PipelineOutput.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import meshTransferables from '../core/internal/meshTransferables.js'

async function writeMeshArrayBuffer (webWorker: Worker | null, mesh: Mesh, fileName: string, mimeType: string, options: WriteMeshOptions): Promise<WriteArrayBufferResult> {
  if ('useCompression' in (mesh as any) || 'binaryFileType' in (mesh as any)) {
    throw new Error('options are now in the last argument position in itk-wasm')
  }

  let worker = webWorker
  const { webworkerPromise, worker: usedWorker } = await createWebWorkerPromise(worker)
  worker = usedWorker

  const filePath = `./${fileName}`
  const args = ['0', filePath, '--memory-io', '--quiet']
  if (options?.useCompression === true) {
    args.push('--use-compression')
  }
  if (options?.binaryFileType === true) {
    args.push('--binary-file-type')
  }
  const outputs = [
    { data: { path: filePath }, type: InterfaceTypes.BinaryFile }
  ] as PipelineOutput[]
  const inputs = [
    { type: InterfaceTypes.Mesh, data: mesh }
  ] as PipelineInput[]

  const transferables = meshTransferables(mesh)

  interface RunWriteMeshPipelineResult {
    stdout: string
    stderr: string
    outputs: any[]
  }
  const result: RunWriteMeshPipelineResult = await webworkerPromise.postMessage(
    {
      operation: 'writeMesh',
      config: config,
      mimeType,
      fileName,
      pipelinePath: 'WriteMesh', // placeholder
      args,
      outputs,
      inputs
    },
    transferables
  )
  return { arrayBuffer: result.outputs[0].data.data.buffer as ArrayBuffer, webWorker: worker }
}

export default writeMeshArrayBuffer
