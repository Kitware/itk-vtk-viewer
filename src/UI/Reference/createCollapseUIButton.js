import style from './ItkVtkViewer.module.css'

import toggleIcon from '../Icons/toggle.svg'
import applyContrastSensitiveStyleToElement from './applyContrastSensitiveStyleToElement'

function createCollapseUIButton(context) {
  const collapseUIButton = document.createElement('div')
  collapseUIButton.className = `${style.collapseUIButton}`
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    collapseUIButton
  )

  collapseUIButton.id = `${context.id}-collapseUIButton`
  collapseUIButton.innerHTML = `${toggleIcon}`

  collapseUIButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_UI_COLLAPSED')
  })

  context.main.collapseUIButton = collapseUIButton
  context.uiContainer.appendChild(collapseUIButton)
}

export default createCollapseUIButton
