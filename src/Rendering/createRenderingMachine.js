import { Machine } from 'xstate'

const createRenderingMachine = (options, context) => {
  return Machine(
    {
      id: 'rendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createRenderer'],
          },
        },
        active: {
          entry: [() => console.log('enter Rendering Machine')],
        },
      },
    },
    options
  )
}

export default createRenderingMachine
