import { Machine, assign } from 'xstate'

const assignUpdateName = assign({
  images: (context, event) => {
    const images = context.images
    images.updateName = event.data.name
    return images
  },
})

const assignUpdateNameToSelectedName = assign({
  images: (context, event) => {
    const images = context.images
    images.updateName = images.selectedName
    return images
  },
})

const eventResponses = {
  UPDATE_IMAGE_DATA: {
    target: 'updateData',
    actions: assignUpdateName,
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
              target: 'updateData',
              actions: assignUpdateNameToSelectedName,
            },
          },
        },
        updateData: {
          invoke: {
            id: 'updateData',
            src: 'updateData',
            onDone: {
              target: 'active',
            },
          },
          on: eventResponses,
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
