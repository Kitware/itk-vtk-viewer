import { Machine } from 'xstate'
import createRenderingMachine from './Rendering/createRenderingMachine'

const createViewerMachine = (options, context) => {
  const { uiOptions, renderingOptions } = options
  const renderingMachine = createRenderingMachine(renderingOptions, context)
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
        active: {
          invoke: {
            id: 'rendering',
            src: renderingMachine,
            autoForward: true,
          },
        },
      },
    },
    options
  )
}

export default createViewerMachine
