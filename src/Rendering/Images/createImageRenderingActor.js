import { assign, createMachine, forwardTo } from 'xstate'

const getLoadedImage = actorContext =>
  actorContext.image ?? actorContext.labelImage

const assignColorRange = assign({
  images: (
    { images },
    { data: { name, component, range, keepAutoAdjusting = false } }
  ) => {
    const { colorRanges, colorRangesAutoAdjust } = images.actorContext.get(name)

    colorRanges.set(component, range)

    colorRangesAutoAdjust.set(
      component,
      colorRangesAutoAdjust.get(component) && keepAutoAdjusting
    )

    return images
  },
})

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

const assignFinerScale = assign({
  targetScale: ({ targetScale }) => {
    return Math.max(0, targetScale - 1)
  },
})

const assignCoarserScale = assign({
  targetScale: ({ images, targetScale }) => {
    const actorContext = images.actorContext.get(images.updateRenderedName)
    if (targetScale < getLoadedImage(actorContext).coarsestScale) {
      return targetScale + 1
    }
    return targetScale
  },
  hasScaledCoarser: true,
})

const assignLoadedScale = assign({
  images: ({ images }, { data }) => {
    const name = data.name ?? data
    const actorContext = images.actorContext.get(name)
    actorContext.loadedScale = data.loadedScale
    return images
  },
})

const assignClearHistograms = assign({
  images: ({ images }, { data }) => {
    const name = data.name ?? data
    const actorContext = images.actorContext.get(name)
    actorContext.histograms = new Map()
    return images
  },
})

const LOW_FPS = 10.0
const JUST_ACCEPTABLE_FPS = 30.0

// Return true if finest scale or right scale (to stop loading of finer scale)
function finestScaleOrScaleJustRight(context) {
  const { loadedScale } = context.images.actorContext.get(
    context.images.updateRenderedName
  )
  return (
    loadedScale === 0 ||
    context.hasScaledCoarser ||
    (LOW_FPS < context.main.fps && context.main.fps < JUST_ACCEPTABLE_FPS)
  )
}

function scaleTooHigh(context) {
  return context.main.fps <= LOW_FPS
}

function scaleTooHighAndMostCoarse(context) {
  const actorContext = context.images.actorContext.get(
    context.images.updateRenderedName
  )
  const { coarsestScale } = getLoadedImage(actorContext)
  const { loadedScale } = actorContext
  return scaleTooHigh(context) && loadedScale === coarsestScale
}

const assignIsFramerateScalePickingOn = assign({
  images: ({ images }, { type }) => {
    const actorContext = images.actorContext.get(images.updateRenderedName)
    actorContext.isFramerateScalePickingOn = type !== 'SET_IMAGE_SCALE'
    return images
  },
})

const KNOWN_ERRORS = [
  'Voxel count over max at scale',
  "DataCloneError: Failed to execute 'postMessage' on 'Worker': Data cannot be cloned, out of memory.",
]

const checkIsKnownErrorOrThrow = (c, { data: error }) => {
  if (
    KNOWN_ERRORS.some(knownMessage => error.message.startsWith(knownMessage))
  ) {
    console.warn(`Could not update image : ${error.message}`)
  } else {
    throw error
  }
}

const sendRenderedImageAssigned = (
  context,
  { data: { name, loadedScale } }
) => {
  context.service.send({
    type: 'RENDERED_IMAGE_ASSIGNED',
    data: name,
    loadedScale,
  })
}

