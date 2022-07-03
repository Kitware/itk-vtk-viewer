import createWebWorkerPromise from '../core/internal/createWebWorkerPromise.js'
import Mesh from '../core/Mesh.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PolyData from '../core/PolyData.js'
import meshTransferables from '../core/internal/meshTransferables.js'
import PipelineInput from '../pipeline/PipelineInput.js'
import config from '../itkConfig.js'

async function meshToPolyData (webWorker: Worker | null, mesh: Mesh): Promise<{ polyData: PolyData, webWorker: Worker }> {
  let worker = webWorker
  const { webworkerPromise, worker: usedWorker } = await createWebWorkerPromise(worker)
  worker = usedWorker

  const args = ['0', '0', '--memory-io']
  const outputs = [
    { type: InterfaceTypes.PolyData }
  ]
  const inputs = [
    { type: InterfaceTypes.Mesh, data: mesh }
  ] as PipelineInput[]

  const transferables = meshTransferables(mesh)
  interface RunMeshToPolyDataPipelineResult {
    outputs: any[]
  }

  const result: RunMeshToPolyDataPipelineResult = await webworkerPromise.postMessage(
    {
      operation: 'meshToPolyData',
      config: config,
      pipelinePath: 'MeshToPolyData', // placeholder
      args,
      outputs,
      inputs
    },
    transferables
  )
  return { polyData: result.outputs[0].data as PolyData, webWorker: worker }
}

export default meshToPolyData
