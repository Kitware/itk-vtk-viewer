import createWebWorkerPromise from '../core/internal/createWebWorkerPromise.js'
import Mesh from '../core/Mesh.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PolyData from '../core/PolyData.js'
import polyDataTransferables from '../core/internal/polyDataTransferables.js'
import PipelineInput from '../pipeline/PipelineInput.js'
import config from '../itkConfig.js'

async function polyDataToMesh (webWorker: Worker | null, polyData: PolyData): Promise<{ mesh: Mesh, webWorker: Worker }> {
  let worker = webWorker
  const { webworkerPromise, worker: usedWorker } = await createWebWorkerPromise(worker)
  worker = usedWorker

  const args = ['0', '0', '--memory-io']
  const outputs = [
    { type: InterfaceTypes.Mesh }
  ]
  const inputs = [
    { type: InterfaceTypes.PolyData, data: polyData }
  ] as PipelineInput[]

  const transferables = polyDataTransferables(polyData)
  interface Result {
    outputs: any[]
  }

  const result: Result = await webworkerPromise.postMessage(
    {
      operation: 'polyDataToMesh',
      config: config,
      pipelinePath: 'PolyDataToMesh', // placeholder
      args,
      outputs,
      inputs
    },
    transferables
  )
  return { mesh: result.outputs[0].data as Mesh, webWorker: worker }
}

export default polyDataToMesh
