import { Machine } from 'xstate'

function createImagesUIMachine(options, context) {
  return Machine(
    {
      id: 'layer',
      initial: 'idle',
      context,
      states: {
        idle: {
          on: {
            ADD_IMAGE: {
              target: 'active',
              actions: ['createImagesInterface'],
            },
          },
        },
        active: {},
      },
    },
    options
  )
}

export default createImagesUIMachine
