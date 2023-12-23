import { throttle } from './throttle'
import { TransferFunctionEditor } from 'itk-viewer-transfer-function-editor'

const PIECEWISE_UPDATE_DELAY = 200

const updateContextPiecewiseFunction = (context, points) => {
  if (!context.images.piecewiseFunctions) return // not ready yet

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const component = actorContext.selectedComponent
  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_POINTS_CHANGED',
    data: {
      name,
      component,
      points,
      keepAutoAdjusting: false,
    },
  })
}

const updateContextColorRange = (context, points) => {
  if (!context.images.piecewiseFunctions) return // not ready yet

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const component = actorContext.selectedComponent

  context.service.send({
    type: 'IMAGE_COLOR_RANGE_POINTS_CHANGED',
    data: {
      name,
      component,
      points,
    },
  })
}

const vtkPiecewiseGaussianWidgetFacade = (tfEditor, context) => {
  const throttledUpdate = throttle(
    () => updateContextPiecewiseFunction(context, tfEditor.getPoints()),
    PIECEWISE_UPDATE_DELAY
  )
  tfEditor.eventTarget.addEventListener('updated', throttledUpdate)

  const throttledColorRangeUpdate = throttle(
    () => updateContextColorRange(context, tfEditor.getColorRange()),
    PIECEWISE_UPDATE_DELAY
  )
  tfEditor.eventTarget.addEventListener('colorRange', throttledColorRangeUpdate)

  return {
    setColorTransferFunction: tf => {
      tfEditor.setColorTransferFunction(tf)
    },

    setPoints(points) {
      // tfEditor.setPoints recreates them and they loose their "grabbed" state
      // so ignore events coming down triggered by user dragging points
      const currentPoints = tfEditor.getPoints()
      const arePointsModified =
        points.length !== currentPoints.length ||
        points.some(([newX, newY], idx) => {
          const [oldX, oldY] = currentPoints[idx]
          return newX !== oldX || newY !== oldY
        })
      if (arePointsModified) tfEditor.setPoints(points)
    },

    getPoints() {
      return tfEditor.getPoints()
    },

    setColorRange: newRange => {
      const displayedRange = tfEditor.getColorRange()
      // if same, avoid infinite event loop
      if (displayedRange.some((v, i) => v !== newRange[i])) {
        tfEditor.setColorRange(newRange)
      }
    },

    setRange: range => {
      tfEditor.setRange(range)
    },

    setRangeZoom: newRange => {
      tfEditor.setViewBox(...newRange)
    },

    setHistogram: h => tfEditor.setHistogram(h),
    render: () => undefined,

    getGaussians() {
      console.warn('getGaussians not implemented, use getPoints')
      return []
    },

    setGaussians() {
      console.warn('setGaussians not implemented, use setPoints')
    },
  }
}

export const createTransferFunctionEditor = (context, mount) => {
  const editor = new TransferFunctionEditor(mount)

  return vtkPiecewiseGaussianWidgetFacade(editor, context)
}
