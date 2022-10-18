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

const createLayerUIActor = (options, context, actorContext) => {
  return Machine(
    {
      id: 'layerUI',
      initial: 'active',
      context: { actorContext, ...context },
      states: {
        active: {
          entry: 'createLayerInterface',
          on: {
            SELECT_LAYER: {
              actions: 'selectLayer',
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: [assignLayerVisibility, 'toggleLayerVisibility'],
            },
          },
          initial: 'idle',
          states: {
            idle: {
              entry: 'finishDataUpdate',
              on: { START_DATA_UPDATE: 'dataUpdating' },
            },
            dataUpdating: {
              entry: 'startDataUpdate',
              on: { FINISH_DATA_UPDATE: 'dataLoading' },
            },
            dataLoading: {
              // wait until data is loaded on GPU
              on: { POST_RENDER: 'idle' },
            },
          },
        },
      },
    },
    options
  )
}

export default createLayerUIActor
