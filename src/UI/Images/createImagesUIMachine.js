import { Machine } from 'xstate'

function createImagesUIMachine(options, context) {
  return Machine(
    {
      id: 'images',
      initial: 'idle',
      context,
      states: {
        idle: {
          on: {
            ASSIGN_IMAGE: {
              target: 'active',
              actions: ['createImagesInterface', 'assignImage'],
            },
          },
        },
        active: {
          on: {
            ASSIGN_IMAGE: {
              target: 'active',
              actions: ['assignImage'],
            },
          },
        },
      },
    },
    options
  )
}

export default createImagesUIMachine
