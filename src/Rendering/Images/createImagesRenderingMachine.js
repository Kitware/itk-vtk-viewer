import { Machine, assign, spawn } from 'xstate'

import createImageRenderingActor from './createImageRenderingActor'

function spawnImageRenderingActor(options) {
  return assign({
    images: (context, event) => {
      const images = context.images
      const name = images.selectedName
      images.imageRenderingActors.set(
        name,
        spawn(
          createImageRenderingActor(options, context),
          `imageRenderingActor-${name}`
        )
      )
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
          },
        },
      },
    },
    options
  )
}

export default createImagesRenderingMachine
