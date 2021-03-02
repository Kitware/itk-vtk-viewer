import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

import applyGradientOpacity from './applyGradientOpacity'
import applyLabelImageBlend from './applyLabelImageBlend'
import applyVolumeSampleDistance from './applyVolumeSampleDistance'

const ANNOTATION_DEFAULT =
  '<table style="margin-left: 0;"><tr><td style="margin-left: auto; margin-right: 0;">Index:</td><td>${iIndex},</td><td>${jIndex},</td><td>${kIndex}</td></tr><tr><td style="margin-left: auto; margin-right: 0;">Position:</td><td>${xPosition},</td><td>${yPosition},</td><td>${zPosition}</td></tr><tr><td style="margin-left: auto; margin-right: 0;"">Value:</td><td style="text-align:center;" colspan="3">${value}</td></tr><tr ${annotationLabelStyle}><td style="margin-left: auto; margin-right: 0;">Label:</td><td style="text-align:center;" colspan="3">${annotation}</td></tr></table>'
const ANNOTATION_CUSTOM_PREFIX =
  '<table style="margin-left: 0;"><tr><td style="margin-left: auto; margin-right: 0;">Scale:</td>'
const ANNOTATION_CUSTOM_POSTFIX =
  '<td></td><td></td></tr><tr><td style="margin-left: auto; margin-right: 0;">Position:</td><td>${xPosition},</td><td>${yPosition},</td><td>${zPosition}</td></tr><tr><td style="margin-left: auto; margin-right: 0;"">Value:</td><td style="text-align:center;" colspan="3">${value}</td></tr><tr ${annotationLabelStyle}><td style="margin-left: auto; margin-right: 0;">Label:</td><td style="text-align:center;" colspan="3">${annotation}</td></tr></table>'

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

    context.images.representationProxy.getMapper().setMaximumSamplesPerRay(2048)
    context.images.representationProxy.setSampleDistance(
      actorContext.volumeSampleDistance
    )

    const annotationContainer = context.container.querySelector('.js-se')
    annotationContainer.style.fontFamily = 'monospace'
  }

  // Create color map and piecewise function objects as needed
  if (typeof context.images.lookupTableProxies === 'undefined') {
    context.images.lookupTableProxies = new Map()
  }
  if (typeof context.images.piecewiseFunctions === 'undefined') {
    context.images.piecewiseFunctions = new Map()
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
    if (context.images.piecewiseFunctions.has(component)) {
      continue
    }

    const piecewiseFunction = {
      slice: vtkPiecewiseFunction.newInstance(),
      volume: vtkPiecewiseFunction.newInstance(),
    }
    context.images.piecewiseFunctions.set(component, piecewiseFunction)
  }

  // Visualized components may have updated -> set color transfer function, piecewise function, component visibility, independent components in slices
  const sliceActors = context.images.representationProxy.getActors()
  sliceActors.forEach((actor, actorIdx) => {
    const actorProperty = actor.getProperty()
    actorProperty.setIndependentComponents(actorContext.independentComponents)
    actor.getMapper().setInputData(actorContext.fusedImage)
    actorContext.visualizedComponents.forEach(
      (componentIndex, fusedImageIndex) => {
        if (!context.images.lookupTableProxies.has(componentIndex)) {
          return
        }
        const colorTransferFunction = context.images.lookupTableProxies
          .get(componentIndex)
          .getLookupTable()
        actorProperty.setRGBTransferFunction(
          fusedImageIndex,
          colorTransferFunction
        )
        const piecewiseFunction = context.images.piecewiseFunctions.get(
          componentIndex
        ).slice
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
    volume.getMapper().setInputData(actorContext.fusedImage)

    volumeProperty.setIndependentComponents(actorContext.independentComponents)

    let componentsVisible = false
    actorContext.visualizedComponents.forEach(
      (componentIndex, fusedImageIndex) => {
        if (!context.images.lookupTableProxies.has(componentIndex)) {
          return
        }
        const colorTransferFunction = context.images.lookupTableProxies
          .get(componentIndex)
          .getLookupTable()
        const piecewiseFunction = context.images.piecewiseFunctions.get(
          componentIndex
        ).volume
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
  applyGradientOpacity(context, {
    data: { name, gradientOpacity: actorContext.gradientOpacity },
  })
  applyVolumeSampleDistance(context, {
    data: { name, volumeSampleDistance: actorContext.volumeSampleDistance },
  })

  // Set default color ranges
  actorContext.visualizedComponents.forEach(
    (componentIndex, fusedImageIndex) => {
      if (
        !actorContext.colorRanges.has(componentIndex) ||
        !actorContext.colorRangeBounds.has(componentIndex)
      ) {
        if (componentIndex < 0) {
          return
        }
        const dataArray = actorContext.fusedImage.getPointData().getScalars()
        const range = dataArray.getRange(fusedImageIndex).slice()
        if (!actorContext.independentComponents || range[1] === range[0]) {
          switch (dataArray.getDataType()) {
            case 'Uint8Array':
              range[0] = 0
              range[1] = 255
              break
            case 'Int8Array':
              range[0] = -128
              range[1] = 127
              break
            case 'Uint16Array':
              range[0] = 0
              range[1] = 65535
              break
            case 'Int16Array':
              range[0] = -32768
              range[1] = 32767
              break
            case 'Uint32Array':
              range[0] = 0
              range[1] = 4294967295
              break
            case 'Int32Array':
              range[0] = -2147483648
              range[1] = 2147483647
              break
            case 'BigUint64Array':
              range[0] = 0
              range[1] = BigInt(18446744073709551615)
              break
            case 'BigInt64Array':
              range[0] = BigInt(-9223372036854775808)
              range[1] = BigInt(9223372036854775808)
              break
            case 'Float32Array':
              range[0] = 0.0
              range[1] = 1.0
              break
            case 'Float64Array':
              range[0] = 0.0
              range[1] = 1.0
              break
            default:
              console.error('Unsupported data type')
          }
        }
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

  if (!!labelImage) {
    const uniqueLabels = actorContext.uniqueLabels

    const labelNames = actorContext.labelNames
    let labelNameAdded = false
    const labelImageWeights = actorContext.labelImageWeights
    let labelImageWeightAdded = false
    for (let index = 0; index < uniqueLabels.length; index++) {
      const label = uniqueLabels[index]
      if (!labelNames.has(label)) {
        labelNames.set(label, label.toString())
        labelNameAdded = true
      }
      if (!labelImageWeights.has(label)) {
        // 0 is usually the background label -- suppress it
        label === 0
          ? labelImageWeights.set(label, 0.1)
          : labelImageWeights.set(label, 1.0)
        labelImageWeightAdded = true
      }
    }
    if (labelNameAdded) {
      context.service.send({
        type: 'LABEL_IMAGE_LABEL_NAMES_CHANGED',
        data: { name, labelNames },
      })
    }
    if (labelImageWeightAdded) {
      context.service.send({
        type: 'LABEL_IMAGE_WEIGHTS_CHANGED',
        data: { name, labelImageWeights },
      })
      context.service.send({
        type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
        data: { name, lookupTable: actorContext.lookupTable },
      })
    }

    applyLabelImageBlend(context, {
      data: { name, labelImageBlend: actorContext.labelImageBlend },
    })
  }

  if (actorContext.renderedScale === 0) {
    context.itkVtkView.setSeCornerAnnotation(ANNOTATION_DEFAULT)
  } else {
    context.itkVtkView.setSeCornerAnnotation(
      `${ANNOTATION_CUSTOM_PREFIX}<td style="margin-left: 0; margin-right: auto;">${actorContext.renderedScale}</td>${ANNOTATION_CUSTOM_POSTFIX}`
    )
  }

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
