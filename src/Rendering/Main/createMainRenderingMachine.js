import { Machine, sendParent, send } from 'xstate'

import backgroundIsDark from './backgroundIsDark'
import backgroundIsLight from './backgroundIsLight'

function createMainRenderingMachine(options, context) {
  let initialViewMode = 'volumeRendering'
  switch (context.main.viewMode) {
    case 'XPlane':
      initialViewMode = 'xPlane'
      break
    case 'YPlane':
      initialViewMode = 'yPlane'
      break
    case 'ZPlane':
      initialViewMode = 'zPlane'
      break
    case 'VolumeRendering':
      initialViewMode = 'volumeRendering'
      break
    default:
      throw new Error(`Invalid initial view mode: ${context.main.viewMode}`)
  }

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
            SET_BACKGROUND_COLOR: {
              actions: [
                'setBackgroundColor',
                send('CHECK_BACKGROUND_CONTRAST'),
              ],
            },
            TOGGLE_BACKGROUND_COLOR: {
              actions: 'toggleBackgroundColor',
            },
            SET_UNITS: {
              actions: 'setUnits',
            },
            RESET_CAMERA: {
              actions: 'resetCamera',
            },
          },
          states: {
            background: {
              initial: backgroundIsLight(context) ? 'light' : 'dark',
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
            viewMode: {
              initial: initialViewMode,
              states: {
                xPlane: {
                  entry: 'viewModeXPlane',
                },
                yPlane: {
                  entry: 'viewModeYPlane',
                },
                zPlane: {
                  entry: 'viewModeZPlane',
                },
                volumeRendering: {
                  entry: 'viewModeVolumeRendering',
                },
              },
              on: {
                VIEW_MODE_CHANGED: [
                  { target: '.xPlane', cond: (c, e) => e.data === 'XPlane' },
                  { target: '.yPlane', cond: (c, e) => e.data === 'YPlane' },
                  { target: '.zPlane', cond: (c, e) => e.data === 'ZPlane' },
                  {
                    target: '.volumeRendering',
                    cond: (c, e) => e.data === 'VolumeRendering',
                  },
                ],
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
