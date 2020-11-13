import { Machine, forwardTo } from 'xstate'

import createMainUIMachine from './Main/createMainUIMachine'
import createLayersUIMachine from './Layers/createLayersUIMachine'
import createImagesUIMachine from './Images/createImagesUIMachine'

function createUIMachine(options, context) {
  const { main, layers, images } = options
  const mainMachine = createMainUIMachine(main, context)
  const layersMachine = createLayersUIMachine(layers, context)
  const imagesMachine = createImagesUIMachine(images, context)
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
          ],
          on: {
            TOGGLE_BACKGROUND_COLOR: {
              actions: forwardTo('main'),
            },
            TOGGLE_DARK_MODE: {
              actions: 'applyContrastSensitiveStyle',
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
            TOGGLE_INTERPOLATION: {
              actions: forwardTo('main'),
            },
            VIEW_MODE_CHANGED: {
              actions: forwardTo('main'),
            },
            SELECT_LAYER: {
              actions: forwardTo('layers'),
            },
            ADD_IMAGE: {
              actions: forwardTo('layers'),
            },
            IMAGE_ASSIGNED: {
              actions: [forwardTo('layers'), forwardTo('images')],
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
                    TOGGLE_UI_COLLAPSED: 'disabled',
                  },
                },
                disabled: {
                  entry: 'toggleUICollapsed',
                  on: {
                    TOGGLE_UI_COLLAPSED: 'enabled',
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
