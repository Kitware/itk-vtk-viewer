import ComputeRangeWorker from './ComputeRange.worker'
const haveSharedArrayBuffer = typeof globalThis.SharedArrayBuffer === 'function'
import webWorkerPromiseWorkerPool from './webWorkerPromiseWorkerPool'

const numberOfWorkers = navigator.hardwareConcurrency
  ? Math.min(navigator.hardwareConcurrency, 8)
  : 4

const computeRangeWorkerPool = webWorkerPromiseWorkerPool(
  numberOfWorkers,
  ComputeRangeWorker,
  'computeRange'
)

async function computeRange(values, component = 0, numberOfComponents = 1) {
  const numberOfSplits = numberOfWorkers

  const taskArgs = new Array(numberOfSplits)
  if (haveSharedArrayBuffer && values.buffer instanceof SharedArrayBuffer) {
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
  } else {
    let arrayStride = Math.floor(values.length / numberOfSplits) || 1
    arrayStride += arrayStride % numberOfComponents
    let arrayIndex = 0
    for (let split = 0; split < numberOfSplits; split++) {
      const arrayStart = arrayIndex
      const arrayEnd = Math.min(arrayIndex + arrayStride, values.length - 1)
      const subArray = values.slice(arrayStart, arrayEnd + 1)
      taskArgs[split] = [
        {
          split: 0, // 0 because array already split
          numberOfSplits: 1,
          values: subArray,
          component,
          numberOfComponents,
        },
        [subArray.buffer],
      ]
      arrayIndex += arrayStride
    }
  }

  const ranges = await computeRangeWorkerPool.runTasks(taskArgs).promise
  const min = ranges.reduce(
    (m, r) => Math.min(m, r.result.min),
    Number.MAX_VALUE
  )
  const max = ranges.reduce(
    (m, r) => Math.max(m, r.result.max),
    -Number.MAX_VALUE
  )
  const range = { min, max }
  return range
}

export default computeRange
