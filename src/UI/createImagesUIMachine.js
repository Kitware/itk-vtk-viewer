import { Machine } from 'xstate'

function createImagesUIMachine(options, context) {
  return Machine(
    {
      id: 'layer',
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

export default createImagesUIMachine
