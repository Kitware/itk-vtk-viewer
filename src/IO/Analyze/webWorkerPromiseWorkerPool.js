import { WorkerPool } from 'itk-wasm'

import WebworkerPromise from 'webworker-promise'

function webWorkerPromiseWorkerPool(
  numberOfWorkers,
  makeWorker,
  operationName
) {
  const createWorker = () => {
    const newWorker = makeWorker()
    const webWorkerPromise = new WebworkerPromise(newWorker)
    return { webWorkerPromise, worker: newWorker }
  }

  const compute = async (webWorker, ...args) => {
    const { webWorkerPromise, worker } = createWorker(webWorker)
    const result = await webWorkerPromise.exec(operationName, ...args)
    return { result, webWorker: worker }
  }

  const workerPool = new WorkerPool(numberOfWorkers, compute)

  return workerPool
}

export default webWorkerPromiseWorkerPool
