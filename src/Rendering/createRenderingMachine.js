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
            RENDER: {
              actions: 'render',
            },
            SET_BACKGROUND_COLOR: {
              actions: forwardTo('main'),
            },
            BACKGROUND_TURNED_LIGHT: {
              actions: sendParent('TOGGLE_UI_DARK_MODE'),
            },
            BACKGROUND_TURNED_DARK: {
              actions: sendParent('TOGGLE_UI_DARK_MODE'),
            },
          },
        },
      },
    },
    options
  )
}

export default createRenderingMachine
