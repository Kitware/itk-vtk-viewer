import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'
import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy'

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

  const numberOfComponents = image ? image.imageType.components : 0

  if (image && !labelImage && !editorLabelImage) {
    const topLevelImage = await image.levelLargestImage(image.topLevel)
    actorContext.fusedImage = vtkITKHelper.convertItkToVtkImage(topLevelImage)
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
  } else {
    // Todo: just labelImage
  }
  context.images.source.setInputData(actorContext.fusedImage)

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

  // Create color map and piecewise function objects as needed
  for (let component = 0; component < numberOfComponents; component++) {
    if (context.images.lookupTableProxies.has(component)) {
      continue
    }
    const lookupTableProxy = vtkLookupTableProxy.newInstance()

    if (actorContext.colorMaps.has(component)) {
      const preset = actorContext.colorMaps.get(component)
      lookupTableProxy.setPresetName(preset)
      lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
    }
    const lut = lookupTableProxy.getLookupTable()
    if (actorContext.colorRanges.has(component)) {
      const range = actorContext.colorRanges.get(component)
      lut.setMappingRange(range[0], range[1])
      lut.updateRange()
    }

    context.images.lookupTableProxies.set(component, lookupTableProxy)
  }
  for (let component = 0; component < numberOfComponents; component++) {
    if (context.images.piecewiseFunctionProxies.has(component)) {
      continue
    }

    const piecewiseFunctionProxy = {
      slice: vtkPiecewiseFunctionProxy.newInstance(),
      volume: vtkPiecewiseFunctionProxy.newInstance(),
    }
    context.images.piecewiseFunctionProxies.set(
      component,
      piecewiseFunctionProxy
    )
  }

  const sliceActors = context.images.representationProxy.getActors()
  sliceActors.forEach((actor, actorIdx) => {
    const actorProp = actor.getProperty()
    actorProp.setIndependentComponents(actorContext.independentComponents)
    actorContext.visualizedComponents.forEach(
      (componentIndex, fusedImageIndex) => {
        const colorTransferFunction = context.images.lookupTableProxies
          .get(componentIndex)
          .getLookupTable()
        actorProp.setRGBTransferFunction(fusedImageIndex, colorTransferFunction)
        const piecewiseFunction = context.images.piecewiseFunctionProxies
          .get(componentIndex)
          .slice.getPiecewiseFunction()
        actorProp.setPiecewiseFunction(fusedImageIndex, piecewiseFunction)
      }
    )
  })

  // Set component visibilities, independent components
  const volumeProps = context.images.representationProxy.getVolumes()
  volumeProps.forEach((volume, volumeIndex) => {
    const volumeProperty = volume.getProperty()

    volumeProperty.setIndependentComponents(actorContext.independentComponents)

    let componentsVisible = false
    actorContext.visualizedComponents.forEach(
      (componentIndex, fusedImageIndex) => {
        const colorTransferFunction = context.images.lookupTableProxies
          .get(componentIndex)
          .getLookupTable()
        volumeProperty.setRGBTransferFunction(
          fusedImageIndex,
          colorTransferFunction
        )

        const piecewiseFunction = context.images.piecewiseFunctionProxies
          .get(componentIndex)
          .volume.getPiecewiseFunction()
        volumeProperty.setScalarOpacity(fusedImageIndex, piecewiseFunction)
        volumeProperty.setRGBTransferFunction(
          fusedImageIndex,
          colorTransferFunction
        )

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

  // Set default color ranges
  actorContext.visualizedComponents.forEach(
    (componentIndex, fusedImageIndex) => {
      if (
        !actorContext.colorRanges.has(componentIndex) ||
        !actorContext.colorRangeBounds.has(componentIndex)
      ) {
        const dataArray = actorContext.fusedImage.getPointData().getScalars()
        const range = dataArray.getRange(fusedImageIndex)
        if (!actorContext.colorRangeBounds.has(componentIndex)) {
          context.service.send({
            type: 'IMAGE_COLOR_RANGE_BOUNDS_CHANGED',
            data: { name, component: componentIndex, range },
          })
        }
        if (!actorContext.colorRanges.has(componentIndex)) {
          context.service.send({
            type: 'IMAGE_COLOR_RANGE_CHANGED',
            data: { name, component: componentIndex, range },
          })
        }
      }
    }
  )
}

export default updateData
