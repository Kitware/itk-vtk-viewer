import { Machine } from 'xstate'

function createLayersRenderingMachine(options, context) {
  return Machine(
    {
      id: 'layersRendering',
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
