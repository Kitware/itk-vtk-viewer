import { Machine } from 'xstate'

const createRenderingMachine = (options, context) => {
  return Machine(
    {
      id: 'rendering',
      strict: true,
      initial: 'idle',
      context,
      states: {
        idle: {},
        started: {},
      },
    },
    options
  )
}

export default createRenderingMachine
