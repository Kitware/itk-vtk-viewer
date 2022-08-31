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
            actions: [
              'createRenderingViewContainers',
              'styleRenderingViewContainers',
            ],
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
            STYLE_RENDERING_VIEW_CONTAINER: {
              actions: 'styleRenderingViewContainers',
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
              actions: [forwardTo('rendering'), forwardTo('eventEmitter')],
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
            TOGGLE_CROPPING_PLANES: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            RESET_CROPPING_PLANES: {
              actions: [forwardTo('rendering'), forwardTo('eventEmitter')],
            },
            CROPPING_PLANES_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            CROPPING_PLANES_CHANGED_BY_USER: {
              actions: forwardTo('rendering'),
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
            SLICING_PLANES_CHANGED: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
            },
            X_SLICE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            Y_SLICE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            Z_SLICE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            SELECT_LAYER: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
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
            UPDATE_RENDERED_IMAGE: {
              actions: [forwardTo('rendering')],
            },
            RENDERED_IMAGE_ASSIGNED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_RENDERING_ACTIVE: {
              actions: forwardTo('ui'),
            },
            ADD_LABEL_IMAGE: {
              actions: forwardTo('ui'),
            },
            LABEL_IMAGE_ASSIGNED: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
            },
            SELECT_IMAGE_COMPONENT: {
              actions: forwardTo('ui'),
            },
            TOGGLE_IMAGE_INTERPOLATION: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_COMPONENT_VISIBILITY_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED: {
              actions: [forwardTo('ui'), forwardTo('eventEmitter')],
            },
            IMAGE_PIECEWISE_FUNCTION_CHANGED: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
            },
            IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED: {
              actions: [forwardTo('ui'), forwardTo('eventEmitter')],
            },
            IMAGE_PIECEWISE_FUNCTION_POINTS_SET: {
              actions: forwardTo('ui'),
            },
            IMAGE_COLOR_RANGE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_COLOR_RANGE_BOUNDS_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_COLOR_MAP_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            TOGGLE_IMAGE_SHADOW: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_GRADIENT_OPACITY_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_GRADIENT_OPACITY_SCALE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            IMAGE_BLEND_MODE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            UPDATE_IMAGE_HISTOGRAM: {
              actions: [forwardTo('rendering')],
            },
            IMAGE_HISTOGRAM_UPDATED: {
              actions: [forwardTo('ui')],
            },
            LABEL_IMAGE_LOOKUP_TABLE_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            LABEL_IMAGE_BLEND_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            LABEL_IMAGE_WEIGHTS_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            LABEL_IMAGE_LABEL_NAMES_CHANGED: {
              actions: [
                forwardTo('ui'),
                forwardTo('rendering'),
                forwardTo('eventEmitter'),
              ],
            },
            LABEL_IMAGE_SELECTED_LABEL_CHANGED: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
            },
            RENDER: {
              actions: forwardTo('rendering'),
            },
            UPDATE_FPS: {
              actions: forwardTo('rendering'),
            },
            FPS_UPDATED: {
              actions: forwardTo('rendering'),
            },
            SET_IMAGE_SCALE: {
              actions: forwardTo('rendering'),
            },
            REQUEST_ANIMATION: {
              actions: forwardTo('rendering'),
            },
            CANCEL_ANIMATION: {
              actions: forwardTo('rendering'),
            },
            TOGGLE_DISTANCE_WIDGET: {
              actions: [forwardTo('ui'), forwardTo('rendering')],
            },
            DISTANCE_WIDGET_VALUE_CHANGED: {
              actions: [forwardTo('ui')],
            },
            SCREENSHOT_TAKEN: {
              actions: [forwardTo('eventEmitter')],
            },
          },
        },
      },
    },
    options
  )
}

export default createViewerMachine
