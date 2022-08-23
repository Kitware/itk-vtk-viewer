import { Machine, assign, forwardTo } from 'xstate'

const assignSelectedComponentIndex = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const actorContext = context.images.actorContext.get(name)
    actorContext.selectedComponent = event.data.component
    return images
  },
})

const assignComponentVisibility = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const actorContext = context.images.actorContext.get(name)
    const componentVisibilities = actorContext.componentVisibilities
    const index = event.data.component
    const visibility = event.data.visibility

    if (visibility && !componentVisibilities[index]) {
      // A component was made visible, and it was not already in the list
      // of visualized components
      const currentNumVisualized = componentVisibilities.reduce(
        (a, c) => c + a,
        0
      )
      if (currentNumVisualized + 1 > actorContext.maxIntensityComponents) {
        // Find the index in the visulized components list of the last touched
        // component.  We need to replace it with this component the user just
        // turned on.
        componentVisibilities[
          actorContext.lastComponentVisibilityChanged
        ] = false
      }
    }
    if (visibility) actorContext.lastComponentVisibilityChanged = index

    componentVisibilities[index] = visibility

    return images
  },
})

const assignPiecewiseFunction = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const actorContext = context.images.actorContext.get(name)
    const component = event.data.component
    const range = event.data.range
    const nodes = event.data.nodes

    actorContext.piecewiseFunctions.set(component, { range, nodes })

    return images
  },
})

const assignPiecewiseFunctionGaussians = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const actorContext = context.images.actorContext.get(name)
    const component = event.data.component
    const gaussians = event.data.gaussians

    actorContext.piecewiseFunctionGaussians.set(component, gaussians)

    return images
  },
})

const assignPiecewiseFunctionPoints = assign({
  images: ({ images }, { data: { component, points, name } }) => {
    const actorContext = images.actorContext.get(name)
    actorContext.piecewiseFunctionPoints.set(component, points)
    return images
  },
})

const assignColorRange = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const component = event.data.component
    const range = event.data.range

    const actorContext = context.images.actorContext.get(name)
    actorContext.colorRanges.set(component, range)

    return images
  },
})

const assignColorRangeBounds = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const component = event.data.component
    const range = event.data.range

    const actorContext = context.images.actorContext.get(name)
    actorContext.colorRangeBounds.set(component, range)

    return images
  },
})

const assignColorMap = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const component = event.data.component
    const colorMap = event.data.colorMap

    const actorContext = context.images.actorContext.get(name)
    actorContext.colorMaps.set(component, colorMap)

    return images
  },
})

const assignLookupTable = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const lookupTable = event.data.lookupTable

    const actorContext = context.images.actorContext.get(name)
    actorContext.lookupTable = lookupTable

    return images
  },
})

const assignShadowEnabled = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data

    const actorContext = context.images.actorContext.get(name)
    actorContext.shadowEnabled = !actorContext.shadowEnabled
    return images
  },
})

const assignInterpolationEnabled = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data

    const actorContext = context.images.actorContext.get(name)
    actorContext.interpolationEnabled = !actorContext.interpolationEnabled
    return images
  },
})

const assignGradientOpacity = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const gradientOpacity = event.data.gradientOpacity

    const actorContext = context.images.actorContext.get(name)
    actorContext.gradientOpacity = gradientOpacity
    return images
  },
})

const assignGradientOpacityScale = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const gradientOpacityScale = event.data.gradientOpacityScale

    const actorContext = context.images.actorContext.get(name)
    actorContext.gradientOpacityScale = gradientOpacityScale
    return images
  },
})

const assignVolumeSampleDistance = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const volumeSampleDistance = event.data.volumeSampleDistance

    const actorContext = context.images.actorContext.get(name)
    actorContext.volumeSampleDistance = volumeSampleDistance
    return images
  },
})

const assignBlendMode = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const blendMode = event.data.blendMode

    const actorContext = context.images.actorContext.get(name)
    actorContext.blendMode = blendMode
    return images
  },
})

const assignLabelImageBlend = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const labelImageBlend = event.data.labelImageBlend

    const actorContext = context.images.actorContext.get(name)
    actorContext.labelImageBlend = labelImageBlend
    return images
  },
})

const assignLabelImageWeights = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const labelImageWeights = event.data.labelImageWeights

    const actorContext = context.images.actorContext.get(name)
    actorContext.labelImageWeights = labelImageWeights
    return images
  },
})

const assignLabelNames = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const labelNames = event.data.labelNames

    const actorContext = context.images.actorContext.get(name)
    actorContext.labelNames = labelNames
    return images
  },
})

