import { autorun, action } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import viewPlansIcon from '../icons/view-planes.svg'

function createViewPlanesToggle(
  store,
  imageUIGroup,
  volumeRenderingRow,
  uiContainer
) {
  const viewerDOMId = store.id

  const viewPlanesButton = document.createElement('div')
  viewPlanesButton.innerHTML = `<input id="${viewerDOMId}-toggleSlicingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotation itk-vtk-tooltip-content="View planes [s]" class="${style.viewPlanesButton} ${style.toggleButton}" for="${viewerDOMId}-toggleSlicingPlanesButton">${viewPlansIcon}</label>`
  const viewPlanesButtonInput = viewPlanesButton.children[0]
  const viewPlanesButtonLabel = viewPlanesButton.children[1]
  applyContrastSensitiveStyle(store, 'tooltipButton', viewPlanesButtonLabel)
  function setViewPlanes() {
    const viewPlanes = store.imageUI.slicingPlanesEnabled
    viewPlanesButtonInput.checked = viewPlanes
    store.itkVtkView.setViewPlanes(viewPlanes)
    const xPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-x-plane-row`)
    const yPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-y-plane-row`)
    const zPlaneRow = uiContainer.querySelector(`.${viewerDOMId}-z-plane-row`)
    if (store.itkVtkView.getViewMode() === 'VolumeRendering') {
      if (viewPlanes) {
        xPlaneRow.style.display = 'flex'
        yPlaneRow.style.display = 'flex'
        zPlaneRow.style.display = 'flex'
      } else {
        xPlaneRow.style.display = 'none'
        yPlaneRow.style.display = 'none'
        zPlaneRow.style.display = 'none'
      }
    }
  }
  autorun(() => {
    setViewPlanes()
  })
  viewPlanesButton.addEventListener(
    'change',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.imageUI.slicingPlanesEnabled = !store.imageUI.slicingPlanesEnabled
    })
  )
  volumeRenderingRow.appendChild(viewPlanesButton)
}

export default createViewPlanesToggle
