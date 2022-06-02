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

async function updateRenderedImage(context) {
  const name = context.images.updateRenderedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const { image, labelImage, editorLabelImage } = actorContext

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  const toFuse = { image: undefined, labelImage: undefined }
  if (image) {
    const scaleImage = await image.scaleLargestImage(actorContext.renderedScale)
    const vtkImage = vtkITKHelper.convertItkToVtkImage(scaleImage)
    toFuse.image = { vtkImage, scaleImage }
  }

  if (labelImage) {
    const scaleLabelImage = await labelImage.scaleLargestImage(
      Math.min(actorContext.renderedScale, labelImage.scaleInfo.length - 1)
    )

    const { size: labelImageSize } = scaleLabelImage
    const imageSize = toFuse.image?.scaleImage.size ?? []
    const dimensionsEqual = imageSize.every(
      (dim, index) => labelImageSize[index] === dim
    )
    if (!dimensionsEqual) {
      // Todo: throw error, handle error
      console.error(
        `Size not equal! Image: ${imageSize} Label map: ${labelImageSize}`
      )
    }

    const vtkImage = vtkITKHelper.convertItkToVtkImage(scaleLabelImage)
    toFuse.labelImage = { vtkImage, scaleImage: scaleLabelImage }

    const uniqueLabelsSet = new Set(scaleLabelImage.data)
    const uniqueLabels = Array.from(uniqueLabelsSet)
    // The volume mapper currently only supports ColorTransferFunction's,
    // not LookupTable's
    // lut.setAnnotations(uniqueLabels, uniqueLabels);
    uniqueLabels.sort(numericalSort)
    actorContext.uniqueLabels = uniqueLabels
    actorContext.renderedLabelImage = scaleLabelImage
  }

  const { visualizedComponents } = actorContext
  const visualizedComponentCount = visualizedComponents.length

  const { vtkImage } = toFuse.image ?? toFuse.labelImage

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

  const imageTuples = vtkImage
    .getPointData()
    .getScalars()
    .getNumberOfTuples()
  const length = imageTuples * visualizedComponentCount
  const imageData = imageScalars.getData()
  // We only need to construct a new typed array if we don't already
  // have one of the right length.
  if (
    !actorContext.fusedImageData ||
    actorContext.fusedImageData.length !== length
  ) {
    actorContext.fusedImageData = new imageData.constructor(length)
  }

  const copyStructure = visualizedComponents
    .map(component => ({
      component,
      image: component >= 0 ? toFuse.image : toFuse.labelImage,
    }))
    .map(({ component, image }, idx) => ({
      srcImageData: image.scaleImage.data,
      imageComponents: image.scaleImage.imageType.components,
      copyFromComponent: component,
      copyToComponent: idx,
    }))

  let fusedIndex = 0
  let imageIndex = 0
  for (let tuple = 0; tuple < imageTuples; tuple++) {
    for (let cIdx = 0; cIdx < copyStructure.length; cIdx++) {
      imageIndex =
        tuple * copyStructure[cIdx].imageComponents +
        copyStructure[cIdx].copyFromComponent
      fusedIndex =
        tuple * visualizedComponentCount + copyStructure[cIdx].copyToComponent
      actorContext.fusedImageData[fusedIndex] =
        copyStructure[cIdx].srcImageData[imageIndex]
    }
  }

  const fusedImageScalars = vtkDataArray.newInstance({
    name: imageScalars.getName() || 'Scalars',
    values: actorContext.fusedImageData,
    numberOfComponents: visualizedComponentCount,
  })

  fusedImage.getPointData().setScalars(fusedImageScalars)
  // Trigger VolumeMapper scalarTexture update
  fusedImage.modified()

  const dataArray = actorContext.fusedImage.getPointData().getScalars()
  const numberOfComponents = dataArray.getNumberOfComponents()
  actorContext.fusedImageRanges = []
  for (let comp = 0; comp < numberOfComponents; comp++) {
    const range = await computeRange(
      dataArray.getData(),
      comp,
      numberOfComponents
    )
    dataArray.setRange(range, comp)
    actorContext.fusedImageRanges.push(range)
  }

  context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
}

export default updateRenderedImage
