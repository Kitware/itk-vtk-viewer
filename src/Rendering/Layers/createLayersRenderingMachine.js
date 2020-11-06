import { Machine } from 'xstate'

function createLayersRenderingMachine(options, context) {
  return Machine(
    {
      id: 'layers',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
          },
        },
        active: {},
      },
    },
    options
  )
}

export default createLayersRenderingMachine
