import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction'
import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

import applyGradientOpacity from './applyGradientOpacity'
import applyLabelImageBlend from './applyLabelImageBlend'
import applyVolumeSampleDistance from './applyVolumeSampleDistance'
import {
  makeCroppable,
  updateCroppingParametersFromImage,
} from '../Main/croppingPlanes'
import applyLookupTable from './applyLookupTable'

const ANNOTATION_DEFAULT =
  '<table style="margin-left: 0;"><tr><td style="margin-left: auto; margin-right: 0;">Index:</td><td>${iIndex},</td><td>${jIndex},</td><td>${kIndex}</td></tr><tr><td style="margin-left: auto; margin-right: 0;">Position:</td><td>${xPosition},</td><td>${yPosition},</td><td>${zPosition}</td></tr><tr><td style="margin-left: auto; margin-right: 0;"">Value:</td><td style="text-align:center;" colspan="3">${value}</td></tr><tr ${annotationLabelStyle}><td style="margin-left: auto; margin-right: 0;">Label:</td><td style="text-align:center;" colspan="3">${annotation}</td></tr></table>'
const ANNOTATION_CUSTOM_PREFIX =
  '<table style="margin-left: 0;"><tr><td style="margin-left: auto; margin-right: 0;">Scale:</td>'
const ANNOTATION_CUSTOM_POSTFIX =
  '<td></td><td></td></tr><tr><td style="margin-left: auto; margin-right: 0;">Position:</td><td>${xPosition},</td><td>${yPosition},</td><td>${zPosition}</td></tr><tr><td style="margin-left: auto; margin-right: 0;"">Value:</td><td style="text-align:center;" colspan="3">${value}</td></tr><tr ${annotationLabelStyle}><td style="margin-left: auto; margin-right: 0;">Label:</td><td style="text-align:center;" colspan="3">${annotation}</td></tr></table>'

const getDefaultRangeByDataType = dataType => {
  const range = []
  switch (dataType) {
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
    case 'BigInt64Array':
      range[0] = BigInt(-9223372036854775808)
      range[1] = BigInt(9223372036854775808)
      break
    case 'Float32Array':
      range[0] = 0.0
      range[1] = 1.0
      break
    default:
      console.error('Unsupported data type')
  }
  return range
}

