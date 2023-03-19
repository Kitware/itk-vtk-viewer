import webWorkerPromiseWorkerPool from './webWorkerPromiseWorkerPool'
import ComputeRangesWorker from './ComputeRanges.worker'
import { createRangeHelper } from './createRangeHelper'
const haveSharedArrayBuffer = typeof globalThis.SharedArrayBuffer === 'function'

const numberOfWorkers = navigator.hardwareConcurrency
  ? Math.min(navigator.hardwareConcurrency, 8)
  : 4

const computeRangeWorkerPool = webWorkerPromiseWorkerPool(
  numberOfWorkers,
  ComputeRangesWorker,
  'computeRanges'
)
computeRangeWorkerPool.terminateWorkers()
export async function computeRanges(values, numberOfComponents = 1) {
  const numberOfSplits = numberOfWorkers

  const taskArgs = new Array(numberOfSplits)
  if (haveSharedArrayBuffer && values.buffer instanceof SharedArrayBuffer) {
    for (let split = 0; split < numberOfSplits; split++) {
      taskArgs[split] = [
        {
          split,
          numberOfSplits,
          values,
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
          numberOfComponents,
        },
        [subArray.buffer],
      ]
      arrayIndex += arrayStride
    }
  }

  const rangesBySplit = await computeRangeWorkerPool.runTasks(taskArgs).promise

  const helpers = [...Array(numberOfComponents)].map(createRangeHelper)
  rangesBySplit.forEach(({ result: ranges }) => {
    ranges.forEach(({ min, max }, compIdx) => {
      helpers[compIdx].add(min)
      helpers[compIdx].add(max)
    })
  })
  computeRangeWorkerPool.terminateWorkers()
  return helpers.map(h => h.getRange())
}
