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
              initial: context.fullscreenEnabled ? 'enabled' : 'disabled',
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
              initial: context.annotationsEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleAnnotations',
                  on: {
                    TOGGLE_ANNOTATIONS: 'disabled',
                  },
                },
                disabled: {
                  entry: 'toggleAnnotations',
                  on: {
                    TOGGLE_ANNOTATIONS: 'enabled',
                  },
                },
              },
            },
            rotate: {
              initial: context.rotateEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleRotate',
                  on: {
                    TOGGLE_ROTATE: 'disabled',
                  },
                },
                disabled: {
                  entry: 'toggleRotate',
                  on: {
                    TOGGLE_ROTATE: 'enabled',
                  },
                },
              },
            },
            axes: {
              initial: context.axesEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleAxes',
                  on: {
                    TOGGLE_AXES: 'disabled',
                  },
                },
                disabled: {
                  entry: 'toggleAxes',
                  on: {
                    TOGGLE_AXES: 'enabled',
                  },
                },
              },
            },
            interpolation: {
              initial: context.interpolationEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleInterpolation',
                  on: {
                    TOGGLE_INTERPOLATION: 'disabled',
                  },
                },
                disabled: {
                  entry: 'toggleInterpolation',
                  on: {
                    TOGGLE_INTERPOLATION: 'enabled',
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
