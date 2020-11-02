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
                  exit: 'toggleUICollapsed',
                  on: {
                    TOGGLE_COLLAPSED: 'disabled',
                  },
                },
                disabled: {
                  exit: 'toggleUICollapsed',
                  on: {
                    TOGGLE_COLLAPSED: 'enabled',
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
