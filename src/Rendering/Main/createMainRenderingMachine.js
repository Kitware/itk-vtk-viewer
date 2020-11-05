import { Machine, sendParent, send } from 'xstate'

import backgroundIsDark from './backgroundIsDark'
import backgroundIsLight from './backgroundIsLight'

function createMainRenderingMachine(options, context) {
  return Machine(
    {
      id: 'main',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
          },
        },
        active: {
          entry: ['setBackgroundColor', 'setUnits'],
          type: 'parallel',
          on: {
            TAKE_SCREENSHOT: {
              actions: 'takeScreenshot',
            },
          },
          on: {
            SET_BACKGROUND_COLOR: {
              actions: [
                'setBackgroundColor',
                send('CHECK_BACKGROUND_CONTRAST'),
              ],
            },
            SET_UNITS: {
              actions: 'setUnits',
            },
          },
          states: {
            background: {
              initial: 'light',
              states: {
                dark: {
                  entry: [
                    context => (context.uiDarkMode = true),
                    sendParent('BACKGROUND_TURNED_DARK'),
                  ],
                  on: {
                    CHECK_BACKGROUND_CONTRAST: {
                      target: ['light'],
                      cond: backgroundIsLight,
                    },
                  },
                },
                light: {
                  entry: [
                    context => (context.uiDarkMode = false),
                    sendParent('BACKGROUND_TURNED_LIGHT'),
                  ],
                  on: {
                    CHECK_BACKGROUND_CONTRAST: {
                      target: ['dark'],
                      cond: backgroundIsDark,
                    },
                  },
                },
              },
            },
            annotations: {
              initial: 'enabled',
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
              initial: 'disabled',
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
              initial: 'disabled',
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
              initial: 'enabled',
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

export default createMainRenderingMachine
