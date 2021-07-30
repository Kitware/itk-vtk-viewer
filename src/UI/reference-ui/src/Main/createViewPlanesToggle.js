import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { viewPlanesIconDataUri } from '../../../icons/dist/index.js'

function createViewPlanesToggle(context, volumeRow) {
  const viewerDOMId = context.id

  const viewPlanesButton = document.createElement('div')
  viewPlanesButton.innerHTML = `<input id="${viewerDOMId}-toggleSlicingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-axes itk-vtk-tooltip-content="View planes [s]" class="${style.viewPlanesButton} ${style.toggleButton}" for="${viewerDOMId}-toggleSlicingPlanesButton"><img src="${viewPlanesIconDataUri}" alt="view planes" /></label>`
  const viewPlanesButtonInput = viewPlanesButton.children[0]
  const viewPlanesButtonLabel = viewPlanesButton.children[1]
  context.main.viewPlanesButton = viewPlanesButton
  context.main.viewPlanesButtonLabel = viewPlanesButtonLabel
  context.main.viewPlanesButtonInput = viewPlanesButtonInput
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    viewPlanesButtonLabel
  )

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
