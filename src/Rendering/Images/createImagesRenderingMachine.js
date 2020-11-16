import { Machine, assign, spawn, send } from 'xstate'

import createImageRenderingActor from './createImageRenderingActor'

function spawnImageRenderingActor(options) {
  return assign({
    images: (context, event) => {
      const images = context.images
      const name = context.layers.lastAddedData.name
      if (!images.imageRenderingActors.has(name)) {
        images.imageRenderingActors.set(
          name,
          spawn(
            createImageRenderingActor(options, context),
            `imageRenderingActor-${name}`
          )
        )
      }
      return images
    },
  })
}

function createImagesRenderingMachine(options, context) {
  const { imageRenderingActor } = options

  return Machine(
    {
      id: 'imagesRendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          on: {
            IMAGE_ASSIGNED: {
              target: 'active',
              actions: [spawnImageRenderingActor(imageRenderingActor)],
            },
          },
        },
        active: {
          on: {
            IMAGE_ASSIGNED: {
              actions: spawnImageRenderingActor(imageRenderingActor),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
          },
        },
      },
    },
    options
  )
}

export default createImagesRenderingMachine
