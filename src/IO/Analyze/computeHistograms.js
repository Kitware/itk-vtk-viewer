const haveSharedArrayBuffer = typeof window.SharedArrayBuffer === 'function'
import webWorkerPromiseWorkerPool from './webWorkerPromiseWorkerPool'
import UpdateHistogramWorker from './UpdateHistogram.worker'

const numberOfWorkers = navigator.hardwareConcurrency
  ? Math.min(navigator.hardwareConcurrency, 6)
  : 4

const updateHistogramWorkerPool = webWorkerPromiseWorkerPool(
  numberOfWorkers,
  () => new UpdateHistogramWorker(),
  'updateHistogram'
)

const BIN_COUNT_DEFAULT = 256

export const computeHistogram = async (
  values,
  component,
  numberOfComponents,
  [min, max]
) => {
  const numberOfSplits = numberOfWorkers

  const isFloatValues =
    values instanceof Float32Array || values instanceof Float64Array
  const numberOfBins = isFloatValues
    ? BIN_COUNT_DEFAULT
    : // only need a bin for each possible integer value
      Math.min(max - min + 1, BIN_COUNT_DEFAULT)

  const taskArgs = new Array(numberOfSplits)
  if (haveSharedArrayBuffer && values.buffer instanceof SharedArrayBuffer) {
    for (let split = 0; split < numberOfSplits; split++) {
      taskArgs[split] = [
        {
          values,
          min,
          max,
          numberOfBins,
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
          values: subArray,
          min,
          max,
          numberOfBins,
          component,
          numberOfComponents,
        },
        [subArray.buffer],
      ]
      arrayIndex += arrayStride
    }
  }

  const histograms = await updateHistogramWorkerPool.runTasks(taskArgs).promise
  const histogram = new Float32Array(numberOfBins)
  histogram.fill(0.0)
  for (let ii = 0; ii < histograms.length; ii++) {
    for (let jj = 0; jj < numberOfBins; jj++) {
      histogram[jj] += histograms[ii].result[jj]
    }
  }
  let maxHistogram = 0.0
  for (let ii = 0; ii < numberOfBins; ii++) {
    maxHistogram = Math.max(histogram[ii], maxHistogram)
  }
  for (let ii = 0; ii < numberOfBins; ii++) {
    histogram[ii] /= maxHistogram
  }
  return histogram
}
