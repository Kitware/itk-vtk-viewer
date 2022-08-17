import { throttle } from '@kitware/vtk.js/macros'
import {
  TransferFunctionEditor,
  windowPointsForSort,
} from 'itk-viewer-transfer-function-editor'

const PIECEWISE_UPDATE_DELAY = 100

export const getNodes = (range, points) => {
  const delta = range[1] - range[0]
  const windowedPoints = windowPointsForSort(points)
  return windowedPoints.map(([x, y]) => ({
    x: range[0] + delta * x,
    y,
    midpoint: 0.5,
    sharpness: 0,
  }))
}

// grab head and tail or fallback to data range if 1 or less points
const getRange = (dataRange, nodes) =>
  nodes.length > 1 ? [nodes[0].x, nodes[nodes.length - 1].x] : dataRange

const updateContextPiecewiseFunction = (context, dataRange, points) => {
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
    },
  })

  const nodes = getNodes(dataRange, points)
  const range = getRange(dataRange, nodes)
  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
    data: {
      name,
      component,
      range,
      nodes,
    },
  })
}

const vtkPiecewiseGaussianWidgetFacade = (tfEditor, context) => {
  let dataRange = [0, 255]

  const update = () =>
    updateContextPiecewiseFunction(context, dataRange, tfEditor.getPoints())

  const throttledUpdate = throttle(update, PIECEWISE_UPDATE_DELAY)
  tfEditor.eventTarget.addEventListener('updated', throttledUpdate)

  const getOpacityNodes = (range = dataRange) =>
    getNodes(range, tfEditor.getPoints())

  const getOpacityRange = (range = dataRange) =>
    getRange(range, getOpacityNodes(range))

  return {
    setColorTransferFunction: tf => {
      tfEditor.setColorTransferFunction(tf)
    },

    setPoints(points) {
      tfEditor.setPoints(points)
      updateContextPiecewiseFunction(context, dataRange, points)
    },

    getPoints() {
      return tfEditor.getPoints()
    },

    setRangeZoom: newRange => {
      tfEditor.setViewBox(...newRange)
    },

    setDataRange: newRange => {
      dataRange = [...newRange]
    },

    getOpacityNodes,
    getOpacityRange,
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
