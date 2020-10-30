import { Machine, forwardTo } from 'xstate'

import createMainUIMachine from './createMainUIMachine'

function createUIMachine(options, context) {
  console.log('options', options)
  const { main } = options
  console.log('main options', main)
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
