import { assign, createMachine, forwardTo, send } from 'xstate'
import { defaultCompare } from '../../Context/ImageActorContext'
import { makeTransitions } from './makeTransitions'

export const getOutputIntensityComponentCount = actorContext => {
  const {
    image,
    compare: { method },
  } = actorContext
  if (method !== 'disabled') return 2
  return image.imageType.components
}

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
const HIGH_FPS = 30.0

// Return true if finest scale or already backed off coarser or FPS is in Goldilocks zone
function finestScaleOrScaleJustRight(context) {
  const { loadedScale } = context.images.actorContext.get(
    context.images.updateRenderedName
  )
  return (
    loadedScale === 0 ||
    context.hasScaledCoarser ||
    (LOW_FPS < context.main.fps && context.main.fps < HIGH_FPS)
  )
}

function isFpsLow(context) {
  return context.main.fps <= LOW_FPS
}

function isLoadedScaleMostCoarse(context) {
  const actorContext = context.images.actorContext.get(
    context.images.updateRenderedName
  )
  return getLoadedImage(actorContext).coarsestScale === actorContext.loadedScale
}

const assignIsFramerateScalePickingOn = assign({
  images: ({ images }, { type }) => {
    const actorContext = images.actorContext.get(images.updateRenderedName)
    actorContext.isFramerateScalePickingOn = type !== 'SET_IMAGE_SCALE'
    return images
  },
})

const assignCinematic = assign({
  images: ({ images }, { data: { params, name } }) => {
    const actorContext = images.actorContext.get(name)
    actorContext.cinematicParameters = {
      ...actorContext.cinematicParameters,
      ...params,
    }
    return images
  },
})

const sendCinematicChanged = context => {
  const actorContext = context.images.actorContext.get(
    context.images.selectedName
  )
  context.service.send({
    type: 'CINEMATIC_CHANGED',
    actorContext,
  })
}

const computeIsCinematicPossible = (context, { data: { itkImage, name } }) => {
  const isCinematicPossible = itkImage.imageType.components === 1

  context.service.send({
    type: 'SET_CINEMATIC_PARAMETERS',
    data: {
      name,
      params: { isCinematicPossible },
    },
  })
}

// force rebuilding image
const forceUpdate = c =>
  c.service.send({
    type: 'UPDATE_RENDERED_IMAGE',
    data: { name: c.actorName },
  })

const sendCompareUpdated = (c, { data: { name } }) => {
  c.service.send({
    type: 'COMPARE_UPDATED',
    data: { name },
  })
}

const updateCompare = (
  { service, use2D, images: { actorContext: actorMap } },
  name
) => {
  const actorContext = actorMap.get(name)

  const { method, imageMix } = actorContext.compare
  const { method: lastMethod, imageMix: lastImageMix } =
    actorContext.lastCompare ?? {}

  if (lastMethod !== method) {
    // besides setting the color maps, this adds another entry for the possibly new second component
    if (method === 'cyan-magenta') {
      service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: 0, colorMap: 'BkCy' },
      })
      service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: 1, colorMap: 'BkMa' },
      })
    }

    if (method === 'blend' || method === 'checkerboard') {
      service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: 0, colorMap: 'Grayscale' },
      })
      service.send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: 1, colorMap: 'Grayscale' },
      })
    }
  }

  if (method !== 'disabled' && imageMix !== lastImageMix) {
    const mix0 = 1 - imageMix
    const mix1 = imageMix
    for (let component = 0; component < 2; component++) {
      const mix = component ? mix1 : mix0
      const points = use2D
        ? [
            [0, mix],
            [1, mix],
          ]
        : [
            [0, 0],
            [1, mix],
          ]
      service.send({
        type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED',
        data: { name, component, points },
      })
      // clamp points to color range to respect window and level
      const range =
        actorContext.colorRanges.get(component) ??
        actorContext.colorRanges.get(0)
      if (range) {
        service.send({
          type: 'IMAGE_COLOR_RANGE_CHANGED',
          data: { name, component, range },
        })
      }
    }
  }
}

