import { Machine, assign, spawn, send } from 'xstate'

import createImageRenderingActor from './createImageRenderingActor'

function spawnImageRenderingActor(options) {
  return assign({
    images: (context, event) => {
      const images = context.images
      const name = event.data
      if (!images.imageRenderingActors.has(name)) {
        images.imageRenderingActors.set(
          name,
          spawn(
            createImageRenderingActor(options, context),
            `imageRenderingActor-${name}`
          )
        )
      } else {
        const actor = images.imageRenderingActors.get(name)
        actor.send(event)
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
            LABEL_IMAGE_ASSIGNED: {
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
            LABEL_IMAGE_ASSIGNED: {
              actions: spawnImageRenderingActor(imageRenderingActor),
            },
            SELECT_LAYER: {
              actions: 'selectImageLayer',
            },
            UPDATE_RENDERED_IMAGE: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
            TOGGLE_IMAGE_INTERPOLATION: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
            IMAGE_COMPONENT_VISIBILITY_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_PIECEWISE_FUNCTION_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_COLOR_RANGE_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_COLOR_MAP_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            TOGGLE_IMAGE_SHADOW: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
            IMAGE_GRADIENT_OPACITY_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_GRADIENT_OPACITY_SCALE_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_BLEND_MODE_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
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
