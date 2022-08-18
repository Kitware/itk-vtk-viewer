import vtkMouseRangeManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseRangeManipulator'
import { createTransferFunctionEditor } from './createTransferFunctionEditor'
import style from '../ItkVtkViewer.module.css'

const MIN_WIDTH = 1e-8

const createTransferFunctionWidget = (context, imagesUIGroup) => {
  const piecewiseWidgetContainer = document.createElement('div')
  piecewiseWidgetContainer.setAttribute('style', 'height: 150px; width: 400px')
  piecewiseWidgetContainer.setAttribute('class', style.piecewiseWidget)

  const transferFunctionWidgetRow = document.createElement('div')
  transferFunctionWidgetRow.setAttribute('class', style.uiRow)
  // This row needs background different from normal uiRows, to aid
  // in the illusion that it's the content portion of a tabbed pane
  transferFunctionWidgetRow.setAttribute(
    'style',
    'background: rgba(127, 127, 127, 0.5);'
  )
  imagesUIGroup.appendChild(transferFunctionWidgetRow)
  transferFunctionWidgetRow.appendChild(piecewiseWidgetContainer)

  const transferFunctionWidget = createTransferFunctionEditor(
    context,
    piecewiseWidgetContainer
  )

  context.images.transferFunctionWidget = transferFunctionWidget

  // lookupTableProxies used elsewhere
  if (typeof context.images.lookupTableProxies === 'undefined') {
    context.images.lookupTableProxies = new Map()
  }

  const getXMinMax = () => {
    const xPositions = transferFunctionWidget.getPoints().map(([x]) => x)
    return { min: Math.min(...xPositions), max: Math.max(...xPositions) }
  }

  const windowGet = () => {
    const { min, max } = getXMinMax()
    const width = max - min
    return width
  }

  const windowSet = newWidth => {
    const { min, max } = getXMinMax()
    const width = max - min || MIN_WIDTH
    const newMin = (min + max) / 2 - newWidth / 2

    const newPoints = transferFunctionWidget
      .getPoints()
      // normalize in old range, then scale to new range
      .map(([x, y]) => [((x - min) / width) * newWidth + newMin, y])
    transferFunctionWidget.setPoints(newPoints)
  }

  const levelGet = () => {
    const { min, max } = getXMinMax()
    return (min + max) / 2
  }

  const levelSet = newLevel => {
    const oldLevel = levelGet()
    const delta = newLevel - oldLevel
    const newPoints = transferFunctionWidget
      .getPoints()
      // normalize in old range, then scale to new range
      .map(([x, y]) => [x + delta, y])
    transferFunctionWidget.setPoints(newPoints)
  }

  // Create range manipulator
  const rangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 1,
    alt: true,
  })

  context.images.transferFunctionManipulator = {
    rangeManipulator,
    windowGet,
    windowSet,
    levelGet,
    levelSet,
  }

  const pwfRangeManipulator = vtkMouseRangeManipulator.newInstance({
    button: 3, // Right mouse
    alt: true,
  })
  const pwfRangeManipulatorShift = vtkMouseRangeManipulator.newInstance({
    button: 1, // Left mouse
    shift: true, // For the macOS folks
    alt: true,
  })

  const pwfGet = () => {
    const opacities = transferFunctionWidget.getPoints().map(([, y]) => y)
    return Math.max(...opacities)
  }
  const pwfSet = newMaxOpacity => {
    const oldMax = pwfGet()
    const delta = newMaxOpacity - oldMax
    const newPoints = transferFunctionWidget
      .getPoints()
      .map(([x, y]) => [x, Math.min(y + delta, 1)])
    transferFunctionWidget.setPoints(newPoints)
  }
  // max as 1.01 not 1.0 to allow for squishing of low function points if a point is already at 1
  pwfRangeManipulator.setVerticalListener(0, 1.01, 0.01, pwfGet, pwfSet)
  pwfRangeManipulatorShift.setVerticalListener(0, 1.01, 0.01, pwfGet, pwfSet)
  ;[rangeManipulator, pwfRangeManipulator, pwfRangeManipulatorShift].forEach(
    m => {
      context.itkVtkView.getInteractorStyle2D().addMouseManipulator(m)
      context.itkVtkView.getInteractorStyle3D().addMouseManipulator(m)
    }
  )
}

export default createTransferFunctionWidget

export const applyPiecewiseFunctionPointsToEditor = (context, event) => {
  const { transferFunctionWidget, actorContext } = context.images
  const { points, component, name } = event.data
  const imageActorContext = actorContext.get(name)
  if (component === imageActorContext.selectedComponent) {
    transferFunctionWidget.setPoints(points)
  }
}
