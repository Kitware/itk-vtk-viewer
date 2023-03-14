import { Machine, assign, spawn, send, actions } from 'xstate'
import { makeTransitions } from './makeTransitions'

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
            createImageRenderingActor(options, context, name),
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

const forwardToNamedActor = send((_, e) => e, {
  to: (c, e) => `imageRenderingActor-${e.name ?? e.data.name}`,
})

const sendEventToAllActors = actions.pure(
  ({ images: { imageRenderingActors } }, event) =>
    Array.from(imageRenderingActors.values()).map(actor =>
      send(event, {
        to: actor,
      })
    )
)

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
          invoke: {
            id: 'cameraModifiedWatcher',
            src: context => send =>
              context.itkVtkView
                .getRenderer()
                .getActiveCamera()
                .onModified(() => send('CAMERA_MODIFIED')).unsubscribe, // return cleanup func
          },
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
                to: c => `imageRenderingActor-${c.images.updateRenderedName}`,
              }),
            },
            SET_IMAGE_SCALE: {
              actions: send((_, e) => e, {
                to: c => `imageRenderingActor-${c.images.updateRenderedName}`,
              }),
            },
            SET_CINEMATIC_PARAMETERS: {
              actions: send((_, e) => e, {
                to: c => `imageRenderingActor-${c.images.selectedName}`,
              }),
            },
            CINEMATIC_CHANGED: {
              actions: send((_, e) => e, {
                to: c => `imageRenderingActor-${c.images.selectedName}`,
              }),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: c => `imageRenderingActor-${c.images.selectedName}`,
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
            IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED: {
              actions: send((_, e) => e, {
                to: (c, e) => `imageRenderingActor-${e.data.name}`,
              }),
            },
            IMAGE_COLOR_RANGE_BOUNDS_CHANGED: {
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
            ...makeTransitions(
              [
                'IMAGE_GRADIENT_OPACITY_CHANGED',
                'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
                'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
                'IMAGE_BLEND_MODE_CHANGED',
                'UPDATE_IMAGE_HISTOGRAM',
                'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
                'LABEL_IMAGE_BLEND_CHANGED',
                'LABEL_IMAGE_WEIGHTS_CHANGED',
                'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
                'LABEL_IMAGE_LABEL_NAMES_CHANGED',
                'COMPARE_IMAGES',
                'WINDOW_LEVEL_TOGGLED',
                'IMAGE_COLOR_RANGE_RESET',
              ],
              { actions: forwardToNamedActor }
            ),
            ...makeTransitions(
              ['CROPPING_PLANES_CHANGED_BY_USER', 'CAMERA_MODIFIED'],
              { actions: sendEventToAllActors }
            ),
          },
        },
      },
    },
    options
  )
}

export default createImagesRenderingMachine
