import registerWebworker from 'webworker-promise/lib/register'
import { computeRanges } from '../../../IO/Analyze/computeRanges'
import { createRangeHelper } from '../../../IO/Analyze/createRangeHelper'
import { createCheckerboard } from '../../../IO/Checkerboard/createCheckerboard'
import {
  compareImageSpaces,
  resampleLabelImage,
} from '../../../IO/ResampleLabelImage/resampleLabelImage'
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

const pickAndFuseComponents = async ({ image, labelImage, components }) => {
  // not Conglomerate, no label image, and all components needed: just return image
  if (
    !Array.isArray(image) &&
    !labelImage &&
    image.imageType.components === components.length
  )
    return image

  const [imageByComponent, labelByComponent] = [image, labelImage].map(image =>
    parseByComponent(image)
  )
  const componentInfo = components.map(
    comp =>
      comp >= 0 ? imageByComponent[comp] : labelByComponent[comp * -1 - 1] // label component index starts at -1
  )

  const imageArray = fuseComponents({
    componentInfo,
  })

  const ranges = componentInfo.map(
    ({ image: { ranges }, fromComponent }) => ranges && ranges[fromComponent]
  )

  // picks out one from ConglomerateImage
  const singleImage = Array.isArray(image) ? image[0] : image

  const itkImage = {
    ...singleImage,
    data: imageArray,
    imageType: {
      ...singleImage.imageType,
      components: components.length,
    },
    ranges,
  }
  return itkImage
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
  const componentCount = image
    .map(i => i.imageType.components)
    .reduce((sum, comps) => sum + comps)
  // include all components
  const components = [...Array(componentCount).keys()]
  // compose Conglomerate images
  return pickAndFuseComponents({
    image,
    components,
  })
}

const makeCheckerboard = async ({ image, fixedImage, options }) => {
  const itkImage = await fuseConglomerate(image)
  const itkFixedImage = await fuseConglomerate(fixedImage)
  const { ranges } = await ensureRanges(itkFixedImage)
  const rangeHelper = createRangeHelper()
  ranges.flat().forEach(v => rangeHelper.add(v))
  const { min, max } = rangeHelper.getRange()
  return createCheckerboard(itkImage, itkFixedImage, {
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
    const checkerboardActive = compare.method === 'checkerboard'
    let image =
      checkerboardActive && fixedImage
        ? await makeCheckerboard({
            image: inImage,
            fixedImage,
            options: compare,
          })
        : await pickIntensityComponents(inImage, visualizedComponents)

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
