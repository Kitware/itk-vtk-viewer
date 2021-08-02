import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { lengthToolIconDataUri } from 'itk-viewer-icons'

function createDistanceWidget(context, widgetsUIGroup) {
  const viewerDOMId = context.id

  // Put distance tools in their own row
  const distanceRulerRow = document.createElement('div')
  distanceRulerRow.setAttribute('class', style.uiRow)
  distanceRulerRow.style.display = context.use2D ? 'flex' : 'none'
  if (context.main.viewMode === 'Volume' && !context.use2D) {
    distanceRulerRow.style.display = 'none'
  } else {
    distanceRulerRow.style.display = 'flex'
  }

  const distanceEntry = document.createElement('div')
  distanceEntry.setAttribute('class', style.distanceEntry)

  const distanceButton = document.createElement('span')
  distanceButton.innerHTML = `<input id="${viewerDOMId}-toggleDistanceButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Length" class="${style.distanceButton} ${style.toggleButton}" for="${viewerDOMId}-toggleDistanceButton"><img src="${lengthToolIconDataUri}" alt="distance"/></label>`
  context.widgets.distanceButtonInput = distanceButton.children[0]
  context.widgets.distanceButtonInput.checked = context.widgets.distanceEnabled
  const distanceButtonLabel = distanceButton.children[1]
  context.widgets.distanceButtonLabel = distanceButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    distanceButtonLabel
  )

  distanceButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_DISTANCE_WIDGET')
  })

  distanceEntry.appendChild(distanceButton)

  const distanceLabel = document.createElement('label')
  distanceLabel.setAttribute('class', `${style.distanceLabelCommon}`)
  context.widgets.distanceLabel = distanceLabel
  applyContrastSensitiveStyleToElement(context, 'distanceLabel', distanceLabel)
  distanceLabel.setAttribute('for', `${viewerDOMId}-distanceValue`)
  distanceLabel.id = `${viewerDOMId}-distanceLabel`
  distanceLabel.innerText = 'Length:'
  distanceEntry.appendChild(distanceLabel)

  const distanceValue = document.createElement('input')
  distanceValue.type = 'text'
  distanceValue.setAttribute('class', style.distanceInput)
  distanceValue.id = `${viewerDOMId}-distanceValue`
  distanceValue.setAttribute('name', 'length')
  distanceValue.setAttribute('value', context.widgets.distanceValue.toString())
  distanceValue.setAttribute('disabled', true)
  context.widgets.distanceValueElement = distanceValue
  distanceEntry.appendChild(distanceValue)

  context.widgets.distanceRulerRow = distanceRulerRow
  distanceRulerRow.appendChild(distanceEntry)

  widgetsUIGroup.appendChild(distanceRulerRow)
}

export default createDistanceWidget
