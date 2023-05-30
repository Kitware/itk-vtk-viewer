import registerWebworker from 'webworker-promise/lib/register'
import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox'
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

import itkConfig from '../itkConfig.js'

const checkOverlap = (imageA, imageB) => {
  const [vtkA, vtkB] = [imageA, imageB].map(vtkITKHelper.convertItkToVtkImage)
  if (!vtkBoundingBox.intersects(vtkA.getBounds(), vtkB.getBounds())) {
    console.warn(
      'Trying to compare images but bounds do not intersect. Moving image will be empty.'
    )
  }
}

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
  if (!options.method || options.method === 'disabled') return image

  if (!fixedImage) {
    console.error('No fixed image')
    return
  }
  const itkImage = await fuseConglomerate(image)
  const itkFixedImage = await fuseConglomerate(fixedImage)

  // check if there is overlap in physical space.  If none, resample of image to fixedImage will be empty.
  checkOverlap(itkImage, itkFixedImage)

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

const configureItkWasm = ({ pipelinesUrl, pipelineWorkerUrl }) => {
  itkConfig.pipelinesUrl = pipelinesUrl
  itkConfig.pipelineWorkerUrl = pipelineWorkerUrl
}

registerWebworker(
  async ({
    image: inImage,
    labelImage,
    visualizedComponents,
    fixedImage,
    compare,
    itkWasmConfig,
  }) => {
    configureItkWasm(itkWasmConfig)
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
