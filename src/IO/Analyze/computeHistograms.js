import UpdateHistogramWorker from './UpdateHistogram.worker'
const haveSharedArrayBuffer = typeof window.SharedArrayBuffer === 'function'
import webWorkerPromiseWorkerPool from './webWorkerPromiseWorkerPool'

const numberOfWorkers = navigator.hardwareConcurrency
  ? Math.min(navigator.hardwareConcurrency, 6)
  : 4

const updateHistogramWorkerPool = webWorkerPromiseWorkerPool(
  numberOfWorkers,
  UpdateHistogramWorker,
  'updateHistogram'
)

export const computeHistogram = async (actorContext, component) => {
  const numberOfSplits = numberOfWorkers

  const dataArray = actorContext.fusedImage.getPointData().getScalars()
  const numberOfComponents = dataArray.getNumberOfComponents()

  const fusedImageComponent = actorContext.visualizedComponents.indexOf(
    component
  )
  const [min, max] = actorContext.colorRangeBounds.get(component) ?? [0, 0] // [0, 0] default for no image, only imageLabel case

  let numberOfBins = 256
  if (
    typeof values !== typeof Float32Array ||
    typeof values !== typeof Float64Array
  ) {
    const intBins = max - min + 1
    if (intBins < numberOfBins) {
      numberOfBins = intBins
    }
  }

  const values = dataArray.getData()

  const taskArgs = new Array(numberOfSplits)
  if (haveSharedArrayBuffer && values.buffer instanceof SharedArrayBuffer) {
    for (let split = 0; split < numberOfSplits; split++) {
      taskArgs[split] = [
        {
          values,
          min,
          max,
          numberOfBins,
          component: fusedImageComponent,
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
          component: fusedImageComponent,
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
