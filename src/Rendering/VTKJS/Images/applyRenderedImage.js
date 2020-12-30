import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

import applyGradientOpacity from './applyGradientOpacity'

function applyRenderedImage(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)

  if (!actorContext.fusedImage) {
    return
  }

  const image = actorContext.image
  const labelImage = actorContext.labelImage
  const editorLabelImage = actorContext.editorLabelImage
  const numberOfComponents = image ? image.imageType.components : 0

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
      context.itkVtkView.setViewMode('Volume')
    }

    const annotationContainer = context.container.querySelector('.js-se')
    annotationContainer.style.fontFamily = 'monospace'
  }

  // Create color map and piecewise function objects as needed
  if (typeof context.images.lookupTableProxies === 'undefined') {
    context.images.lookupTableProxies = new Map()
  }
  if (typeof context.images.piecewiseFunctionProxies === 'undefined') {
    context.images.piecewiseFunctionProxies = new Map()
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
  if (!context.images.lookupTableProxies.has('labelImage')) {
    const lutProxy = vtkLookupTableProxy.newInstance()
    context.images.lookupTableProxies.set('labelImage', lutProxy)
  }

  // Visualized components may have updated -> set color transfer function, piecewise function, component visibility, independent components in slices
  const sliceActors = context.images.representationProxy.getActors()
  sliceActors.forEach((actor, actorIdx) => {
    const actorProperty = actor.getProperty()
    actorProperty.setIndependentComponents(actorContext.independentComponents)
    actorContext.visualizedComponents.forEach(
      (componentIndex, fusedImageIndex) => {
        const colorTransferFunction = context.images.lookupTableProxies
          .get(componentIndex)
          .getLookupTable()
        actorProperty.setRGBTransferFunction(
          fusedImageIndex,
          colorTransferFunction
        )
        const piecewiseFunction = context.images.piecewiseFunctionProxies
          .get(componentIndex)
          .slice.getPiecewiseFunction()
        actorProperty.setPiecewiseFunction(fusedImageIndex, piecewiseFunction)

        const componentVisibility =
          actorContext.componentVisibilities[componentIndex]
        actorProperty.setComponentWeight(
          fusedImageIndex,
          componentVisibility ? 1.0 : 0.0
        )
      }
    )
  })

  // Visualized components may have updated -> set color transfer function, piecewise function, component visibility, independent components in volumes
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

  // Todo: results in necessary side-effect?
  applyGradientOpacity(context, { data: { name } })

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

  // Update the slice parameters
  const volumeRep = context.images.representationProxy
  const xSliceDomain = volumeRep.getPropertyDomainByName('xSlice')
  const ySliceDomain = volumeRep.getPropertyDomainByName('ySlice')
  const zSliceDomain = volumeRep.getPropertyDomainByName('zSlice')
  const slicingPlanes = context.main.slicingPlanes
  Object.assign(slicingPlanes.x, xSliceDomain)
  Object.assign(slicingPlanes.y, ySliceDomain)
  Object.assign(slicingPlanes.z, zSliceDomain)
  context.service.send({ type: 'SLICING_PLANES_CHANGED', data: slicingPlanes })
  if (context.main.xSlice === null) {
    const xSlice = volumeRep.getXSlice()
    context.service.send({ type: 'X_SLICE_CHANGED', data: xSlice })
  }
  if (context.main.ySlice === null) {
    const ySlice = volumeRep.getYSlice()
    context.service.send({ type: 'Y_SLICE_CHANGED', data: ySlice })
  }
  if (context.main.zSlice === null) {
    const zSlice = volumeRep.getZSlice()
    context.service.send({ type: 'Z_SLICE_CHANGED', data: zSlice })
  }
}

export default applyRenderedImage
