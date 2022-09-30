import WebworkerPromise from 'webworker-promise'
import FuseComponentsWorker from './FuseComponents.worker'
import { parseByComponent } from './fuseImagesUtils'

let worker

export const fuseImages = async ({
  imageAtScale,
  labelAtScale,
  visualizedComponents,
  isRangeNeeded,
}) => {
  const [imageByComponent, labelByComponent] = [
    imageAtScale,
    labelAtScale,
  ].map(image => parseByComponent(image))
  const [, componentInfo] = visualizedComponents
    .map(
      comp =>
        comp >= 0 ? imageByComponent[comp] : labelByComponent[comp * -1 - 1] // label component index starts at -1
    )
    // validate sizes of components
    .reduce(
      ([lastSize, compInfos], compInfo) => {
        const baseSize = lastSize ?? compInfo.image.size
        const areDimensionsEqual = compInfo.image.size.every(
          (dim, index) => baseSize[index] === dim
        )
        if (areDimensionsEqual) {
          compInfos.push(compInfo)
        } else {
          console.error(
            `Size not equal while fusing images! First image size: ${baseSize}, this image size: ${compInfo.image.size}`
          )
        }
        return [baseSize, compInfos]
      },
      [undefined, []]
    )

  // eslint-disable-next-line no-unused-vars
  const componentInfoSansImage = componentInfo.map(({ image, ...rest }) => ({
    ...rest,
  }))

  if (!worker) worker = new WebworkerPromise(new FuseComponentsWorker())
  const [fusedImageData, componentRanges] = await worker.postMessage({
    componentInfo: componentInfoSansImage,
    isRangeNeeded,
  })

  const base = imageByComponent[0]?.image ?? labelByComponent[0]?.image
  const fusedItkImage = {
    ...base,
    data: fusedImageData,
    imageType: {
      ...base.imageType,
      components: componentInfo.length,
    },
  }
  return { itkImage: fusedItkImage, componentRanges }
}
