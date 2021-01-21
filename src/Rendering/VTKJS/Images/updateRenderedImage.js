import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'

function numericalSort(eltA, eltB) {
  if (eltA < eltB) {
    return -1
  } else if (eltB < eltA) {
    return 1
  }
  return 0
}

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
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    actorContext.fusedImage = vtkITKHelper.convertItkToVtkImage(topLevelImage)

    actorContext.renderedImage = topLevelImage
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else if (image) {
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    const vtkImage = vtkITKHelper.convertItkToVtkImage(topLevelImage)

    const imageScalars = vtkImage.getPointData().getScalars()
    const imageData = imageScalars.getData()
    const imageComponents = imageScalars.getNumberOfComponents()

    if (!actorContext.fusedImage) {
      actorContext.fusedImage = vtkITKHelper.convertItkToVtkImage(topLevelImage)
    }
    const fusedImage = actorContext.fusedImage
    fusedImage.setOrigin(vtkImage.getOrigin())
    fusedImage.setSpacing(vtkImage.getSpacing())
    fusedImage.setDirection(vtkImage.getDirection())

    const imageDimensions = vtkImage.getDimensions()
    const topLevelLabelImage = await labelImage.levelLargestImage(
      labelImage.topLevel
    )
    actorContext.renderedLabelImage = topLevelLabelImage
    const uniqueLabelsSet = new Set(actorContext.renderedLabelImage.data)
    const uniqueLabels = Array.from(uniqueLabelsSet)
    // The volume mapper currently only supports ColorTransferFunction's,
    // not LookupTable's
    // lut.setAnnotations(uniqueLabels, uniqueLabels);
    uniqueLabels.sort(numericalSort)
    actorContext.uniqueLabels = uniqueLabels

    if (!!labelImage) {
      const labelImageSize = topLevelLabelImage.size
      const imageSize = topLevelImage.size
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
      if (
        visualizedComponents[i] !== actorContext.lastVisualizedComponents[i] &&
        visualizedComponents[i] >= 0
      ) {
        copyStructure.push({
          srcImageData: imageData,
          imageComponents: imageComponents,
          copyFromComponent: actorContext.visualizedComponents[i],
          copyToComponent: i,
        })
      }
    }

    // Check if we need to re-copy the labelmap component
    if (
      visualizedComponents[fusedImageComponents - 1] === -1 &&
      actorContext.lastVisualizedComponents[fusedImageComponents - 1] !== -1
    ) {
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
    actorContext.lastVisualizedComponents = visualizedComponents.slice()

    actorContext.renderedImage = topLevelImage
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else {
    // Todo: just labelImage
  }
}

export default updateRenderedImage
