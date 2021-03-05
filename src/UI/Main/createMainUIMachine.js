import { Machine, assign } from 'xstate'

const assignFullscreenEnabled = assign({
  main: (context, event) => {
    const main = context.main
    main.fullscreenEnabled = !main.fullscreenEnabled
    return main
  },
})

const assignAnnotationsEnabled = assign({
  main: (context, event) => {
    const main = context.main
    main.annotationsEnabled = !main.annotationsEnabled
    return main
  },
})

const assignRotateEnabled = assign({
  main: (context, event) => {
    const main = context.main
    main.rotateEnabled = !main.rotateEnabled
    return main
  },
})

const assignAxesEnabled = assign({
  main: (context, event) => {
    const main = context.main
    main.axesEnabled = !main.axesEnabled
    return main
  },
})

const assignCroppingPlanesEnabled = assign({
  main: (context, event) => {
    const main = context.main
    main.croppingPlanesEnabled = !main.croppingPlanesEnabled
    return main
  },
})

const assignViewMode = assign({
  main: (context, event) => {
    const main = context.main
    main.viewMode = event.data
    return main
  },
})

const assignSlicingPlanes = assign({
  main: (context, event) => {
    const main = context.main
    main.slicingPlanes = event.data
    return main
  },
})

const assignXSlice = assign({
  main: (context, event) => {
    const main = context.main
    main.xSlice = event.data
    return main
  },
})

const assignYSlice = assign({
  main: (context, event) => {
    const main = context.main
    main.ySlice = event.data
    return main
  },
})

const assignZSlice = assign({
  main: (context, event) => {
    const main = context.main
    main.zSlice = event.data
    return main
  },
})

function createMainUIMachine(options, context) {
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
            actions: ['createMainInterface'],
          },
        },
        active: {
          type: 'parallel',
          on: {
            TOGGLE_BACKGROUND_COLOR: {
              actions: 'toggleBackgroundColor',
            },
            SLICING_PLANES_CHANGED: {
              actions: [assignSlicingPlanes, 'applySlicingPlanes'],
            },
            X_SLICE_CHANGED: {
              actions: [assignXSlice, 'applyXSlice'],
            },
            Y_SLICE_CHANGED: {
              actions: [assignYSlice, 'applyYSlice'],
            },
            Z_SLICE_CHANGED: {
              actions: [assignZSlice, 'applyZSlice'],
            },
          },
          states: {
            fullscreen: {
              initial: context.fullscreenEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  exit: 'toggleFullscreen',
                  on: {
                    TOGGLE_FULLSCREEN: {
                      target: 'disabled',
                      actions: assignFullscreenEnabled,
                    },
                    DISABLE_FULLSCREEN: {
                      target: 'disabled',
                      actions: assignFullscreenEnabled,
                    },
                  },
                },
                disabled: {
                  exit: 'toggleFullscreen',
                  on: {
                    TOGGLE_FULLSCREEN: {
                      target: 'enabled',
                      actions: assignFullscreenEnabled,
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
                    TOGGLE_ANNOTATIONS: {
                      target: 'disabled',
                      actions: assignAnnotationsEnabled,
                    },
                  },
                },
                disabled: {
                  entry: 'toggleAnnotations',
                  on: {
                    TOGGLE_ANNOTATIONS: {
                      target: 'enabled',
                      actions: assignAnnotationsEnabled,
                    },
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
                    TOGGLE_ROTATE: {
                      target: 'disabled',
                      actions: assignRotateEnabled,
                    },
                  },
                },
                disabled: {
                  entry: 'toggleRotate',
                  on: {
                    TOGGLE_ROTATE: {
                      target: 'enabled',
                      actions: assignRotateEnabled,
                    },
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
                    TOGGLE_AXES: {
                      target: 'disabled',
                      actions: assignAxesEnabled,
                    },
                  },
                },
                disabled: {
                  entry: 'toggleAxes',
                  on: {
                    TOGGLE_AXES: {
                      target: 'enabled',
                      actions: assignAxesEnabled,
                    },
                  },
                },
              },
            },
            axes: {
              initial: context.axesEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleCroppingPlanes',
                  on: {
                    TOGGLE_CROPPING_PLANES: {
                      target: 'disabled',
                      actions: assignCroppingPlanesEnabled,
                    },
                  },
                },
                disabled: {
                  entry: 'toggleCroppingPlanes',
                  on: {
                    TOGGLE_CROPPING_PLANES: {
                      target: 'enabled',
                      actions: assignCroppingPlanesEnabled,
                    },
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
                  {
                    target: '.xPlane',
                    cond: (c, e) => e.data === 'XPlane',
                    actions: assignViewMode,
                  },
                  {
                    target: '.yPlane',
                    cond: (c, e) => e.data === 'YPlane',
                    actions: assignViewMode,
                  },
                  {
                    target: '.zPlane',
                    cond: (c, e) => e.data === 'ZPlane',
                    actions: assignViewMode,
                  },
                  {
                    target: '.volume',
                    cond: (c, e) => e.data === 'Volume',
                    actions: assignViewMode,
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

export default createMainUIMachine
