import WebworkerPromise from 'webworker-promise'
import FuseComponentsWorker from './FuseComponents.worker'

export const fuseImages = async ({
  imageAtScale,
  labelAtScale,
  visualizedComponents,
}) => {
  const worker = new WebworkerPromise(new FuseComponentsWorker())
  const [fusedImageData, componentRanges] = await worker.postMessage({
    image: imageAtScale,
    label: labelAtScale,
    visualizedComponents,
  })
  worker.terminate()

  const base = imageAtScale ?? labelAtScale
  const fusedItkImage = {
    ...base,
    data: fusedImageData,
    imageType: {
      ...base.imageType,
      components: visualizedComponents.length,
    },
  }
  return {
    itkImage: fusedItkImage,
    componentRanges,
  }
}