const assignSelectedLabel = assign({
  images: (context, event) => {
    const images = context.images
    const name = event.data.name
    const selectedLabel = event.data.selectedLabel

    const actorContext = context.images.actorContext.get(name)
    actorContext.selectedLabel = selectedLabel
    return images
  },
})

function createImagesUIMachine(options, context) {
  return Machine(
    {
      id: 'images',
      initial: 'idle',
      context,
      states: {
        idle: {
          on: {
            IMAGE_ASSIGNED: {
              target: 'active',
              actions: ['createImagesInterface', 'updateImageInterface'],
            },
            LABEL_IMAGE_ASSIGNED: {
              target: 'active',
              actions: ['createImagesInterface', 'updateLabelImageInterface'],
            },
          },
        },
        active: {
          invoke: {
            src: 'scaleSelector',
          },
          on: {
            IMAGE_ASSIGNED: {
              actions: [
                'updateImageInterface',
                'updateLabelImageInterface',
                forwardTo('scaleSelector'),
              ],
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: [
                'updateRenderedImageInterface',
                forwardTo('scaleSelector'),
              ],
            },
            IMAGE_RENDERING_ACTIVE: {
              actions: forwardTo('scaleSelector'),
            },
            TOGGLE_IMAGE_INTERPOLATION: {
              actions: [assignInterpolationEnabled, 'toggleInterpolation'],
            },
            SELECT_IMAGE_COMPONENT: {
              actions: [assignSelectedComponentIndex, 'selectImageComponent'],
            },
            IMAGE_COMPONENT_VISIBILITY_CHANGED: {
              actions: [assignComponentVisibility, 'applyComponentVisibility'],
            },
            IMAGE_PIECEWISE_FUNCTION_CHANGED: {
              actions: assignPiecewiseFunction,
            },
            IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED: {
              actions: [
                assignPiecewiseFunctionGaussians,
                'applyPiecewiseFunctionGaussians',
              ],
            },
            IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED: {
              actions: assignPiecewiseFunctionPoints,
            },
            IMAGE_PIECEWISE_FUNCTION_POINTS_SET: {
              actions: [
                assignPiecewiseFunctionPoints,
                'applyPiecewiseFunctionPointsToEditor',
              ],
            },
            IMAGE_COLOR_RANGE_CHANGED: {
              actions: [assignColorRange, 'applyColorRange'],
            },
            IMAGE_COLOR_RANGE_BOUNDS_CHANGED: {
              actions: [assignColorRangeBounds, 'applyColorRangeBounds'],
            },
            IMAGE_COLOR_MAP_CHANGED: {
              actions: [assignColorMap, 'applyColorMap'],
            },
            TOGGLE_IMAGE_SHADOW: {
              actions: [assignShadowEnabled, 'toggleShadow'],
            },
            IMAGE_GRADIENT_OPACITY_CHANGED: {
              actions: [assignGradientOpacity, 'applyGradientOpacity'],
            },
            IMAGE_GRADIENT_OPACITY_SCALE_CHANGED: {
              actions: [
                assignGradientOpacityScale,
                'applyGradientOpacityScale',
              ],
            },
            IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED: {
              actions: [
                assignVolumeSampleDistance,
                'applyVolumeSampleDistance',
              ],
            },
            IMAGE_BLEND_MODE_CHANGED: {
              actions: [assignBlendMode, 'applyBlendMode'],
            },
            IMAGE_HISTOGRAM_UPDATED: {
              actions: ['applyHistogram', forwardTo('scaleSelector')],
            },
            LABEL_IMAGE_ASSIGNED: {
              actions: ['updateLabelImageInterface'],
            },
            LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
              actions: [assignLookupTable, 'applyLookupTable'],
            },
            LABEL_IMAGE_BLEND_CHANGED: {
              actions: [assignLabelImageBlend, 'applyLabelImageBlend'],
            },
            LABEL_IMAGE_WEIGHTS_CHANGED: {
              actions: [assignLabelImageWeights, 'applyLabelImageWeights'],
            },
            LABEL_IMAGE_LABEL_NAMES_CHANGED: {
              actions: [assignLabelNames, 'applyLabelNames'],
            },
            LABEL_IMAGE_SELECTED_LABEL_CHANGED: {
              actions: [assignSelectedLabel, 'applySelectedLabel'],
            },
          },
        },
      },
    },
    // need scaleSelector service stub to avoid errors if overridden options does not define
    { services: { scaleSelector: () => () => undefined }, ...options }
  )
}

export default createImagesUIMachine
