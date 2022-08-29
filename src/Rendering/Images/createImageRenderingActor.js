import { assign, createMachine, forwardTo } from 'xstate'

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
  targetScale: ({ targetScale }) => {
    return Math.max(0, targetScale - 1)
  },
})

const assignLowerScale = assign({
  targetScale: ({ images, targetScale }) => {
    const actorContext = images.actorContext.get(images.updateRenderedName)
    const image = actorContext.image ?? actorContext.labelImage
    const lowestScale = image.lowestScale
    if (targetScale < lowestScale) {
      return targetScale + 1
    }
    return targetScale
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
function highestScaleOrScaleJustRight(context) {
  const { loadedScale } = context.images.actorContext.get(
    context.images.updateRenderedName
  )
  return (
    loadedScale === 0 ||
    context.hasErrored ||
    (context.main.fps > 10.0 && context.main.fps < 33.0)
  )
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
    target: 'updatingImage',
    actions: assignIsFramerateScalePickingOn,
  },
  ADJUST_SCALE_FOR_FRAMERATE: {
    target: 'updatingImage',
    actions: assignIsFramerateScalePickingOn,
  },
  // Use this event to possibly update image bounds to avoid circular loop with CROPPING_PLANES_CHANGED.
  // CROPPING_PLANES_CHANGED could be updated by
  // updateRenderedImage->RENDERED_IMAGE_ASSIGNED->updateCroppingParametersFromImage->CROPPING_PLANES_CHANGED
  // because image size may change across scales.
  CROPPING_PLANES_CHANGED_BY_USER: {
    target: 'imageBoundsDebouncing',
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
          exit: assign({ isUpdateForced: true }),
        },

        loadingImage: {
          invoke: {
            id: 'updateRenderedImage',
            src: 'updateRenderedImage',
            onDone: {
              target: '#updatingImageMachine.afterUpdatingImage',
            },
            onError: {
              actions: [
                (context, event) => {
                  console.error(`Could not update image : ${event.data}`)
                },
                assignLowerScale,
                assign({ hasErrored: true }),
              ],
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
                cond: scaleTooHigh, // FPS too slow
                actions: assignLowerScale, // back off
                target: 'checkingUpdateNeeded',
              },
              {
                cond: highestScaleOrScaleJustRight, // found good scale
                target: 'finished',
              },
              {
                actions: assignHigherScale, // try harder
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

        imageBoundsDebouncing: {
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
            src: createUpdatingImageMachine(options, context),
            data: {
              ...context,
              hasErrored: false,
              targetScale: ({ images }, event) => {
                if (event.type === 'SET_IMAGE_SCALE') return event.targetScale
                const actorContext = images.actorContext.get(
                  images.updateRenderedName
                )
                if (actorContext.loadedScale || actorContext.loadedScale === 0)
                  return actorContext.loadedScale
                // nothing loaded, start at coarsest
                const image = actorContext.image ?? actorContext.labelImage
                return image.lowestScale
              },
              isUpdateForced: (c, event) =>
                event.type === 'UPDATE_RENDERED_IMAGE',
            },
            onDone: { target: 'updateHistogram' },
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
