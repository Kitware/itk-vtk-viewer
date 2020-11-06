import { Machine } from 'xstate'

function createLayerUIMachine(options, context) {
  return Machine(
    {
      id: 'layer',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createLayerInterface'],
          },
        },
        active: {
          type: 'parallel',
          on: {},
          states: {},
        },
      },
    },
    options
  )
}

export default createLayerUIMachine
