import WebworkerPromise from 'webworker-promise'
import ComposeImageWorker from './ComposeImage.worker.js'

import itkConfig from '../../../itkConfig.js'

export const fuseImages = async ({
  imageAtScale, //could be array if Conglomerate
  labelAtScale,
  visualizedComponents,
  fixedImageAtScale,
  compare,
}) => {
  // When testing, itkConfig is not full URL, so ensure it's absolute
  // deep copy
  const itkWasmConfig = JSON.parse(JSON.stringify(itkConfig))
  itkWasmConfig.pipelineWorkerUrl = new URL(
    itkWasmConfig.pipelineWorkerUrl,
    window.location.href
  ).href
  itkWasmConfig.pipelinesUrl = new URL(
    itkWasmConfig.pipelinesUrl,
    window.location.href
  ).href

  const worker = new WebworkerPromise(new ComposeImageWorker())
  const { image } = await worker.postMessage({
    image: imageAtScale,
    labelImage: labelAtScale,
    visualizedComponents,
    fixedImage: fixedImageAtScale,
    compare,
    itkWasmConfig,
  })
  worker.terminate()

  const componentRanges = image.ranges.map(([min, max]) => ({ min, max }))

  return {
    itkImage: image,
    componentRanges,
  }
}
