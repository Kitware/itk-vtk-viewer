import { createTransferFunctionEditor } from './createTransferFunctionEditor'
import style from '../ItkVtkViewer.module.css'

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
