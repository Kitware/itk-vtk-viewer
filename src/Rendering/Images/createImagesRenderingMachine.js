import { Machine } from 'xstate'

function createImagesRenderingMachine(options, context) {
  return Machine(
    {
      id: 'images',
      initial: 'idle',
      context,
      states: {
        idle: {
          on: {
            ADD_IMAGE: {
              target: 'active',
              actions: ['createImagesRenderer'],
            },
          },
        },
        active: {},
      },
    },
    options
  )
}

export default createImagesRenderingMachine
