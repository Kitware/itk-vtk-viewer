import { Machine } from 'xstate'

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
        },
        active: {
          type: 'parallel',
          on: {
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
          },
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
