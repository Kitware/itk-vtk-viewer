import { Machine } from 'xstate'

const createUIMachine = (options, context) => {
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
        },
      },
    },
    options
  )
}

export default createUIMachine
