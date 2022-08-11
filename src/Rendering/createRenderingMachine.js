import { Machine, forwardTo, sendParent, send } from 'xstate'

import createMainRenderingMachine from './Main/createMainRenderingMachine'
import createLayersRenderingMachine from './Layers/createLayersRenderingMachine'
import createImagesRenderingMachine from './Images/createImagesRenderingMachine'
import createWidgetsRenderingMachine from './Widgets/createWidgetsRenderingMachine'

const createRenderingMachine = (options, context) => {
  const { main, layers, images, widgets } = options
  const mainMachine = createMainRenderingMachine(main, context)
  const layersMachine = createLayersRenderingMachine(layers, context)
  const imagesMachine = createImagesRenderingMachine(images, context)
  const widgetsMachine = createWidgetsRenderingMachine(widgets, context)
  return Machine(
    {
      id: 'rendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createRenderer'],
          },
        },
        active: {
          invoke: [
            {
              id: 'main',
              src: mainMachine,
            },
            {
              id: 'layers',
              src: layersMachine,
            },
            {
              id: 'images',
              src: imagesMachine,
            },
            {
              id: 'widgets',
              src: widgetsMachine,
            },
          ],
          on: {
            BACKGROUND_TURNED_LIGHT: {
              actions: sendParent('TOGGLE_DARK_MODE'),
            },
            BACKGROUND_TURNED_DARK: {
              actions: sendParent('TOGGLE_DARK_MODE'),
            },
            RENDER: {
              actions: 'render',
            },
            UPDATE_FPS: {
              actions: forwardTo('main'),
            },
            FPS_UPDATED: {
              actions: [forwardTo('main'), forwardTo('images')],
            },
            SET_IMAGE_SCALE: {
              actions: [forwardTo('images')],
            },
            REQUEST_ANIMATION: {
              actions: 'requestAnimation',
            },
            CANCEL_ANIMATION: {
              actions: 'cancelAnimation',
            },
            SET_BACKGROUND_COLOR: {
              actions: forwardTo('main'),
            },
            TOGGLE_BACKGROUND_COLOR: {
              actions: forwardTo('main'),
            },
            SET_UNITS: {
              actions: forwardTo('main'),
            },
            TAKE_SCREENSHOT: {
              actions: forwardTo('main'),
            },
            TOGGLE_ROTATE: {
              actions: forwardTo('main'),
            },
            TOGGLE_ANNOTATIONS: {
              actions: forwardTo('main'),
            },
            TOGGLE_AXES: {
              actions: forwardTo('main'),
            },
            TOGGLE_CROPPING_PLANES: {
              actions: forwardTo('main'),
            },
            RESET_CROPPING_PLANES: {
              actions: forwardTo('main'),
            },
            CROPPING_PLANES_CHANGED: {
              actions: forwardTo('main'),
            },
            CROPPING_PLANES_CHANGED_BY_USER: {
              actions: forwardTo('images'),
            },
            VIEW_MODE_CHANGED: {
              actions: forwardTo('main'),
            },
            SLICING_PLANES_CHANGED: {
              actions: forwardTo('main'),
            },
            X_SLICE_CHANGED: {
              actions: forwardTo('main'),
            },
            Y_SLICE_CHANGED: {
              actions: forwardTo('main'),
            },
            Z_SLICE_CHANGED: {
              actions: forwardTo('main'),
            },
            RESET_CAMERA: {
              actions: forwardTo('main'),
            },
            SELECT_LAYER: {
              actions: forwardTo('images'),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: send((_, e) => e, {
                to: (c, e) => {
                  switch (c.layers.actorContext.get(e.data).type) {
                    case 'image':
                      return 'images'
                    case 'labelImage':
                      return 'images'
                    default:
                      console.error(`Unsupported layer type for ${e.data}`)
                  }
                },
              }),
            },
            IMAGE_ASSIGNED: {
              actions: forwardTo('images'),
            },
            UPDATE_RENDERED_IMAGE: {
              actions: forwardTo('images'),
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: forwardTo('images'),
            },
            TOGGLE_IMAGE_INTERPOLATION: {
              actions: forwardTo('images'),
            },
            IMAGE_COLOR_RANGE_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_COLOR_MAP_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_COMPONENT_VISIBILITY_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_PIECEWISE_FUNCTION_CHANGED: {
              actions: forwardTo('images'),
            },
            TOGGLE_IMAGE_SHADOW: {
              actions: forwardTo('images'),
            },
            IMAGE_GRADIENT_OPACITY_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_GRADIENT_OPACITY_SCALE_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_BLEND_MODE_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_HISTOGRAM_UPDATED: {
              actions: forwardTo('images'),
            },
            LABEL_IMAGE_ASSIGNED: {
              actions: forwardTo('images'),
            },
            TOGGLE_DISTANCE_WIDGET: {
              actions: forwardTo('widgets'),
            },
            LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
              actions: forwardTo('images'),
            },
            LABEL_IMAGE_BLEND_CHANGED: {
              actions: forwardTo('images'),
            },
            LABEL_IMAGE_WEIGHTS_CHANGED: {
              actions: forwardTo('images'),
            },
            LABEL_IMAGE_LABEL_NAMES_CHANGED: {
              actions: forwardTo('images'),
            },
            LABEL_IMAGE_SELECTED_LABEL_CHANGED: {
              actions: forwardTo('images'),
            },
          },
        },
      },
    },
    options
  )
}

export default createRenderingMachine
