import WebworkerPromise from 'webworker-promise'
import ComputeRangeWorker from './ComputeRange.worker'
import WorkerPool from 'itk/WorkerPool'
const haveSharedArrayBuffer = typeof window.SharedArrayBuffer === 'function'

const createComputeRangeWorker = existingWorker => {
  if (existingWorker) {
    const webworkerPromise = new WebworkerPromise(existingWorker)
    return { webworkerPromise, worker: existingWorker }
  }

  const newWorker = new ComputeRangeWorker()
  const newWebworkerPromise = new WebworkerPromise(newWorker)
  return { webworkerPromise: newWebworkerPromise, worker: newWorker }
}

const computeSplitRange = async (webWorker, args) => {
  const { webworkerPromise, worker } = createComputeRangeWorker(webWorker)
  const range = await webworkerPromise.exec('computeRange', args)
  return { range, webWorker: worker }
}

const numberOfWorkers = navigator.hardwareConcurrency
  ? Math.min(navigator.hardwareConcurrency, 6)
  : 4

const computeRangeWorkerPool = new WorkerPool(
  numberOfWorkers,
  computeSplitRange
)

async function computeRange(values, component = 0, numberOfComponents = 1) {
  let numberOfSplits = 1
  if (haveSharedArrayBuffer && values.buffer instanceof SharedArrayBuffer) {
    numberOfSplits = numberOfWorkers
  }

  const taskArgs = new Array(numberOfSplits)
  for (let split = 0; split < numberOfSplits; split++) {
    taskArgs[split] = [
      {
        split,
        numberOfSplits,
        values,
        component,
        numberOfComponents,
      },
    ]
  }

  const ranges = await computeRangeWorkerPool.runTasks(taskArgs).promise
  const min = ranges.reduce(
    (m, r) => Math.min(m, r.range.min),
    Number.MAX_VALUE
  )
  const max = ranges.reduce(
    (m, r) => Math.max(m, r.range.max),
    -Number.MAX_VALUE
  )
  const range = { min, max }
  return range
}

export default computeRange
