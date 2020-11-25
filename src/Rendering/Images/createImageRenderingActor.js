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
  RENDERED_IMAGE_ASSIGNED: {
    actions: 'applyRenderedImage',
  },
  TOGGLE_LAYER_VISIBILITY: {
    actions: 'applyVisibility',
  },
  ADD_IMAGE_COLOR: {
    actions: 'applyImageColors',
  },
  SET_GRADIENT_OPACITY: {
    actions: 'applyGradientOpacity',
  },
  IMAGE_COMPONENT_VISIBILITY_CHANGED: {
    actions: 'applyComponentVisibility',
  },
  IMAGE_COLOR_RANGE_CHANGED: {
    actions: 'applyColorRange',
  },
  IMAGE_COLOR_MAP_CHANGED: {
    actions: 'applyColorMap',
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
