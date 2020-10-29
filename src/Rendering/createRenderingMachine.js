import { Machine } from 'xstate'

const createRenderingMachine = (options, context) => {
  return Machine(
    {
      id: 'rendering',
      strict: true,
      initial: 'idle',
      context,
      states: {
        idle: {
          always: 'active',
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
