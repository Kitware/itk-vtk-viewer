import { Machine, forwardTo } from 'xstate'

import createMainRenderingMachine from './createMainRenderingMachine'

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
          entry: [() => console.log('enter Rendering Machine')],
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
          },
        },
      },
    },
    options
  )
}

export default createRenderingMachine
