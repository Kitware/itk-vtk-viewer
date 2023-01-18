import WebworkerPromise from 'webworker-promise'
import FuseComponentsWorker from './FuseComponents.worker'

export const fuseImages = async ({
  imageAtScale, //could be array if Conglomerate
  labelAtScale,
  visualizedComponents,
}) => {
  const worker = new WebworkerPromise(new FuseComponentsWorker())
  const [fusedImageData, componentRanges] = await worker.postMessage({
    image: imageAtScale,
    labelImage: labelAtScale,
    visualizedComponents,
  })
  worker.terminate()

  const firstImage = Array.isArray(imageAtScale)
    ? imageAtScale[0]
    : imageAtScale
  const base = firstImage ?? labelAtScale
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
