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
            },
            {
              id: 'rendering',
              src: renderingMachine,
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
            TOGGLE_UI_DARK_MODE: {
              actions: forwardTo('ui'),
            },
            TOGGLE_UI_COLLAPSED: {
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
