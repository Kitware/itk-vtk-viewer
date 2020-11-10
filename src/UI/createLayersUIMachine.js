import { Machine } from 'xstate'

function createLayersUIMachine(options, context) {
  return Machine(
    {
      id: 'layers',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createLayersInterface'],
          },
        },
        active: {},
      },
    },
    options
  )
}

export default createLayersUIMachine
