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
            actions: [],
          },
        },
        active: {
          entry: [() => console.log('enter UI Machine')],
          invoke: [
            {
              id: 'main',
              src: mainMachine,
            },
          ],
          on: {},
        },
      },
    },
    options
  )
}

export default createUIMachine
