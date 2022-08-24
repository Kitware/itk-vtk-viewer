import { Machine, assign } from 'xstate'

const assignUpdateRenderedName = assign({
  images: (context, event) => {
    const images = context.images
    images.updateRenderedName = event.data.name
    return images
  },
})

const assignUpdateRenderedNameToSelectedName = assign({
  images: context => {
    const images = context.images
    images.updateRenderedName = images.selectedName
    return images
  },
})

const assignHigherScale = assign({
  images: context => {
    const images = context.images
    const actorContext = images.actorContext.get(images.updateRenderedName)
    actorContext.targetScale = actorContext.loadedScale - 1
    return images
  },
})

const assignLowerScale = assign({
  images: context => {
    const images = context.images
    const actorContext = images.actorContext.get(images.updateRenderedName)
    const image = actorContext.image ?? actorContext.labelImage
    const lowestScale = image.lowestScale
    if (actorContext.targetScale < lowestScale) {
      actorContext.targetScale = actorContext.loadedScale + 1
    }
    return images
  },
})

const assignTargetScale = assign({
  images: ({ images }, { targetScale }) => {
    const actorContext = images.actorContext.get(images.updateRenderedName)
    actorContext.targetScale = targetScale
    return images
  },
})

const assignLoadedScale = assign({
  images: ({ images }, { data: name, loadedScale }) => {
    const actorContext = images.actorContext.get(name)
    actorContext.loadedScale = loadedScale
    return images
  },
})

// Return true if highest scale or right scale (to stop loading of higher scale)
function highestScaleOrScaleJustRight(context /* event , condMeta*/) {
  const { loadedScale } = context.images.actorContext.get(
    context.images.updateRenderedName
  )
  if (loadedScale === 0) {
    return true
  }

  if (context.main.fps > 10.0 && context.main.fps < 33.0) {
    return true
  }
  return false
}

function scaleTooHigh(context) {
  return context.main.fps <= 10.0
}

const assignIsFramerateScalePickingOn = assign({
  images: ({ images }, { type }) => {
    const actorContext = images.actorContext.get(images.updateRenderedName)
    actorContext.isFramerateScalePickingOn = type !== 'SET_IMAGE_SCALE'
    return images
  },
})

const eventResponses = {
  IMAGE_ASSIGNED: {
    target: 'updatingRenderedImage',
    actions: assignUpdateRenderedNameToSelectedName,
  },
  LABEL_IMAGE_ASSIGNED: {
    target: 'updatingRenderedImage',
    actions: assignUpdateRenderedNameToSelectedName,
  },
  UPDATE_RENDERED_IMAGE: {
    target: 'updatingRenderedImage',
    actions: assignUpdateRenderedName,
  },
  RENDERED_IMAGE_ASSIGNED: {
    actions: [assignLoadedScale, 'applyRenderedImage'],
  },
  TOGGLE_LAYER_VISIBILITY: {
    actions: 'toggleLayerVisibility',
  },
  SET_GRADIENT_OPACITY: {
    actions: 'applyGradientOpacity',
  },
  TOGGLE_IMAGE_INTERPOLATION: {
    actions: 'toggleInterpolation',
  },
  IMAGE_COMPONENT_VISIBILITY_CHANGED: {
    actions: 'applyComponentVisibility',
  },
  IMAGE_PIECEWISE_FUNCTION_CHANGED: {
    actions: 'applyPiecewiseFunction',
  },
  IMAGE_COLOR_RANGE_CHANGED: {
    actions: 'applyColorRange',
  },
  IMAGE_COLOR_MAP_CHANGED: {
    actions: 'applyColorMap',
  },
  TOGGLE_IMAGE_SHADOW: {
    actions: 'applyShadow',
  },
  IMAGE_GRADIENT_OPACITY_CHANGED: {
    actions: 'applyGradientOpacity',
  },
  IMAGE_GRADIENT_OPACITY_SCALE_CHANGED: {
    actions: 'applyGradientOpacity',
  },
  IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED: {
    actions: 'applyVolumeSampleDistance',
  },
  IMAGE_BLEND_MODE_CHANGED: {
    actions: 'applyBlendMode',
  },
  UPDATE_IMAGE_HISTOGRAM: {
    target: 'updateHistogram',
  },
  LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
    actions: 'applyLookupTable',
  },
  LABEL_IMAGE_BLEND_CHANGED: {
    actions: 'applyLabelImageBlend',
  },
  LABEL_IMAGE_WEIGHTS_CHANGED: {
    actions: 'applyLabelImageWeights',
  },
  LABEL_IMAGE_LABEL_NAMES_CHANGED: {
    actions: 'applyLabelNames',
  },
  LABEL_IMAGE_SELECTED_LABEL_CHANGED: {
    actions: 'applySelectedLabel',
  },
  SET_IMAGE_SCALE: {
    target: 'updatingRenderedImage',
    actions: [assignTargetScale, assignIsFramerateScalePickingOn],
  },
  ADJUST_SCALE_FOR_FRAMERATE: {
    target: 'adjustScaleForFramerate',
    actions: assignIsFramerateScalePickingOn,
  },
  // Use this event to possibly update image bounds to avoid circular loop with CROPPING_PLANES_CHANGED.
  // CROPPING_PLANES_CHANGED may be updated automatically by
  // adjustScaleForFramerate->updateRenderedImage->RENDERED_IMAGE_ASSIGNED->updateCroppingParametersFromImage->CROPPING_PLANES_CHANGED
  // because image size may change across scales.
  CROPPING_PLANES_CHANGED_BY_USER: {
    target: 'imageBoundsDebouncing',
  },
}

