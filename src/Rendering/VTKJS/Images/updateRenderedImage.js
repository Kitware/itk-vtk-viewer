import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'
import applyGradientOpacity from './applyGradientOpacity'

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
    applyGradientOpacity(context, {
      data: { name, gradientOpacity: actorContext.gradientOpacity },
    })
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else if (image) {
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    const vtkImage = vtkITKHelper.convertItkToVtkImage(topLevelImage)

    const imageScalars = vtkImage.getPointData().getScalars()
    const imageData = imageScalars.getData()
    const imageComponents = imageScalars.getNumberOfComponents()

    const fusedImage = actorContext.fusedImage
    fusedImage.setOrigin(vtkImage.getOrigin())
    fusedImage.setSpacing(vtkImage.getSpacing())
    fusedImage.setDirection(vtkImage.getDirection())

    const imageDimensions = vtkImage.getDimensions()
    if (!!labelImage) {
      const labelImageDimensions = labelImage.getDimensions()
      const dimensionsEqual = imageDimensions.every((dim, index) => {
        return labelImageDimensions[index] === dim
      })
      if (!dimensionsEqual) {
        // Todo: throw error, handle error
        console.error(
          `Dimensions not equal! Not fusing. Image: ${imageDimensions} Label map: ${labelImageDimensions}`
        )
        return image
      }
    }
    const numVisualizedComponents = actorContext.visualizedComponents.length
    fusedImage.setDimensions(vtkImage.getDimensions())

    const imageTuples = imageScalars.getNumberOfTuples()

    let labelImageScalars = null
    let labelImageData = null

    const visualizedComponents = actorContext.visualizedComponents.slice()
    if (!!labelImage) {
      labelImageScalars = labelImage.getPointData().getScalars()
      labelImageData = labelImageScalars.getData()
      visualizedComponents.push(-1)
    }

    const fusedImageComponents = labelImageData
      ? numVisualizedComponents + 1
      : numVisualizedComponents
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
    for (let i = 0; i < numVisualizedComponents; i++) {
      if (
        visualizedComponents[i] !== actorContext.lastVisualizedComponents[i]
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
      visualizedComponents[numVisualizedComponents] === -1 &&
      actorContext.lastVisualizedComponents[numVisualizedComponents] !== -1
    ) {
      copyStructure.push({
        srcImageData: labelImageData,
        imageComponents: 1,
        copyFromComponent: 0,
        copyToComponent: numVisualizedComponents,
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
    actorContext.lastVisualizedComponents = visualizedComponents.slice()

    actorContext.renderedImage = topLevelImage
    applyGradientOpacity(context, {
      data: { name, gradientOpacity: actorContext.gradientOpacity },
    })
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else {
    // Todo: just labelImage
  }

  if (!!actorContext.labelImageLabelNames) {
    context.itkVtkView.setLabelNames(actorContext.labelImageLabelNames)
  }
}

export default updateRenderedImage
