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
              target: 'active',
            },
          },
        },
        active: {
          type: 'parallel',
          on: {
            SET_COMPONENT_WEIGHT: {
              actions: 'applyComponentWeight',
            },
          },
          on: {
            ADD_IMAGE_COLOR: {
              actions: 'applyImageColors',
            },
          },
          on: {
            SET_GRADIENT_OPACITY: {
              actions: 'applyGradientOpacity',
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
