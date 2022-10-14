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
              entry: 'idle',
              on: { IMAGE_UPDATE_STARTED: 'imageUpdating' },
            },
            imageUpdating: {
              entry: 'imageUpdating',
              on: { IMAGE_UPDATE_FINISHED: 'imageBuilt' },
            },
            imageBuilt: {
              // wait until after render when image is loaded on GPU
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
