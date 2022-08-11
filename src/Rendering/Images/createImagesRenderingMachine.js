import { Machine, assign, spawn, send, actions } from 'xstate'

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
            FPS_UPDATED: {
              actions: send((_, e) => e, {
                to: (c, e) =>
                  `imageRenderingActor-${c.images.updateRenderedName}`,
              }),
            },
            SET_IMAGE_SCALE: {
              actions: send((_, e) => e, {
                to: c => `imageRenderingActor-${c.images.updateRenderedName}`,
              }),
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${c.images.selectedName}`,
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
            UPDATE_IMAGE_HISTOGRAM: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data}`,
              }),
            },
            LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            LABEL_IMAGE_BLEND_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            LABEL_IMAGE_WEIGHTS_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            LABEL_IMAGE_LABEL_NAMES_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            LABEL_IMAGE_SELECTED_LABEL_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            CROPPING_PLANES_CHANGED_BY_USER: {
              // send to all image actors
              actions: actions.pure(({ images: { imageRenderingActors } }) =>
                Array.from(imageRenderingActors.values()).map(actor =>
                  send('CROPPING_PLANES_CHANGED_BY_USER', {
                    to: actor,
                  })
                )
              ),
            },
          },
        },
      },
    },
    options
  )
}

export default createImagesRenderingMachine
