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
            IMAGE_ASSIGNED: {
              target: 'active',
              actions: ['createImagesInterface', 'updateImageInterface'],
            },
          },
        },
        active: {
          on: {
            IMAGE_ASSIGNED: {
              target: 'active',
              actions: ['updateImageInterface'],
            },
          },
        },
      },
    },
    options
  )
}

export default createImagesUIMachine
