import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'
import numericalSort from '../numericalSort'
import WebworkerPromise from 'webworker-promise'
import UpdateFusedImage from './UpdateFusedImage.worker'

const createUpdateFusedImageWorker = existingWorker => {
  if (existingWorker) {
    const webworkerPromise = new WebworkerPromise(existingWorker)
    return { webworkerPromise, worker: existingWorker }
  }

  const newWorker = new UpdatedFusedImageWorker()
  const newWebworkerPromise = new WebworkerPromise(newWorker)
  return { webworkerPromise: newWebworkerPromise, worker: newWorker }
}
let updateFusedImageWorker = null

async function updateRenderedImage(context) {
  const name = context.images.updateRenderedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const image = actorContext.image
  const labelImage = actorContext.labelImage
  const editorLabelImage = actorContext.editorLabelImage

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  // Construct the fused image
  if (image && !labelImage && !editorLabelImage) {
    const scaleImage = await image.scaleLargestImage(actorContext.renderedScale)
    actorContext.fusedImage = vtkITKHelper.convertItkToVtkImage(scaleImage)

    actorContext.renderedImage = scaleImage
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else if (image) {
    const scaleImage = await image.scaleLargestImage(actorContext.renderedScale)
    actorContext.renderedImage = scaleImage
    const vtkImage = vtkITKHelper.convertItkToVtkImage(scaleImage)

    const imageScalars = vtkImage.getPointData().getScalars()
    const imageData = imageScalars.getData()
    const imageComponents = imageScalars.getNumberOfComponents()

    if (!actorContext.fusedImage) {
      actorContext.fusedImage = vtkITKHelper.convertItkToVtkImage(scaleImage)
    }
    const fusedImage = actorContext.fusedImage
    fusedImage.setOrigin(vtkImage.getOrigin())
    fusedImage.setSpacing(vtkImage.getSpacing())
    fusedImage.setDirection(vtkImage.getDirection())

    const imageDimensions = vtkImage.getDimensions()
    const scaleLabelImage = await labelImage.scaleLargestImage(
      actorContext.renderedScale
    )
    actorContext.renderedLabelImage = scaleLabelImage
    const uniqueLabelsSet = new Set(actorContext.renderedLabelImage.data)
    const uniqueLabels = Array.from(uniqueLabelsSet)
    // The volume mapper currently only supports ColorTransferFunction's,
    // not LookupTable's
    // lut.setAnnotations(uniqueLabels, uniqueLabels);
    uniqueLabels.sort(numericalSort)
    actorContext.uniqueLabels = uniqueLabels

    if (!!labelImage) {
      const labelImageSize = scaleLabelImage.size
      const imageSize = scaleImage.size
      const dimensionsEqual = imageSize.every((dim, index) => {
        return labelImageSize[index] === dim
      })
      if (!dimensionsEqual) {
        // Todo: throw error, handle error
        console.error(
          `Size not equal! Not fusing. Image: ${imageSize} Label map: ${labelImageSize}`
        )
      }
    }
    fusedImage.setDimensions(vtkImage.getDimensions())

    const imageTuples = vtkImage
      .getPointData()
      .getScalars()
      .getNumberOfTuples()

    const visualizedComponents = actorContext.visualizedComponents.slice()

    const fusedImageComponents = actorContext.visualizedComponents.length
    const length = imageTuples * fusedImageComponents

    const { webworkerPromise, worker } = createUpdateFusedImageWorker(
      updateFusedImageWorker
    )
    updateFusedImageWorker = worker
    // todo
    //console.log('imageData', imageData)
    //const chunk = await webworkerPromise.exec('chunk', args)

    // We only need to construct a new typed array if we don't already
    // have one of the right length.
    if (
      !!!actorContext.fusedImageData ||
      actorContext.fusedImageData.length !== length
    ) {
      actorContext.fusedImageData = new imageData.constructor(length)
    }

    const copyStructure = []

    // Loop through comparing to last time and check which components need
    // to be copied into fusedImageData.  This loop doesn't include the
    // labelimage component, it will be checked next.
    for (let i = 0; i < fusedImageComponents; i++) {
      if (visualizedComponents[i] >= 0) {
        copyStructure.push({
          srcImageData: imageData,
          imageComponents: imageComponents,
          copyFromComponent: actorContext.visualizedComponents[i],
          copyToComponent: i,
        })
      }
    }

    // Check if we need to re-copy the labelmap component
    if (visualizedComponents[fusedImageComponents - 1] === -1) {
      copyStructure.push({
        srcImageData: actorContext.renderedLabelImage.data,
        imageComponents: 1,
        copyFromComponent: 0,
        copyToComponent: fusedImageComponents - 1,
      })
    }

    let fusedIndex = 0
    let imageIndex = 0
    for (let tuple = 0; tuple < imageTuples; tuple++) {
      for (let cIdx = 0; cIdx < copyStructure.length; cIdx++) {
        imageIndex =
          tuple * copyStructure[cIdx].imageComponents +
          copyStructure[cIdx].copyFromComponent
        fusedIndex =
          tuple * fusedImageComponents + copyStructure[cIdx].copyToComponent
        actorContext.fusedImageData[fusedIndex] =
          copyStructure[cIdx].srcImageData[imageIndex]
      }
    }

    const fusedImageScalars = vtkDataArray.newInstance({
      name: imageScalars.getName() || 'Scalars',
      values: actorContext.fusedImageData,
      numberOfComponents: fusedImageComponents,
    })

    fusedImage.getPointData().setScalars(fusedImageScalars)
    // Trigger VolumeMapper scalarTexture update
    fusedImage.modified()

    actorContext.renderedImage = scaleImage
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else {
    const scaleLabelImage = await labelImage.scaleLargestImage(
      actorContext.renderedScale
    )
    actorContext.renderedLabelImage = scaleLabelImage
    actorContext.fusedImage = vtkITKHelper.convertItkToVtkImage(scaleLabelImage)

    const uniqueLabelsSet = new Set(actorContext.renderedLabelImage.data)
    const uniqueLabels = Array.from(uniqueLabelsSet)
    // The volume mapper currently only supports ColorTransferFunction's,
    // not LookupTable's
    // lut.setAnnotations(uniqueLabels, uniqueLabels);
    uniqueLabels.sort(numericalSort)
    actorContext.uniqueLabels = uniqueLabels

    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  }
}

export default updateRenderedImage
