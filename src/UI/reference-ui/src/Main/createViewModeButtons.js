import style from '../ItkVtkViewer.module.css'

import {
  volumeIconDataUri,
  xPlaneIconDataUri,
  yPlaneIconDataUri,
  zPlaneIconDataUri,
} from '../../../icons/dist/index.js'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function createViewModeButtons(context, mainRow) {
  const viewerDOMId = context.id

  const xPlaneButton = document.createElement('div')
  context.main.xPlaneButton = xPlaneButton
  xPlaneButton.innerHTML = `<input id="${viewerDOMId}-xPlaneButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="X plane [1]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-xPlaneButton"><img src="${xPlaneIconDataUri}" alt="x plane"/></label>`
  const xPlaneButtonLabel = xPlaneButton.children[1]
  context.main.xPlaneButtonLabel = xPlaneButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    xPlaneButtonLabel
  )
  xPlaneButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'VIEW_MODE_CHANGED', data: 'XPlane' })
  })
  mainRow.appendChild(xPlaneButton)

  const yPlaneButton = document.createElement('div')
  context.main.yPlaneButton = yPlaneButton
  yPlaneButton.innerHTML = `<input id="${viewerDOMId}-yPlaneButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Y plane [2]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-yPlaneButton"><img src="${yPlaneIconDataUri}" alt="y plane" /></label>`
  const yPlaneButtonLabel = yPlaneButton.children[1]
  context.main.yPlaneButtonLabel = yPlaneButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    yPlaneButtonLabel
  )
  yPlaneButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'VIEW_MODE_CHANGED', data: 'YPlane' })
  })
  mainRow.appendChild(yPlaneButton)

  const zPlaneButton = document.createElement('div')
  context.main.zPlaneButton = zPlaneButton
  zPlaneButton.innerHTML = `<input id="${viewerDOMId}-zPlaneButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Z plane [3]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-zPlaneButton"><img src="${zPlaneIconDataUri}" alt="z plane" /></label>`
  const zPlaneButtonLabel = zPlaneButton.children[1]
  context.main.zPlaneButtonLabel = zPlaneButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    zPlaneButtonLabel
  )
  zPlaneButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'VIEW_MODE_CHANGED', data: 'ZPlane' })
  })
  mainRow.appendChild(zPlaneButton)

  const volumeButton = document.createElement('div')
  context.main.volumeButton = volumeButton
  volumeButton.innerHTML = `<input id="${viewerDOMId}-volumeButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume [4]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-volumeButton"><img src="${volumeIconDataUri}" alt="volume" /></label>`
  const volumeButtonLabel = volumeButton.children[1]
  context.main.volumeButtonLabel = volumeButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    volumeButtonLabel
  )
  volumeButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'VIEW_MODE_CHANGED', data: 'Volume' })
  })
  mainRow.appendChild(volumeButton)
}

export default createViewModeButtons
