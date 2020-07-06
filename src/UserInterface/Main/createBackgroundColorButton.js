import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'
import toggleBackgroundColor from '../../Rendering/Main/toggleBackgroundColor'

import selectColorIcon from '../icons/select-color.svg'

function createBackgroundColorButton(store, mainUIRow) {
  const viewerDOMId = store.id
  const bgColorButton = document.createElement('div')
  bgColorButton.innerHTML = `<input id="${viewerDOMId}-bgColorButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Toggle Background Color" class="${style.bgColorButton} ${style.toggleButton}" for="${viewerDOMId}-bgColorButton">${selectColorIcon}</label>`
  const bgColorButtonLabel = bgColorButton.children[1]
  applyContrastSensitiveStyle(store, 'invertibleButton', bgColorButtonLabel)
  bgColorButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    toggleBackgroundColor(store)
  })
  bgColorButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    toggleBackgroundColor(store)
  })
  mainUIRow.appendChild(bgColorButton)
}

export default createBackgroundColorButton
