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
            ASSIGN_IMAGE: {
              target: 'active',
              actions: [spawnImageRenderingActor(imageRenderingActor)],
            },
          },
        },
        active: {
          on: {
            ASSIGN_IMAGE: {
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
