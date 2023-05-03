import WebworkerPromise from 'webworker-promise'

export const fuseImages = async ({
  imageAtScale, //could be array if Conglomerate
  labelAtScale,
  visualizedComponents,
  fixedImageAtScale,
  compare,
}) => {
  const composeWorker = new Worker(
    new URL('./ComposeImage.worker.js', import.meta.url),
    { type: 'module' }
  )
  const worker = new WebworkerPromise(composeWorker)
  const { image } = await worker.postMessage({
    image: imageAtScale,
    labelImage: labelAtScale,
    visualizedComponents,
    fixedImage: fixedImageAtScale,
    compare,
  })
  worker.terminate()

  const componentRanges = image.ranges.map(([min, max]) => ({ min, max }))

  return {
    itkImage: image,
    componentRanges,
  }
}
