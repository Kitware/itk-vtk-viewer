import { Machine } from 'xstate'
import createRenderingMachine from './Rendering/createRenderingMachine'
import createUIMachine from './UI/createUIMachine'

const createViewerMachine = (options, context) => {
  const { uiOptions, renderingOptions } = options
  const renderingMachine = createRenderingMachine(renderingOptions, context)
  const uiMachine = createUIMachine(uiOptions, context)
  return Machine(
    {
      id: 'viewer',
      strict: true,
      initial: 'active',
      context,
      states: {
        active: {
          invoke: [
            {
              id: 'ui',
              src: uiMachine,
              autoForward: true,
            },
            {
              id: 'rendering',
              src: renderingMachine,
              autoForward: true,
            },
          ],
        },
      },
    },
    options
  )
}

export default createViewerMachine
