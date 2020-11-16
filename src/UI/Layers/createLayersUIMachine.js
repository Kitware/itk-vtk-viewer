import { Machine, assign, spawn, send } from 'xstate'

import createLayerUIActor from './createLayerUIActor'
import LayerActorContext from '../../Context/LayerActorContext'
import ImageActorContext from '../../Context/ImageActorContext'

function resize(arr, newSize, defaultValue) {
  return [
    ...arr,
    ...Array(Math.max(newSize - arr.length, 0)).fill(defaultValue),
  ]
}

function spawnLayerRenderingActor(options) {
  return assign({
    layers: (context, event) => {
      const layers = context.layers
      switch (event.type) {
        case 'ADD_IMAGE': {
          let name = event.data.name

          // Ensure unique name
          let nameNumber = 0
          while (layers.layerUIActors.has(name)) {
            name = `${event.data.name}-${nameNumber + 1}`
            nameNumber++
          }
          const actorContext = layers.actorContext.has(name)
            ? layers.actorContext.get(name)
            : new LayerActorContext()
          actorContext.type = 'image'
          layers.actorContext.set(name, actorContext)
          layers.lastAddedData = { name, data: event.data }
          layers.layerUIActors.set(
            name,
            spawn(createLayerUIActor(options, context), `layerUIActor-${name}`)
          )
          break
        }
        default:
          throw new Error(`Unexpected event type: ${event.type}`)
      }
      return layers
    },
  })
}

const assignImageContext = assign({
  images: context => {
    const images = context.images
    const name = context.layers.lastAddedData.name
    images.selectedName = name
    const actorContext = images.actorContext.has(name)
      ? images.actorContext.get(name)
      : new ImageActorContext()
    actorContext.image = context.layers.lastAddedData.data
    actorContext.componentWeights = resize(
      actorContext.componentWeights,
      actorContext.image.imageType.components,
      1.0
    )
    images.actorContext.set(name, actorContext)
    return images
  },
})

function createLayersUIMachine(options, context) {
  const { layerUIActor } = options

  return Machine(
    {
      id: 'layers',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createLayersInterface'],
          },
        },
        active: {
          on: {
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: (c, e) => `layerUIActor-${e.data}`,
              }),
            },
            ADD_IMAGE: {
              actions: [
                spawnLayerRenderingActor(layerUIActor),
                assignImageContext,
                c =>
                  c.service.send({
                    type: 'IMAGE_ASSIGNED',
                    data: c.layers.lastAddedData.name,
                  }),
              ],
            },
          },
        },
      },
    },
    options
  )
}

export default createLayersUIMachine
