import macro from '@kitware/vtk.js/macro'
import vtkImageCroppingRegionsWidget from '@kitware/vtk.js/Interaction/Widgets/ImageCroppingRegionsWidget'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import cropIcon from '.././Icons/crop.svg'
import resetCropIcon from '.././Icons/reset-crop.svg'
import toggleCroppingPlanes from './toggleCroppingPlanes'

function createCroppingButtons(context, mainUIRow) {
  const viewerDOMId = context.id

  const cropButton = document.createElement('div')
  cropButton.innerHTML = `<input id="${viewerDOMId}-toggleCroppingPlanesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Cropping planes [w]" class="${style.cropButton} ${style.toggleButton}" for="${viewerDOMId}-toggleCroppingPlanesButton">${cropIcon}</label>`
  const cropButtonInput = cropButton.children[0]
  const cropButtonLabel = cropButton.children[1]

  context.main.cropButtonLabel = cropButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    cropButtonLabel
  )

  context.main.cropButtonInput = cropButtonInput
  toggleCroppingPlanes(context)

  cropButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('TOGGLE_CROPPING_PLANES')
  })
  mainUIRow.appendChild(cropButton)

  const resetCropButton = document.createElement('div')
  resetCropButton.innerHTML = `<input id="${viewerDOMId}-resetCroppingPlanesButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Reset cropping planes [e]" class="${style.resetCropButton} ${style.toggleButton}" for="${viewerDOMId}-resetCroppingPlanesButton">${resetCropIcon}</label>`
  const resetCropButtonLabel = resetCropButton.children[1]

  context.main.resetCropButtonLabel = resetCropButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    resetCropButtonLabel
  )

  resetCropButton.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CROPPING_PLANES')
  })
  resetCropButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send('RESET_CROPPING_PLANES')
  })
  mainUIRow.appendChild(resetCropButton)
}

export default createCroppingButtons
