import { autorun } from 'mobx'

import style from '../ItkVtkViewer.module.css'

import rotateIcon from '../icons/rotate.svg'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

function createRotateButton(store, mainUIRow) {
  const rotateButton = document.createElement('div')
  rotateButton.innerHTML = `<input id="${store.id}-toggleRotateButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-fullscreen itk-vtk-tooltip-content="Spin in 3D [p]" class="${style.rotateButton} ${style.toggleButton}" for="${store.id}-toggleRotateButton">${rotateIcon}</label>`
  const rotateButtonInput = rotateButton.children[0]
  const rotateButtonLabel = rotateButton.children[1]
  applyContrastSensitiveStyle(store, 'invertibleButton', rotateButtonLabel)
  function toggleRotate() {
    const rotateEnabled = store.mainUI.rotateEnabled
    rotateButtonInput.checked = rotateEnabled
    store.itkVtkView.setRotate(rotateEnabled)
  }
  autorun(() => {
    toggleRotate()
  })
  rotateButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    store.mainUI.rotateEnabled = !store.mainUI.rotateEnabled
  })
  mainUIRow.appendChild(rotateButton)
}

export default createRotateButton
