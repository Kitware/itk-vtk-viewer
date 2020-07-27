import { autorun } from 'mobx'

import style from '../ItkVtkViewer.module.css'

import axesIcon from '../icons/axes.svg'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

function createAxesButton(store, mainUIRow) {
  const axesButton = document.createElement('div')
  axesButton.innerHTML = `<input id="${store.id}-toggleAxesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-axes itk-vtk-tooltip-content="Axes" class="${style.axesButton} ${style.toggleButton}" for="${store.id}-toggleAxesButton">${axesIcon}</label>`
  const axesButtonInput = axesButton.children[0]
  const axesButtonLabel = axesButton.children[1]
  applyContrastSensitiveStyle(store, 'invertibleButton', axesButtonLabel)
  function toggleAxes() {
    const axesEnabled = store.mainUI.axesEnabled
    axesButtonInput.checked = axesEnabled
    store.itkVtkView.setEnableAxes(axesEnabled)
  }
  autorun(() => {
    toggleAxes()
  })
  axesButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    store.mainUI.axesEnabled = !store.mainUI.axesEnabled
  })
  mainUIRow.appendChild(axesButton)
}

export default createAxesButton
