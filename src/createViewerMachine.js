import { Machine } from 'xstate'
import createRenderingMachine from './Rendering/createRenderingMachine'

const createViewerMachine = (options, context = {}) => {
  return Machine(
    {
      id: 'viewer',
      strict: true,
      initial: 'idle',
      context,
      states: {
        idle: {
          always: 'active',
        },
        active: {},
      },
    },
    options
  )
}

export default createViewerMachine
