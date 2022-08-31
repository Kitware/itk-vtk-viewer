import { Machine, forwardTo, assign } from 'xstate'

import createMainUIMachine from './Main/createMainUIMachine'
import createLayersUIMachine from './Layers/createLayersUIMachine'
import createImagesUIMachine from './Images/createImagesUIMachine'
import createWidgetsUIMachine from './Widgets/createWidgetsUIMachine'

function createUIMachine(options, context) {
  const { main, layers, images, widgets } = options
  const mainMachine = createMainUIMachine(main, context)
  const layersMachine = createLayersUIMachine(layers, context)
  const imagesMachine = createImagesUIMachine(images, context)
  const widgetsMachine = createWidgetsUIMachine(widgets, context)
  return Machine(
    {
      id: 'ui',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createInterface'],
          },
        },
        active: {
          type: 'parallel',
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
            TOGGLE_BACKGROUND_COLOR: {
              actions: forwardTo('main'),
            },
            TOGGLE_DARK_MODE: {
              actions: 'toggleDarkMode',
            },
            TOGGLE_FULLSCREEN: {
              actions: forwardTo('main'),
            },
            DISABLE_FULLSCREEN: {
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
            CROPPING_PLANES_CHANGED: {
              actions: forwardTo('main'),
            },
            VIEW_MODE_CHANGED: {
              actions: [forwardTo('main'), forwardTo('widgets')],
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
            SELECT_LAYER: {
              actions: forwardTo('layers'),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: forwardTo('layers'),
            },
            ADD_IMAGE: {
              actions: forwardTo('layers'),
            },
            IMAGE_ASSIGNED: {
              actions: [forwardTo('images'), forwardTo('widgets')],
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: forwardTo('images'),
            },
            IMAGE_RENDERING_ACTIVE: {
              actions: forwardTo('images'),
            },
            ADD_LABEL_IMAGE: {
              actions: forwardTo('layers'),
            },
            LABEL_IMAGE_ASSIGNED: {
              actions: [forwardTo('images')],
            },
            TOGGLE_IMAGE_INTERPOLATION: {
              actions: forwardTo('images'),
            },
            SELECT_IMAGE_COMPONENT: {
              actions: forwardTo('images'),
            },
            IMAGE_COMPONENT_VISIBILITY_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_PIECEWISE_FUNCTION_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_PIECEWISE_FUNCTION_POINTS_SET: {
              actions: forwardTo('images'),
            },
            IMAGE_COLOR_RANGE_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_COLOR_RANGE_BOUNDS_CHANGED: {
              actions: forwardTo('images'),
            },
            IMAGE_COLOR_MAP_CHANGED: {
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
            TOGGLE_DISTANCE_WIDGET: {
              actions: forwardTo('widgets'),
            },
            DISTANCE_WIDGET_VALUE_CHANGED: {
              actions: forwardTo('widgets'),
            },
          },
          states: {
            // Optional feature of the user interface
            uiCollapsed: {
              initial: context.uiCollapsed ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleUICollapsed',
                  on: {
                    TOGGLE_UI_COLLAPSED: {
                      target: 'disabled',
                    },
                  },
                },
                disabled: {
                  entry: 'toggleUICollapsed',
                  on: {
                    TOGGLE_UI_COLLAPSED: {
                      target: 'enabled',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    options
  )
}

export default createUIMachine
