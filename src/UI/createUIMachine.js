import { Machine, forwardTo } from 'xstate'

import createMainUIMachine from './createMainUIMachine'

function createUIMachine(options, context) {
  const { main } = options
  const mainMachine = createMainUIMachine(main, context)
  return Machine(
    {
      id: 'ui',
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createInterface'],
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
            UI_DARK_MODE: {
              actions: forwardTo('main'),
            },
            UI_LIGHT_MODE: {
              actions: forwardTo('main'),
            },
          },
        },
      },
    },
    options
  )
}

export default createUIMachine
