import { Machine } from 'xstate'

function createMainRenderingMachine(options, context) {
  return Machine(
    {
      id: 'main',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['setBackgroundColor'],
          },
        },
        active: {
          entry: [() => console.log('enter Main Rendering Machine')],
          on: {
            SET_BACKGROUND_COLOR: {
              actions: ['setBackgroundColor'],
            },
          },
        },
      },
    },
    options
  )
}

export default createMainRenderingMachine