const assignCompare = assign({
  images: (context, { data: { name, fixedImageName, options } }) => {
    const actorContext = context.images.actorContext.get(name)
    actorContext.lastCompare = { ...actorContext.compare } // for diffing later by updateCompare, UI, etc.

    const updatedCompare = {
      ...defaultCompare,
      ...actorContext.compare,
      ...options,
    }

    const computedCheckerboard = {
      ...updatedCompare,
      checkerboard: updatedCompare.method === 'checkerboard' ? true : false,
      // after computed values to let explicit set of values to take precedence
      ...options,
    }

    const computedImageMix = {
      ...computedCheckerboard,
      // compute imageMix from swapImageOrder if checkerboard is on
      ...(computedCheckerboard.checkerboard
        ? { imageMix: computedCheckerboard.swapImageOrder ? 1 : 0 }
        : {}),
    }

    actorContext.compare = {
      fixedImageName,
      ...computedImageMix,
      // after computed values to let explicit set of values to take precedence
      ...options,
    }
    updateCompare(context, name)
    return context.images
  },
})

const dirtyColorRanges = c => {
  const actorContext = c.images.actorContext.get(c.actorName)
  actorContext.dirtyColorRanges = true
}

const cleanColorRanges = (c, { data: { name } }) => {
  const actorContext = c.images.actorContext.get(name)
  if (actorContext.dirtyColorRanges) {
    // let applyRenderedImage update colorRanges and colorRangeBounds
    actorContext.colorRanges = new Map()
    const componentCount = getOutputIntensityComponentCount(actorContext)
    actorContext.colorRangeBoundsAutoAdjust = new Map(
      [...Array(componentCount).keys()].map(c => [c, true])
    )

    actorContext.dirtyColorRanges = false
  }
}

const afterCompareMaybeForceUpdate = context => {
  const {
    actorName,
    images: { actorContext: actorMap },
  } = context
  const actorContext = actorMap.get(actorName)

  // eslint-disable-next-line no-unused-vars
  const { imageMix, swapImageOrder, ...compare } = actorContext.compare
  // eslint-disable-next-line no-unused-vars
  const { imageMix: _, swapImageOrder: __, ...lastCompare } =
    actorContext.lastCompare ?? {}

  if (JSON.stringify(compare) === JSON.stringify(lastCompare)) return

  dirtyColorRanges(context)
  forceUpdate(context)
}

const KNOWN_ERRORS = [
  'Voxel count over max at scale',
  "Failed to execute 'postMessage' on 'Worker': Data cannot be cloned, out of memory.", // Chrome
  "Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope': Data cannot be cloned, out of memory.", // Firefox
  'Array buffer allocation failed',
  'Aborted(). Build with -sASSERTIONS for more info',
]

