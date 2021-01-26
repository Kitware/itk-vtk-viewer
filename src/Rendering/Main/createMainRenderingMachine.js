import { Machine, assign, sendParent, send } from 'xstate'

import backgroundIsDark from './backgroundIsDark'
import backgroundIsLight from './backgroundIsLight'

const assignFps = assign({
  main: (context, event) => {
    const main = context.main
    console.log('assigning fps', event.data)
    main.fps = event.data
    return main
  },
})

function createMainRenderingMachine(options, context) {
  let initialViewMode = 'volume'
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
    case 'Volume':
      initialViewMode = 'volume'
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
            UPDATE_FPS: {
              actions: 'updateFps',
            },
            FPS_UPDATED: {
              actions: assignFps,
            },
            SET_BACKGROUND_COLOR: {
              actions: [
                'setBackgroundColor',
                send('CHECK_BACKGROUND_CONTRAST'),
              ],
            },
            TOGGLE_BACKGROUND_COLOR: {
              actions: [
                'setBackgroundColor',
                send('CHECK_BACKGROUND_CONTRAST'),
              ],
            },
            SET_UNITS: {
              actions: 'setUnits',
            },
            RESET_CAMERA: {
              actions: 'resetCamera',
            },
            SLICING_PLANES_CHANGED: {
              actions: 'applySlicingPlanes',
            },
            X_SLICE_CHANGED: {
              actions: 'applyXSlice',
            },
            Y_SLICE_CHANGED: {
              actions: 'applyYSlice',
            },
            Z_SLICE_CHANGED: {
              actions: 'applyZSlice',
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
              initial: context.main.annotationsEnabled ? 'enabled' : 'disabled',
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
              initial: context.main.rotateEnabled ? 'enabled' : 'disabled',
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
              initial: context.main.axesEnabled ? 'enabled' : 'disabled',
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
                volume: {
                  entry: 'viewModeVolume',
                },
              },
              on: {
                VIEW_MODE_CHANGED: [
                  { target: '.xPlane', cond: (c, e) => e.data === 'XPlane' },
                  { target: '.yPlane', cond: (c, e) => e.data === 'YPlane' },
                  { target: '.zPlane', cond: (c, e) => e.data === 'ZPlane' },
                  {
                    target: '.volume',
                    cond: (c, e) => e.data === 'Volume',
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
