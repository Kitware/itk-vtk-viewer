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
              actions: [forwardTo('rendering'), forwardTo('eventEmitter')],
            },
            TOGGLE_BACKGROUND_COLOR: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            SET_UNITS: {
              actions: [forwardTo('rendering')],
            },
            TOGGLE_DARK_MODE: {
              actions: forwardTo('ui'),
            },
            TOGGLE_UI_COLLAPSED: {
              actions: [forwardTo('ui'), forwardTo('eventEmitter')],
            },
            TOGGLE_FULLSCREEN: {
              actions: [forwardTo('ui'), forwardTo('eventEmitter')],
            },
            DISABLE_FULLSCREEN: {
              actions: forwardTo('ui'),
            },
            TAKE_SCREENSHOT: {
              actions: forwardTo('rendering'),
            },
            TOGGLE_ROTATE: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            TOGGLE_ANNOTATIONS: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            TOGGLE_AXES: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            TOGGLE_INTERPOLATION: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            VIEW_MODE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            RESET_CAMERA: {
              actions: forwardTo('rendering'),
            },
            SELECT_LAYER: {
              actions: forwardTo('ui'),
            },
            TOGGLE_LAYER_VISIBILITY: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            ADD_IMAGE: {
              actions: forwardTo('ui'),
            },
            IMAGE_ASSIGNED: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
            },
            RENDER: {
              actions: forwardTo('rendering'),
            },
          },
        },
      },
    },
    options
  )
}

export default createViewerMachine
