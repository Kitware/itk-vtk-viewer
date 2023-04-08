import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges } from '../../../IO/Analyze/computeRanges'
import { createRangeHelper } from '../../../IO/Analyze/createRangeHelper'
import { createCompareImage } from '../../../IO/Compare/createCompareImage'
import {
  compareImageSpaces,
  resampleLabelImage,
} from '../../../IO/ResampleLabelImage/resampleLabelImage'
import {
  composeComponents,
  parseByComponent,
  pickAndFuseComponents,
} from '../../../IO/composeComponents'

const pickRanges = compInfos =>
  compInfos
    .map(({ image: { ranges }, fromComponent }) => ranges?.[fromComponent]) // no ranges in label
    // if missing any range, return undefined
    .reduce((ranges, range) => {
      if (!ranges || !range) return undefined
      return [...ranges, range]
    }, [])
    ?.map(([min, max]) => ({ min, max }))

const ensureRanges = async image => {
  const componentInfo = parseByComponent(image)
  const componentRanges =
    pickRanges(componentInfo) ??
    (await computeRanges(image.data, componentInfo.length))
  image.ranges = componentRanges.map(({ min, max }) => [min, max])
  return image
}

const ensureSameImageSpace = async ({ targetImage, resampleImage }) => {
  if (!resampleImage || !targetImage) return resampleImage

  if (compareImageSpaces(targetImage, resampleImage)) return resampleImage

  return resampleLabelImage(targetImage, resampleImage)
}

const pickIntensityComponents = (image, components) => {
  // 4+ component and ConglomerateImage processing
  // fuseLabelImage assumes label is on the last component
  const withoutLabel = components.filter(componentIndex => componentIndex >= 0)
  return pickAndFuseComponents({
    image,
    components: withoutLabel,
  })
}

const fuseConglomerate = image => {
  if (!Array.isArray(image)) return image
  return composeComponents(image)
}

const makeCompareImage = async ({ image, fixedImage, options }) => {
  if (options.method === 'disabled') return image

  const itkImage = await fuseConglomerate(image)
  const itkFixedImage = await fuseConglomerate(fixedImage)

  const { ranges } = await ensureRanges(itkFixedImage)
  const rangeHelper = createRangeHelper()
  ranges.flat().forEach(v => rangeHelper.add(v))
  const { min, max } = rangeHelper.getRange()

  return createCompareImage(itkImage, itkFixedImage, {
    minMax: [min, max],
    ...options,
  })
}

const fuseLabelImage = async (image, labelImage) => {
  const components = [...Array(image.imageType.components).keys(), -1]
  const imageWithLabel = await pickAndFuseComponents({
    image,
    labelImage,
    components,
  })
  return imageWithLabel
}

registerWebworker(
  async ({
    image: inImage,
    labelImage,
    visualizedComponents,
    fixedImage,
    compare,
  }) => {
    let image = await makeCompareImage({
      image: inImage,
      fixedImage,
      options: compare,
    })
    image = await pickIntensityComponents(image, visualizedComponents)

    // Label processing
    const labelResampled = await ensureSameImageSpace({
      targetImage: image,
      resampleImage: labelImage,
    })
    image = labelResampled ? await fuseLabelImage(image, labelResampled) : image
    image = await ensureRanges(image)

    return new registerWebworker.TransferableResponse({ image }, [
      image.data.buffer,
    ])
  }
)
