import { Machine } from 'xstate'

function createMainUIMachine(options, context) {
  return Machine(
    {
      id: 'main',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createMainInterface'],
          },
        },
        active: {},
      },
    },
    options
  )
}

export default createMainUIMachine
