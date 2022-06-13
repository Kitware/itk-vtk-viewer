import WebworkerPromise from 'webworker-promise'
import FuseComponentsWorker from './FuseComponents.worker'
import {
  countElements,
  getLargestTypeByBytes,
  parseByComponent,
} from './fuseImagesUtils'

const haveSharedArrayBuffer = typeof window.SharedArrayBuffer === 'function'
let worker

export const fuseImages = async ({
  imageAtScale,
  labelAtScale,
  visualizedComponents,
  existingArray,
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
            `Size not equal while fusing images! Last image size: ${baseSize}, "${compInfo.image.name}" image size: ${compInfo.image.size}`
          )
        }
        return [baseSize, compInfos]
      },
      [undefined, []]
    )

  const elementCount = countElements(componentInfo)
  const largestType = getLargestTypeByBytes(componentInfo)

  // We only need to construct a new typed array if we don't already
  // have one of the right length.
  const isExistingArrayMatchingNeed =
    existingArray &&
    existingArray.length === elementCount &&
    typeof oldFusedData === typeof largestType // Avoid losing data if TypedArrays are different between images
  const arrayToFill = isExistingArrayMatchingNeed ? existingArray : undefined

  // Prep for worker.postMessage arguments \\

  // eslint-disable-next-line no-unused-vars
  const componentInfoSansImage = componentInfo.map(({ image, ...rest }) => ({
    ...rest,
  }))

  const transferables = []
  if (
    arrayToFill &&
    !haveSharedArrayBuffer &&
    !(arrayToFill.buffer instanceof SharedArrayBuffer)
  )
    transferables.push(arrayToFill.buffer)

  if (!worker) worker = new WebworkerPromise(new FuseComponentsWorker())
  const [fusedImageData, componentRanges] = await worker.postMessage(
    {
      componentInfo: componentInfoSansImage,
      arrayToFill,
    },
    transferables
  )

  const base = imageByComponent[0]?.image ?? labelByComponent[0]?.image
  const fusedItkImage = {
    ...base,
    data: fusedImageData,
    imageType: {
      ...base.imageType,
      components: componentInfo.length,
    },
  }
  return [fusedItkImage, componentRanges]
}
