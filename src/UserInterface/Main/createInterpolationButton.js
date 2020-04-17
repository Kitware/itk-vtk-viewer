import { when, autorun } from 'mobx'

import style from '../ItkVtkViewer.module.css'

import interpolationIcon from '../icons/interpolation.svg'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

function createInterpolationButton(store, mainUIRow) {
  const interpolationButton = document.createElement('div')
  if (!!store.imageUI.labelMap) {
    store.mainUI.interpolationEnabled = false
  }
  interpolationButton.innerHTML = `<input id="${
    store.id
  }-toggleInterpolationButton" type="checkbox" class="${style.toggleInput}" ${
    store.mainUI.interpolationEnabled ? 'checked' : ''
  } ${
    !!store.imageUI.labelMap ? 'disabled' : ''
  }><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Interpolation" class="${
    style.interpolationButton
  } ${style.toggleButton}" for="${
    store.id
  }-toggleInterpolationButton">${interpolationIcon}</label>`
  const interpolationButtonLabel = interpolationButton.children[1]
  applyContrastSensitiveStyle(
    store,
    'invertibleButton',
    interpolationButtonLabel
  )
  function toggleInterpolation() {
    const interpolationEnabled = store.mainUI.interpolationEnabled
    interpolationButton.checked = interpolationEnabled
    store.itkVtkView.setPlanesUseLinearInterpolation(interpolationEnabled)
  }
  autorun(() => {
    toggleInterpolation()
  })
  interpolationButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    store.mainUI.interpolationEnabled = !store.mainUI.interpolationEnabled
  })
  mainUIRow.appendChild(interpolationButton)

  if (!!!store.imageUI.representationProxy) {
    interpolationButton.style.display = 'none'
    when(
      () => !!store.imageUI.image,
      () => (interpolationButton.style.display = 'inline')
    )
    when(
      () => !!store.imageUI.representationProxy,
      () => toggleInterpolation()
    )
  }
}

export default createInterpolationButton
