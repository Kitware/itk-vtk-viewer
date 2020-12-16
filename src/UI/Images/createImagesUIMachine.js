import { Machine, assign } from 'xstate'

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
        (a, c) => (c + a) | 0,
        0
      )
      if (currentNumVisualized.length >= actorContext.maxIntensityComponents) {
        // Find the index in the visulized components list of the last touched
        // component.  We need to replace it with this component the user just
        // turned on.
        componentVisibilities[
          actorContext.lastComponentVisibilityChanged
        ] = false
      }
    }

    componentVisibilities[index] = visibility
    actorContext.lastComponentVisibilityChanged = index

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
          },
        },
        active: {
          on: {
            IMAGE_ASSIGNED: {
              actions: 'updateImageInterface',
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: 'updateRenderedImageInterface',
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
          },
        },
      },
    },
    options
  )
}

export default createImagesUIMachine
