import { Machine } from 'xstate'

function createImagesRenderingMachine(options, context) {
  return Machine(
    {
      id: 'images',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
          },
        },
        active: {},
      },
    },
    options
  )
}

export default createImagesRenderingMachine
