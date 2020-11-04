import { Machine, forwardTo } from 'xstate'

import createMainUIMachine from './createMainUIMachine'

function createUIMachine(options, context) {
  const { main } = options
  const mainMachine = createMainUIMachine(main, context)
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
          ],
          on: {
            TOGGLE_ANNOTATIONS: {
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
          },
          states: {
            // Optional feature of the user interface
            uiCollapsed: {
              initial: 'disabled',
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