function applyRenderedImage(context, { data: { name } }) {
  const actorContext = context.images.actorContext.get(name)

  if (!actorContext.fusedImage) {
    return
  }

  const image = actorContext.image
  const labelImage = actorContext.labelImage
  const editorLabelImage = actorContext.editorLabelImage
  const numberOfComponents = image ? image.imageType.components : 0

  context.images.source.setInputData(actorContext.fusedImage)

  const savedSlicePositions = context.images.representationProxy && [
    context.images.representationProxy.getXSlice(),
    context.images.representationProxy.getYSlice(),
    context.images.representationProxy.getZSlice(),
  ]
  // VTK.js currently only supports a single image
  if (!context.images.representationProxy) {
    context.proxyManager.createRepresentationInAllViews(context.images.source)
    context.images.representationProxy = context.proxyManager.getRepresentation(
      context.images.source,
      context.itkVtkView
    )
    const { representationProxy } = context.images

    makeCroppable(context, representationProxy)

    if (context.use2D) {
      context.itkVtkView.setViewMode('ZPlane')
      context.itkVtkView.setOrientationAxesVisibility(false)
    } else {
      context.itkVtkView.setViewMode('Volume')
    }

    context.itkVtkView.setAxesNames(image?.scaleInfo[0].axesNames) // ? for no image, only imageLabel case

    const annotationContainer = context.renderingViewContainers
      .get('volume')
      .querySelector('.js-se')
    annotationContainer.style.fontFamily = 'monospace'

    const { widgetCroppingPlanes } = context.main
    const sliceActors = representationProxy.getActors()
    sliceActors.forEach((actor, actorIdx) => {
      const sliceMapper = actor.getMapper()
      switch (actorIdx) {
        case 0:
          sliceMapper.addClippingPlane(widgetCroppingPlanes[2])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[3])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[4])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[5])
          break
        case 1:
          sliceMapper.addClippingPlane(widgetCroppingPlanes[0])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[1])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[4])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[5])
          break
        case 2:
          sliceMapper.addClippingPlane(widgetCroppingPlanes[0])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[1])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[2])
          sliceMapper.addClippingPlane(widgetCroppingPlanes[3])
          break
        default:
          console.error('Unexpected slice actor')
      }
    })
  } else {
    context.images.representationProxy.setInput(context.images.source)
  }
  const { representationProxy } = context.images

  // undo representationProxy.setInput calling volume.setVisibility(false) if it finds dimensions === 2 (may have just been cropped)
  representationProxy.setVolumeVisibility(!context.use2D)

  // triggers update of ImageSliceOutlines if fusedImage size changed
  representationProxy.getActors().forEach(actor => actor.getMapper().modified())

  // call after representations are created
  updateCroppingParametersFromImage(context, actorContext.fusedImage)

  context.itkVtkView.getRenderer().resetCameraClippingRange()

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

    const lut = lookupTableProxy.getLookupTable()
    if (actorContext.colorRanges.has(component)) {
      const range = actorContext.colorRanges.get(component)
      lut.setMappingRange(range[0], range[1])
      lut.updateRange()
    }

    context.images.lookupTableProxies.set(component, lookupTableProxy)

    if (actorContext.colorMaps.has(component)) {
      const preset = actorContext.colorMaps.get(component)
      lookupTableProxy.setPresetName(preset)
      lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
      context.service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component, colorMap: preset },
      })
    }
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
  sliceActors.forEach(actor => {
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
        actorProperty.setUseLookupTableScalarRange(true)
      }
    )
  })

  // Visualized components may have updated -> set color transfer function, piecewise function, component visibility, independent components in volumes
  const volumeProps = context.images.representationProxy.getVolumes()
  volumeProps.forEach(volume => {
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

  representationProxy.getMapper().setMaximumSamplesPerRay(2814)

  // update color ranges
  actorContext.visualizedComponents
    .map((componentIndex, fusedImageIndex) => [componentIndex, fusedImageIndex])
    .filter(([componentIndex]) => componentIndex >= 0) // skip label map
    .forEach(([componentIndex, fusedImageIndex]) => {
      const {
        colorRangeBoundsTouched,
        colorRangeBounds,
        colorRanges,
        colorRangesTouched,
      } = actorContext

      const dataArray = actorContext.fusedImage.getPointData().getScalars()
      const [dataMin, dataMax] = dataArray.getRange(fusedImageIndex)

      const [newMin, newMax] =
        !actorContext.independentComponents || dataMin - dataMax === 0
          ? getDefaultRangeByDataType(dataArray.getDataType())
          : [dataMin, dataMax]

      if (!colorRangeBoundsTouched.get(componentIndex)) {
        const oldRange = colorRangeBounds.get(componentIndex) ?? [
          Number.POSITIVE_INFINITY,
          Number.NEGATIVE_INFINITY,
        ]
        // only grow range
        const newRange = [
          Math.min(newMin, oldRange[0]),
          Math.max(newMax, oldRange[1]),
        ]
        const hasChanged = newRange.some((value, i) => value !== oldRange[i])
        if (hasChanged) {
          context.service.send({
            type: 'IMAGE_COLOR_RANGE_BOUNDS_CHANGED',
            data: {
              name,
              component: componentIndex,
              range: newRange,
              fromAutomation: true,
            },
          })
        }
      }

      const storedColorRange = colorRanges.get(componentIndex)
      const oldRange = storedColorRange ?? [
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
      ]
      if (!colorRangesTouched.get(componentIndex) || !storedColorRange) {
        // only grow range
        const newRange = [
          Math.min(newMin, oldRange[0]),
          Math.max(newMax, oldRange[1]),
        ]
        const hasChanged = newRange.some((value, i) => value !== oldRange[i])

        if (hasChanged) {
          context.service.send({
            type: 'IMAGE_COLOR_RANGE_CHANGED',
            data: {
              name,
              component: componentIndex,
              range: newRange,
              fromAutomation: true,
            },
          })
        }
      }
    })

  if (labelImage) {
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
      // apply synchronously to avoid error on render in use2D=true case
      applyLookupTable(context, {
        data: { name, lookupTable: actorContext.lookupTable },
      })
    }

    applyLabelImageBlend(context, {
      data: { name, labelImageBlend: actorContext.labelImageBlend },
    })
  }

  const loadedImage = actorContext.image ?? actorContext.labelImage
  const hasOneScale = loadedImage.scaleInfo.length === 1
  if (hasOneScale) {
    context.itkVtkView.setSeCornerAnnotation(ANNOTATION_DEFAULT)
  } else {
    context.itkVtkView.setSeCornerAnnotation(
      `${ANNOTATION_CUSTOM_PREFIX}<td style="margin-left: 0; margin-right: auto;">${actorContext.loadedScale}</td>${ANNOTATION_CUSTOM_POSTFIX}`
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

  const clampSlice = (old, fallback, { min, max }) =>
    Math.max(min, Math.min(max, old ?? fallback))
  const xSlice = clampSlice(
    savedSlicePositions?.[0],
    volumeRep.getXSlice(),
    xSliceDomain
  )
  context.service.send({ type: 'X_SLICE_CHANGED', data: xSlice })
  const ySlice = clampSlice(
    savedSlicePositions?.[1],
    volumeRep.getYSlice(),
    ySliceDomain
  )
  context.service.send({ type: 'Y_SLICE_CHANGED', data: ySlice })
  const zSlice = clampSlice(
    savedSlicePositions?.[2],
    volumeRep.getZSlice(),
    zSliceDomain
  )
  context.service.send({ type: 'Z_SLICE_CHANGED', data: zSlice })
}

export default applyRenderedImage
