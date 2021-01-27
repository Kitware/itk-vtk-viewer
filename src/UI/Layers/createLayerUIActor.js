import { Machine, assign } from 'xstate'

const assignLayerVisibility = assign({
  layers: (context, event) => {
    const layers = context.layers
    const name = event.data
    const actorContext = layers.actorContext.get(name)
    actorContext.visible = !actorContext.visible
    layers.actorContext.set(name, actorContext)
    return layers
  },
})

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
            TOGGLE_LAYER_VISIBILITY: {
              actions: [assignLayerVisibility, 'toggleLayerVisibility'],
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