const checkIsKnownErrorOrThrow = (c, { data: error }) => {
  if (
    KNOWN_ERRORS.some(knownMessage => error.message?.startsWith(knownMessage))
  ) {
    console.warn('Could not update image', error.stack)
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

const sendStartDataUpdate = context => {
  context.service.send({
    type: 'START_DATA_UPDATE',
    name: context.actorName,
  })
}

const sendFinishDataUpdate = context => {
  context.service.send({
    type: 'FINISH_DATA_UPDATE',
    name: context.actorName,
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
  RENDERED_BOUNDS_CHANGED: {
    target: 'updatingImage',
  },
  SET_CINEMATIC_PARAMETERS: {
    actions: [assignCinematic, sendCinematicChanged],
  },
  CINEMATIC_CHANGED: {
    actions: 'applyCinematicChanged',
  },
  COMPARE_IMAGES: {
    actions: [assignCompare, sendCompareUpdated, afterCompareMaybeForceUpdate],
  },
}

const CHANGE_BOUNDS_EVENTS = [
  'CROPPING_PLANES_CHANGED_BY_USER',
  'CAMERA_MODIFIED',
]

const createUpdatingImageMachine = options => {
  return createMachine(
    {
      id: 'updatingImageMachine',
      predictableActionArguments: true,
      initial: 'checkingUpdateNeeded',
      states: {
        checkingUpdateNeeded: {
          always: [
            { cond: 'isImageUpdateNeeded', target: 'preLoadingImage' },
            { target: '#updatingImageMachine.loadedImage' },
          ],
          exit: assign({ isUpdateForced: false }),
        },

        preLoadingImage: {
          entry: sendStartDataUpdate,
          invoke: {
            id: 'preLoadingImage',
            src: async () => {
              // Give spinner chance to start. Waiting 2 frames works better in cached image case =|
              await new Promise(requestAnimationFrame)
              await new Promise(requestAnimationFrame)
            },
            onDone: {
              target: 'loadingImage',
            },
          },
        },

        loadingImage: {
          invoke: {
            id: 'updateRenderedImage',
            src: 'updateRenderedImage',
            onDone: {
              target: '#updatingImageMachine.loadedImage',
              actions: [
                'assignRenderedImage',
                assignLoadedScale,
                assignClearHistograms,
                cleanColorRanges,
                'applyRenderedImage',
                sendRenderedImageAssigned,
                computeIsCinematicPossible,
              ],
            },
            onError: {
              actions: [checkIsKnownErrorOrThrow, assignCoarserScale],
              target: 'checkingUpdateNeeded',
            },
          },
        },

        loadedImage: {
          entry: sendFinishDataUpdate,
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
                cond: c =>
                  [isFpsLow, isLoadedScaleMostCoarse].every(cond => cond(c)),
                target: 'finished', // FPS too slow but nothing to do about it
              },
              {
                cond: isFpsLow,
                actions: assignCoarserScale, // back off
                target: 'checkingUpdateNeeded',
              },
              {
                cond: finestScaleOrScaleJustRight,
                target: 'finished', // found good scale
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

const createImageRenderingActor = (options, context, name) => {
  const machineContext = { ...context, actorName: name }
  return createMachine(
    {
      id: 'imageRendering',
      predictableActionArguments: true,
      context: machineContext,
      type: 'parallel',
      states: {
        imageLoader: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                COMPARE_IMAGES: {
                  actions: [assignCompare, sendCompareUpdated],
                },
              },
              invoke: {
                id: 'createImageRenderer',
                src: 'createImageRenderer',
                onDone: {
                  target: 'updatingImage',
                  actions: assignUpdateRenderedNameToSelectedName,
                },
              },
            },

            updatingImage: {
              on: {
                ...eventResponses,
                FPS_UPDATED: {
                  actions: forwardTo('updatingImageMachine'),
                },
                UPDATE_IMAGE_HISTOGRAM: {},
                RENDERED_BOUNDS_CHANGED: {},
              },
              entry: 'assignVisualizedComponents',
              invoke: {
                id: 'updatingImageMachine',
                src: createUpdatingImageMachine(options),
                data: {
                  ...machineContext,
                  hasScaledCoarser: false,
                  targetScale: ({ images }, event) => {
                    if (event.type === 'SET_IMAGE_SCALE')
                      return event.targetScale
                    const actorContext = images.actorContext.get(
                      images.updateRenderedName
                    )
                    if (
                      actorContext.loadedScale ||
                      actorContext.loadedScale === 0
                    )
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
                onDone: [
                  {
                    in:
                      '#imageRendering.imageLoader.updatingImage.noUpdateNeeded',
                    target: 'updatingHistogram',
                  },
                  { target: 'updatingImage' },
                ],
              },
              initial: 'noUpdateNeeded',
              states: {
                noUpdateNeeded: { on: { RENDERED_BOUNDS_CHANGED: 'loopback' } },
                loopback: {},
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

        debouncedImageUpdate: {
          after: {
            500: {
              actions: send('RENDERED_BOUNDS_CHANGED'),
            },
          },
          on: makeTransitions(CHANGE_BOUNDS_EVENTS, 'debouncedImageUpdate'),
        },
      },
    },
    options
  )
}

export default createImageRenderingActor
