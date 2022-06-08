import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'
import numericalSort from '../numericalSort'
import computeRange from '../computeRange'

// import WebworkerPromise from 'webworker-promise'
// import UpdateFusedImageWorker from './UpdateFusedImage.worker'
// const createUpdateFusedImageWorker = existingWorker => {
//   if (existingWorker) {
//     const webworkerPromise = new WebworkerPromise(existingWorker)
//     return { webworkerPromise, worker: existingWorker }
//   }

//   const newWorker = new UpdatedFusedImageWorker()
//   const newWebworkerPromise = new WebworkerPromise(newWorker)
//   return { webworkerPromise: newWebworkerPromise, worker: newWorker }
// }
// let updateFusedImageWorker = null

// use
//const { webworkerPromise, worker } = createUpdateFusedImageWorker(
//updateFusedImageWorker
//)
//updateFusedImageWorker = worker
// todo
//console.log('imageData', imageData)
//const chunk = await webworkerPromise.exec('chunk', args)

const sum = (a, b) => a + b

const parseByComponent = scaleImage => {
  if (!scaleImage) return []

  // lift ITK image into array if not already (like from InMemoryMultiscaleSpatialImage)
  const scaleImages = Array.isArray(scaleImage) ? scaleImage : [scaleImage]
  // array of all image components
  return scaleImages.flatMap(image => {
    const srcComponentCount = image.imageType.components
    // pull each component from image
    return [...Array(srcComponentCount).keys()].map(fromComponent => ({
      fromComponent,
      srcComponentCount,
      image,
    }))
  })
}

const updateContextWithLabelImage = (actorContext, scaleLabelImage) => {
  const uniqueLabelsSet = new Set(scaleLabelImage.data)
  const uniqueLabels = Array.from(uniqueLabelsSet)
  // The volume mapper currently only supports ColorTransferFunction's,
  // not LookupTable's
  // lut.setAnnotations(uniqueLabels, uniqueLabels);
  uniqueLabels.sort(numericalSort)
  actorContext.uniqueLabels = uniqueLabels
  actorContext.renderedLabelImage = scaleLabelImage
}

const fuseImages = ({
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

  const elementCount = componentInfo
    .map(compInfo => compInfo.image.data.length)
    .reduce(sum)
  // Avoid losing data if TypedArrays are different between images
  const largestType = componentInfo
    .map(compInfo => compInfo.image.data)
    .reduce((lastType, typedArray) =>
      lastType.BYTES_PER_ELEMENT >= typedArray.BYTES_PER_ELEMENT
        ? lastType
        : typedArray
    )

  // We only need to construct a new typed array if we don't already
  // have one of the right length.
  const isExistingArrayMatchingNeed =
    existingArray &&
    existingArray.length === elementCount &&
    typeof oldFusedData === typeof largestType
  const fusedImageData = isExistingArrayMatchingNeed
    ? existingArray
    : new largestType.constructor(elementCount)

  const componentCount = componentInfo.length
  const tupleCount = elementCount / componentCount
  for (let cIdx = 0; cIdx < componentCount; cIdx++) {
    const {
      image: {
        data,
        imageType: { components: srcComponentCount },
      },
      fromComponent,
    } = componentInfo[cIdx]
    for (let tuple = 0; tuple < tupleCount; tuple++) {
      fusedImageData[tuple * componentCount + cIdx] =
        data[tuple * srcComponentCount + fromComponent]
    }
  }

  const base = imageByComponent[0]?.image ?? labelByComponent[0]?.image
  const fusedItkImage = {
    ...base,
    data: fusedImageData,
    imageType: {
      ...base.imageType,
      components: componentCount,
    },
  }
  return fusedItkImage
}

async function updateRenderedImage(context) {
  const name = context.images.updateRenderedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const { image, labelImage, editorLabelImage } = actorContext

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  const { renderedScale } = actorContext

  const [imageAtScale, labelAtScale] = await Promise.all(
    [image, labelImage]
      .filter(Boolean)
      .map(image => image.scaleLargestImage(renderedScale))
  )
  if (labelAtScale) updateContextWithLabelImage(actorContext, labelAtScale)

  const itkImage =
    Array.isArray(imageAtScale) || labelAtScale
      ? fuseImages({
          imageAtScale,
          labelAtScale,
          visualizedComponents: actorContext.visualizedComponents,
          existingArray: actorContext.fusedImageData,
        })
      : imageAtScale

  actorContext.fusedImageData = itkImage.data
  const { fusedImageData } = actorContext

  const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage)

  if (!actorContext.fusedImage) {
    actorContext.fusedImage = vtkImage
  } else {
    // re-use fusedImage
    actorContext.fusedImage.setOrigin(vtkImage.getOrigin())
    actorContext.fusedImage.setSpacing(vtkImage.getSpacing())
    actorContext.fusedImage.setDirection(vtkImage.getDirection())
    actorContext.fusedImage.setDimensions(vtkImage.getDimensions())
  }
  const { fusedImage } = actorContext

  const imageScalars = vtkImage.getPointData().getScalars()

  const numberOfComponents = itkImage.imageType.components
  const fusedImageScalars = vtkDataArray.newInstance({
    name: imageScalars.getName() || 'Scalars',
    values: fusedImageData,
    numberOfComponents,
  })

  fusedImage.getPointData().setScalars(fusedImageScalars)
  // Trigger VolumeMapper scalarTexture update
  fusedImage.modified()

  const fusedImageRanges = await Promise.all(
    [...Array(numberOfComponents).keys()].map(comp =>
      computeRange(fusedImageData, comp, numberOfComponents)
    )
  )
  fusedImageRanges.forEach((range, comp) =>
    fusedImageScalars.setRange(range, comp)
  )
  actorContext.fusedImageRanges = fusedImageRanges

  context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
}

export default updateRenderedImage