const createImageRenderingActor = (options, context /*, event*/) => {
  return Machine(
    {
      id: 'imageRendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          invoke: {
            id: 'createImageRenderer',
            src: 'createImageRenderer',
            onDone: {
              target: 'updatingRenderedImage',
              actions: assignUpdateRenderedNameToSelectedName,
            },
          },
        },
        imageBoundsDebouncing: {
          on: {
            ...eventResponses,
          },
          after: {
            500: [
              {
                target: 'updatingRenderedImage',
                cond: 'areBoundsBiggerThanLoaded',
              },
              {
                target: 'adjustScaleForFramerate',
                cond: 'isFramerateScalePickingOn',
              },
              { target: 'active' },
            ],
          },
        },
        updatingRenderedImage: {
          invoke: {
            id: 'updateRenderedImage',
            src: 'updateRenderedImage',
            onDone: [
              {
                target: 'adjustScaleForFramerate',
                cond: 'isFramerateScalePickingOn',
              },
              { target: 'updateHistogram' },
            ],
            onError: {
              target: 'updateHistogram',
              actions: (context, event) => {
                console.error('Could not update image: ' + event.data)
              },
            },
          },
          on: {
            ...eventResponses,
          },
        },
        adjustScaleForFramerate: {
          entry: [c => c.service.send('UPDATE_FPS')],
          on: {
            ...eventResponses,
            FPS_UPDATED: [
              {
                cond: highestScaleOrScaleJustRight, // found good scale, finish
                target: 'updateHistogram',
              },
              {
                cond: scaleTooHigh, // too slow, back off
                actions: assignLowerScale,
                target: 'updatingRenderedImage',
              },
              {
                actions: assignHigherScale, // try harder
                target: 'updatingRenderedImage',
                internal: false,
              },
            ],
          },
        },
        updateHistogram: {
          invoke: {
            id: 'updateHistogram',
            src: 'updateHistogram',
            onDone: {
              target: 'active',
            },
          },
          on: {
            ...eventResponses,
          },
        },
        active: {
          entry: context =>
            context.service.send({
              type: 'IMAGE_RENDERING_ACTIVE',
              data: { name: context.images.updateRenderedName },
            }),
          on: {
            ...eventResponses,
          },
        },
      },
    },
    options
  )
}

export default createImageRenderingActor
