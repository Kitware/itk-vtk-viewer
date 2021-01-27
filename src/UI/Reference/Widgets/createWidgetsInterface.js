import style from '../ItkVtkViewer.module.css'

import createDistanceWidget from './createDistanceWidget'

function createWidgetsInterface(context) {
  const widgetsUIGroup = document.createElement('div')
  widgetsUIGroup.setAttribute('class', style.uiGroup)
  context.widgets.widgetsUIGroup = widgetsUIGroup
  context.uiGroups.set('widgets', widgetsUIGroup)

  createDistanceWidget(context, widgetsUIGroup)

  context.uiContainer.appendChild(widgetsUIGroup)
}

export default createWidgetsInterface
