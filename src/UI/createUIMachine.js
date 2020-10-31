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
            UI_DARK_MODE: {
              actions: forwardTo('main'),
            },
            UI_LIGHT_MODE: {
              actions: forwardTo('main'),
            },
          },
          states: {
            // Optional feature of the user interface
            uiCollapsed: {
              initial: 'disabled',
              states: {
                enabled: {
                  on: {
                    TOGGLE_UI: 'disabled',
                  },
                },
                disabled: {
                  on: {
                    TOGGLE_UI: 'enabled',
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
