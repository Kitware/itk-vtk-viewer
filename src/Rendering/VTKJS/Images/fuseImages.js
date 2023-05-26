import WebworkerPromise from 'webworker-promise'
import ComposeImageWorker from './ComposeImage.worker.js'

import itkWasmConfig from '../itkConfig.js'

export const fuseImages = async ({
  imageAtScale, //could be array if Conglomerate
  labelAtScale,
  visualizedComponents,
  fixedImageAtScale,
  compare,
}) => {
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
