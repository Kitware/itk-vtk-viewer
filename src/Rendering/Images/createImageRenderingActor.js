import { Machine, assign } from 'xstate'

const assignUpdateRenderedName = assign({
  images: (context, event) => {
    const images = context.images
    images.updateRenderedName = event.data.name
    return images
  },
})

const assignUpdateRenderedNameToSelectedName = assign({
  images: (context, event) => {
    const images = context.images
    images.updateRenderedName = images.selectedName
    return images
  },
})

const eventResponses = {
  IMAGE_ASSIGNED: {
    target: 'updateRenderedImage',
    actions: assignUpdateRenderedNameToSelectedName,
  },
  LABEL_IMAGE_ASSIGNED: {
    target: 'updateRenderedImage',
    actions: assignUpdateRenderedNameToSelectedName,
  },
  RENDERED_IMAGE_ASSIGNED: {
    actions: 'applyRenderedImage',
  },
  TOGGLE_LAYER_VISIBILITY: {
    actions: 'applyVisibility',
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
  LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
    actions: 'applyLookupTable',
  },
  LABEL_IMAGE_BLEND_CHANGED: {
    actions: 'applyLabelImageBlend',
  },
}

const createImageRenderingActor = (options, context, event) => {
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
              target: 'updateRenderedImage',
              actions: assignUpdateRenderedNameToSelectedName,
            },
          },
        },
        updateRenderedImage: {
          invoke: {
            id: 'updateRenderedImage',
            src: 'updateRenderedImage',
            onDone: {
              target: 'active',
            },
          },
          on: {
            ...eventResponses,
            UPDATE_RENDERED_IMAGE: {
              target: 'updateRenderedImage',
              actions: assignUpdateRenderedName,
            },
          },
        },
        active: {
          type: 'parallel',
          on: eventResponses,
          states: {
            independentComponents: {
              enabled: {},
              disabled: {},
            },
          },
        },
        finished: {
          type: 'final',
        },
        onDone: {
          //actions: 'cleanup'
        },
      },
    },
    options
  )
}

export default createImageRenderingActor
