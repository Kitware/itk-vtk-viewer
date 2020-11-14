import { Machine } from 'xstate'

const createLayerUIActor = (options, context) => {
  return Machine(
    {
      id: 'layerUI',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: 'createLayerInterface',
          },
        },
        active: {
          on: {
            SELECT_LAYER: {
              actions: 'selectLayer',
            },
          },
        },
        finished: {
          type: 'final',
        },
        onDone: {
          //actions: 'cleanup'
        },
      },
    },
    options
  )
}

export default createLayerUIActor
