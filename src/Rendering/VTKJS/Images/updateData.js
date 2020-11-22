import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'

async function updateData(context) {
  const name = context.images.updateName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const image = actorContext.image
  const labelImage = actorContext.labelImage
  const editorLabelImage = actorContext.editorLabelImage

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  if (image && !labelImage && !editorLabelImage) {
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    const vtkImage = vtkITKHelper.convertItkToVtkImage(topLevelImage)

    context.images.source.setInputData(vtkImage)
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

    context.images.source.setInputData(fusedImage)
  } else {
    // Todo: just labelImage
  }

  // VTK.js currently only supports a single image
  if (!!!context.images.representationProxy) {
    context.proxyManager.createRepresentationInAllViews(context.images.source)
    context.images.representationProxy = context.proxyManager.getRepresentation(
      context.images.source,
      context.itkVtkView
    )

    if (context.use2D) {
      context.itkVtkView.setViewMode('ZPlane')
      context.itkVtkView.setOrientationAxesVisibility(false)
    } else {
      context.itkVtkView.setViewMode('VolumeRendering')
    }

    const annotationContainer = context.container.querySelector('.js-se')
    annotationContainer.style.fontFamily = 'monospace'
  }

  const volumeProps = context.images.representationProxy.getVolumes()
  volumeProps.forEach((volume, volumeIndex) => {
    const volumeProperty = volume.getProperty()
    let componentsVisible = false
    actorContext.visualizedComponents.forEach(
      (componentIndex, fusedImageIndex) => {
        //const lut = store.imageUI.lookupTableProxies[
        //componentIndex
        //].getLookupTable()
        //volumeProperty.setRGBTransferFunction(fusedImageIndex, lut)
        //const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
        //componentIndex
        //].volume.getPiecewiseFunction()
        //volumeProperty.setScalarOpacity(fusedImageIndex, piecewiseFunction)
        const componentVisibility =
          actorContext.componentVisibilities[componentIndex]
        componentsVisible = componentVisibility ? true : componentsVisible
        volumeProperty.setComponentWeight(
          fusedImageIndex,
          componentVisibility ? 1.0 : 0.0
        )
      }
    )

    if (!!labelImage || !!editorLabelImage) {
      let mode = OpacityMode.PROPORTIONAL
      if (!componentsVisible) {
        mode = OpacityMode.FRACTIONAL
      }
      const numberOfComponents = actorContext.componentVisibilities.length
      volumeProperty.setOpacityMode(numberOfComponents, mode)
    }
  })
  //updateGradientOpacity(store)
}

export default updateData
