import { Machine, assign, sendParent, send } from 'xstate'

import backgroundIsDark from './backgroundIsDark'
import backgroundIsLight from './backgroundIsLight'

const assignFps = assign({
  main: (context, event) => {
    const main = context.main
    main.fps = event.data
    return main
  },
})

const eventToAxis = {
  X_SLICE_CHANGED: 'x',
  Y_SLICE_CHANGED: 'y',
  Z_SLICE_CHANGED: 'z',
}

const assignSlicePosition = assign({
  main: ({ main }, { type, data: position }) => {
    main.slicingPlanes[eventToAxis[type]].position = position
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
            RESET_CROPPING_PLANES: {
              actions: 'resetCroppingPlanes',
            },
            CROPPING_PLANES_CHANGED: {
              actions: ['applyCroppingPlanes', 'updateSlicingPlanes'],
            },
            SLICING_PLANES_CHANGED: {
              actions: 'applySlicingPlanes',
            },
            X_SLICE_CHANGED: {
              actions: [assignSlicePosition, 'applyXSlice'],
            },
            Y_SLICE_CHANGED: {
              actions: [assignSlicePosition, 'applyYSlice'],
            },
            Z_SLICE_CHANGED: {
              actions: [assignSlicePosition, 'applyZSlice'],
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
            croppingPlanes: {
              initial: context.main.croppingPlanesEnabled
                ? 'enabled'
                : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleCroppingPlanes',
                  on: {
                    TOGGLE_CROPPING_PLANES: 'disabled',
                  },
                },
                disabled: {
                  entry: 'toggleCroppingPlanes',
                  on: {
                    TOGGLE_CROPPING_PLANES: 'enabled',
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
