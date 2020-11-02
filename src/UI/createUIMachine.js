import { Machine, forwardTo, assign } from 'xstate'

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
            TOGGLE_DARK_MODE: {
              actions: 'applyContrastSensitiveStyle',
            },
          },
          states: {
            // Optional feature of the user interface
            uiCollapsed: {
              initial: 'disabled',
              states: {
                enabled: {
                  enter: ['toggleUICollapsed', assign({ uiCollapsed: true })],
                  on: {
                    TOGGLE_UI_COLLAPSED: 'disabled',
                  },
                },
                disabled: {
                  enter: ['toggleUICollapsed', assign({ uiCollapsed: false })],
                  on: {
                    TOGGLE_UI_COLLAPSED: 'enabled',
                  },
                },
              },
            },
            fullscreen: {
              initial: 'disabled',
              states: {
                enabled: {
                  exit: 'toggleFullscreen',
                  on: {
                    TOGGLE_FULLSCREEN: 'disabled',
                    DISABLE_FULLSCREEN: 'disabled',
                  },
                },
                disabled: {
                  exit: 'toggleFullscreen',
                  on: {
                    TOGGLE_FULLSCREEN: 'enabled',
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
