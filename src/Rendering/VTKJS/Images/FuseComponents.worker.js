import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges } from '../../../IO/Analyze/computeRanges'
import { resampleLabelImage } from '../../../IO/ResampleLabelImage/ResampleLabelImage'
import { parseByComponent, fuseComponents } from './fuseImagesUtils'

const pickRanges = compInfos =>
  compInfos
    .map(({ image: { ranges }, fromComponent }) => ranges?.[fromComponent]) // no ranges in label
    // if missing any range, return undefined
    .reduce((ranges, range) => {
      if (!ranges || !range) return undefined
      return [...ranges, range]
    }, [])
    ?.map(([min, max]) => ({ min, max }))

const ensureSameSize = async ({ image, labelImage }) => {
  const { size: imageSize } = image
  const { size: labelSize } = labelImage

  if (imageSize.every((s, idx) => s === labelSize[idx])) return labelImage

  return resampleLabelImage(image, labelImage)
}

registerWebworker(async ({ image, labelImage, visualizedComponents }) => {
  const labelResampled =
    labelImage &&
    (await ensureSameSize({
      image: Array.isArray(image) ? image[0] : image, // if Conglomerate, just grab first image
      labelImage,
    }))

  const [imageByComponent, labelByComponent] = [
    image,
    labelResampled,
  ].map(image => parseByComponent(image))
  const componentInfo = visualizedComponents.map(
    comp =>
      comp >= 0 ? imageByComponent[comp] : labelByComponent[comp * -1 - 1] // label component index starts at -1
  )

  const imageArray = fuseComponents({
    componentInfo,
  })

  const componentRanges =
    pickRanges(componentInfo) ??
    (await computeRanges(imageArray, componentInfo.length))

  return new registerWebworker.TransferableResponse(
    [imageArray, componentRanges],
    [imageArray.buffer]
  )
})
