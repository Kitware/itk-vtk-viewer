import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'
import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

import updateVisualizedComponents from './updateVisualizedComponents'
import applyGradientOpacity from './applyGradientOpacity'
import applyLabelImageBlend from './applyLabelImageBlend'

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
    const numVisualizedComponents = actorContext.visualizedComponents.length
    fusedImage.setDimensions(vtkImage.getDimensions())

    const imageTuples = vtkImage
      .getPointData()
      .getScalars()
      .getNumberOfTuples()

    const visualizedComponents = actorContext.visualizedComponents.slice()

    context.itkVtkView.setLabelIndex(numVisualizedComponents)

    const fusedImageComponents = actorContext.renderedLabelImage.data
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
    applyLabelImageBlend(context, {
      data: { name, labelImageBlend: actorContext.labelImageBlend },
    })
    context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
  } else {
    // Todo: just labelImage
  }
}

export default updateRenderedImage
