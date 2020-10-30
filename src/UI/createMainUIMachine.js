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
            actions: ['createInterface'],
          },
        },
        active: {
          entry: [() => console.log('enter Main UI Machine')],
        },
        on: {},
      },
    },
    options
  )
}

export default createMainUIMachine