const eventResponses = {
  IMAGE_ASSIGNED: {
    target: 'updatingImage',
    actions: [assignUpdateRenderedNameToSelectedName, assignLoadedScale],
  },
  LABEL_IMAGE_ASSIGNED: {
    target: 'updatingImage',
    actions: assignUpdateRenderedNameToSelectedName,
  },
  UPDATE_RENDERED_IMAGE: {
    target: 'updatingImage',
    actions: assignUpdateRenderedName,
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
  IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED: {
    actions: 'mapToPiecewiseFunctionNodes',
  },
  IMAGE_COLOR_RANGE_CHANGED: {
    actions: [assignColorRange, 'applyColorRange'],
  },
  IMAGE_COLOR_RANGE_BOUNDS_CHANGED: {
    actions: ['applyColorRangeBounds'],
  },
  IMAGE_COLOR_MAP_SELECTED: {
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
    target: 'updatingHistogram',
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
    target: 'updatingImage',
    actions: assignIsFramerateScalePickingOn,
  },
  ADJUST_SCALE_FOR_FRAMERATE: {
    target: 'updatingImage',
    actions: assignIsFramerateScalePickingOn,
  },
  // Use this event to possibly update image bounds to avoid circular loop with CROPPING_PLANES_CHANGED.
  // CROPPING_PLANES_CHANGED could be updated by
  // updateRenderedImage->applyRenderedImage->updateCroppingParametersFromImage->CROPPING_PLANES_CHANGED
  // because image size may change across scales.
  CROPPING_PLANES_CHANGED_BY_USER: {
    target: 'debouncingUpdatingImage',
  },
  CAMERA_MODIFIED: {
    target: 'debouncingUpdatingImage',
  },
}

const createUpdatingImageMachine = options => {
  return createMachine(
    {
      id: 'updatingImageMachine',
      initial: 'checkingUpdateNeeded',
      states: {
        checkingUpdateNeeded: {
          always: [
            { cond: 'isImageUpdateNeeded', target: 'loadingImage' },
            { target: '#updatingImageMachine.afterUpdatingImage' },
          ],
          exit: assign({ isUpdateForced: false }),
        },

        loadingImage: {
          invoke: {
            id: 'updateRenderedImage',
            src: 'updateRenderedImage',
            onDone: {
              target: '#updatingImageMachine.afterUpdatingImage',
              actions: [
                'assignRenderedImage',
                assignLoadedScale,
                assignClearHistograms,
                'applyRenderedImage',
                sendRenderedImageAssigned,
              ],
            },
            onError: {
              actions: [checkIsKnownErrorOrThrow, assignCoarserScale],
              target: 'checkingUpdateNeeded',
            },
          },
        },

        afterUpdatingImage: {
          always: [
            {
              cond: 'isFramerateScalePickingOn',
              target: 'checkingFramerate',
            },
            {
              target: 'finished',
            },
          ],
        },

        checkingFramerate: {
          entry: [c => c.service.send('UPDATE_FPS')],
          on: {
            FPS_UPDATED: [
              {
                cond: scaleTooHighAndMostCoarse, // FPS too slow but nothing to do about it
                target: 'finished',
              },
              {
                cond: scaleTooHigh, // FPS too slow
                actions: assignCoarserScale, // back off
                target: 'checkingUpdateNeeded',
              },
              {
                cond: finestScaleOrScaleJustRight, // found good scale
                target: 'finished',
              },
              {
                actions: assignFinerScale, // try harder
                target: 'checkingUpdateNeeded',
              },
            ],
          },
        },

        finished: {
          type: 'final',
        },
      },
    },
    options
  )
}

const createImageRenderingActor = (options, context /*, event*/) => {
  return createMachine(
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
              target: 'updatingImage',
              actions: assignUpdateRenderedNameToSelectedName,
            },
          },
        },

        debouncingUpdatingImage: {
          on: {
            ...eventResponses,
          },
          after: {
            500: { target: 'updatingImage' },
          },
        },

        updatingImage: {
          on: {
            ...eventResponses,
            FPS_UPDATED: {
              actions: forwardTo('updatingImageMachine'),
            },
          },
          invoke: {
            id: 'updatingImageMachine',
            src: createUpdatingImageMachine(options),
            data: {
              ...context,
              hasScaledCoarser: false,
              targetScale: ({ images }, event) => {
                if (event.type === 'SET_IMAGE_SCALE') return event.targetScale
                const actorContext = images.actorContext.get(
                  images.updateRenderedName
                )
                if (actorContext.loadedScale || actorContext.loadedScale === 0)
                  return actorContext.loadedScale
                // nothing loaded, start at coarsest
                return getLoadedImage(actorContext).coarsestScale
              },
              isUpdateForced: (c, event) =>
                [
                  'UPDATE_RENDERED_IMAGE',
                  'IMAGE_ASSIGNED',
                  'LABEL_IMAGE_ASSIGNED',
                ].some(forcedEvent => event.type === forcedEvent),
            },
            onDone: { target: 'updatingHistogram' },
          },
        },

        updatingHistogram: {
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
