import { Machine, assign } from 'xstate'

const assignDistanceEnabled = assign({
  widgets: (context, event) => {
    const widgets = context.widgets
    widgets.distanceEnabled = !widgets.distanceEnabled
    return widgets
  },
})

const assignDistanceWidgetValue = assign({
  widgets: (context, event) => {
    const widgets = context.widgets
    widgets.distanceValue = event.data
    return widgets
  },
})

function createWidgetsUIMachine(options, context) {
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
  console.log('initial ', initialViewMode)

  return Machine(
    {
      id: 'widgets',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createWidgetsInterface'],
          },
        },
        active: {
          type: 'parallel',
          on: {
            DISTANCE_WIDGET_VALUE_CHANGED: {
              actions: [assignDistanceWidgetValue, 'applyDistanceWidgetValue'],
            },
          },
          states: {
            distanceWidget: {
              initial: context.widgets.distanceEnabled ? 'enabled' : 'disabled',
              states: {
                enabled: {
                  entry: 'toggleDistanceWidget',
                  on: {
                    TOGGLE_DISTANCE_WIDGET: {
                      target: 'disabled',
                      actions: [assignDistanceEnabled, 'toggleDistanceWidget'],
                    },
                  },
                },
                disabled: {
                  entry: 'toggleDistanceWidget',
                  on: {
                    TOGGLE_DISTANCE_WIDGET: {
                      target: 'enabled',
                      actions: [assignDistanceEnabled, 'toggleDistanceWidget'],
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
                  },
                  {
                    target: '.yPlane',
                    cond: (c, e) => e.data === 'YPlane',
                  },
                  {
                    target: '.zPlane',
                    cond: (c, e) => e.data === 'ZPlane',
                  },
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

export default createWidgetsUIMachine
