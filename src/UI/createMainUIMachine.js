import { Machine } from 'xstate'

function createMainUIMachine(options, context) {
  return Machine(
    {
      id: 'main',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createMainInterface'],
          },
        },
        active: {
          type: 'parallel',
          states: {
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
            annotations: {
              initial: 'enabled',
              states: {
                enabled: {
                  exit: 'toggleAnnotations',
                  on: {
                    TOGGLE_ANNOTATIONS: 'disabled',
                  },
                },
                disabled: {
                  exit: 'toggleAnnotations',
                  on: {
                    TOGGLE_ANNOTATIONS: 'enabled',
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

export default createMainUIMachine
