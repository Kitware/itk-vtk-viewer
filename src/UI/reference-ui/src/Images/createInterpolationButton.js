import style from '../ItkVtkViewer.module.css'

import interpolationIcon from '.././Icons/interpolation.svg'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import toggleInterpolation from './toggleInterpolation'

function createInterpolationButton(context, uiRow) {
  const interpolationButton = document.createElement('div')
  // Todo: send event to disable interpolation when label maps added
  //if (context.images.labelMaps.length) {
  //context.images.interpolationEnabled = false
  //}
  // and the "input" element needs to get the 'disabled' attribute added
  interpolationButton.innerHTML = `<input id="${context.id}-toggleInterpolationButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Interpolation" class="${style.interpolationButton} ${style.toggleButton}" for="${context.id}-toggleInterpolationButton">${interpolationIcon}</label>`
  const interpolationButtonInput = interpolationButton.children[0]
  const interpolationButtonLabel = interpolationButton.children[1]
  context.images.interpolationButtonLabel = interpolationButtonLabel
  context.images.interpolationButtonInput = interpolationButtonInput

  toggleInterpolation(context, { data: context.images.selectedName })

  interpolationButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: context.images.selectedName,
    })
  })

  uiRow.appendChild(interpolationButton)
}

export default createInterpolationButton
