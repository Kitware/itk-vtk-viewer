import { forwardTo, Machine } from 'xstate'
import createRenderingMachine from './Rendering/createRenderingMachine'
import createUIMachine from './UI/createUIMachine'

const createViewerMachine = (options, context, eventEmitterCallback) => {
  const { ui, rendering } = options
  const renderingMachine = createRenderingMachine(rendering, context)
  const uiMachine = createUIMachine(ui, context)

  return Machine(
    {
      id: 'viewer',
      strict: true,
      initial: 'idle',
      context,
      states: {
        idle: {
          always: {
            target: 'active',
            actions: ['createContainer', 'styleContainer'],
          },
        },
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
            {
              id: 'eventEmitter',
              src: eventEmitterCallback,
            },
          ],
          on: {
            STYLE_CONTAINER: {
              actions: 'styleContainer',
            },
            SET_BACKGROUND_COLOR: {
              actions: forwardTo('eventEmitter'),
            },
            UI_DARK_MODE: {
              actions: forwardTo('ui'),
            },
            UI_LIGHT_MODE: {
              actions: forwardTo('ui'),
            },
          },
        },
      },
    },
    options
  )
}

export default createViewerMachine
