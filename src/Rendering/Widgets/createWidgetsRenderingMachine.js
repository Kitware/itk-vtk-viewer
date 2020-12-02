import { Machine, assign, spawn, send } from 'xstate'

function createWidgetsRenderingMachine(options, context) {
  return Machine(
    {
      id: 'widgetsRendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: 'createWidgets',
          },
        },
        active: {
          on: {
            TOGGLE_DISTANCE_WIDGET: {
              actions: 'toggleDistanceWidget',
            },
          },
        },
      },
    },
    options
  )
}

export default createWidgetsRenderingMachine
