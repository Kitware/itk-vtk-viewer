import { Machine } from 'xstate'

const createUIMachine = (options, context) => {
  return Machine(
    {
      id: 'ui',
      strict: true,
      initial: 'idle',
      context,
      states: {
        idle: {
          always: 'active',
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
