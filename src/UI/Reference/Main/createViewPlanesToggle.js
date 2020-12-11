import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import viewPlansIcon from '../../Icons/view-planes.svg'

function createViewPlanesToggle(context, volumeRow) {
  const viewerDOMId = context.id

  const viewPlanesButton = document.createElement('div')
  viewPlanesButton.innerHTML = `<input id="${viewerDOMId}-toggleSlicingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-axes itk-vtk-tooltip-content="View planes [s]" class="${style.viewPlanesButton} ${style.toggleButton}" for="${viewerDOMId}-toggleSlicingPlanesButton">${viewPlansIcon}</label>`
  const viewPlanesButtonInput = viewPlanesButton.children[0]
  const viewPlanesButtonLabel = viewPlanesButton.children[1]
  context.main.viewPlanesButtonLabel = viewPlanesButtonLabel
  context.main.viewPlanesButtonInput = viewPlanesButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    viewPlanesButtonLabel
  )
  function setViewPlanes() {
    const viewPlanes = context.imageUI.slicingPlanesEnabled
    context.itkVtkView.setViewPlanes(viewPlanes)
    const xPlaneRow = context.main.xPlaneRow
    const yPlaneRow = context.main.yPlaneRow
    const zPlaneRow = context.main.zPlaneRow
    if (context.itkVtkView.getViewMode() === 'Volume') {
      if (viewPlanes) {
        xPlaneRow.style.display = 'block'
        yPlaneRow.style.display = 'block'
        zPlaneRow.style.display = 'block'
      } else {
        xPlaneRow.style.display = 'none'
        yPlaneRow.style.display = 'none'
        zPlaneRow.style.display = 'none'
      }
    }
  }
  viewPlanesButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    if (
      !slicingPlanes.x.visibile &&
      !slicingPlanes.y.visible &&
      !slicingPlanes.z.visible
    ) {
      slicingPlanes.x.visible = true
      slicingPlanes.y.visible = true
      slicingPlanes.z.visible = true
      context.service.send({
        type: 'SLICING_PLANES_CHANGED',
        data: slicingPlanes,
      })
    } else {
      slicingPlanes.x.visible = false
      slicingPlanes.y.visible = false
      slicingPlanes.z.visible = false
      context.service.send({
        type: 'SLICING_PLANES_CHANGED',
        data: slicingPlanes,
      })
    }
  })
  volumeRow.appendChild(viewPlanesButton)
}

export default createViewPlanesToggle
