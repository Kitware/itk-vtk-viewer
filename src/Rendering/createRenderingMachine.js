import { Machine, forwardTo, sendParent } from 'xstate'

import createMainRenderingMachine from './Main/createMainRenderingMachine'

const createRenderingMachine = (options, context) => {
  const { main } = options
  const mainMachine = createMainRenderingMachine(main, context)
  return Machine(
    {
      id: 'rendering',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createRenderer'],
          },
        },
        active: {
          invoke: [
            {
              id: 'main',
              src: mainMachine,
            },
          ],
          on: {
            BACKGROUND_TURNED_LIGHT: {
              actions: sendParent('TOGGLE_DARK_MODE'),
            },
            BACKGROUND_TURNED_DARK: {
              actions: sendParent('TOGGLE_DARK_MODE'),
            },
            RENDER: {
              actions: 'render',
            },
            SET_BACKGROUND_COLOR: {
              actions: forwardTo('main'),
            },
            SET_UNITS: {
              actions: forwardTo('main'),
            },
            TAKE_SCREENSHOT: {
              actions: forwardTo('main'),
            },
            TOGGLE_ROTATE: {
              actions: forwardTo('main'),
            },
            TOGGLE_ANNOTATIONS: {
              actions: forwardTo('main'),
            },
            TOGGLE_AXES: {
              actions: forwardTo('main'),
            },
            TOGGLE_INTERPOLATION: {
              actions: forwardTo('main'),
            },
          },
        },
      },
    },
    options
  )
}

export default createRenderingMachine
