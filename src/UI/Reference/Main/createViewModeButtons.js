import style from '../ItkVtkViewer.module.css'

import volumeRenderingIcon from '../../Icons/volume-rendering.svg'
import xPlaneIcon from '../../Icons/x-plane.svg'
import yPlaneIcon from '../../Icons/y-plane.svg'
import zPlaneIcon from '../../Icons/z-plane.svg'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

function createViewModeButtons(context, mainRow) {
  const viewerDOMId = context.id

  const xPlaneButton = document.createElement('div')
  context.main.xPlaneButton = xPlaneButton
  xPlaneButton.innerHTML = `<input id="${viewerDOMId}-xPlaneButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="X plane [1]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-xPlaneButton">${xPlaneIcon}</label>`
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
  yPlaneButton.innerHTML = `<input id="${viewerDOMId}-yPlaneButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Y plane [2]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-yPlaneButton">${yPlaneIcon}</label>`
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
  zPlaneButton.innerHTML = `<input id="${viewerDOMId}-zPlaneButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Z plane [3]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-zPlaneButton">${zPlaneIcon}</label>`
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

  const volumeRenderingButton = document.createElement('div')
  context.main.volumeRenderingButton = volumeRenderingButton
  volumeRenderingButton.innerHTML = `<input id="${viewerDOMId}-volumeRenderingButton" type="checkbox" class="${style.toggleInput}" checked><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume [4]" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-volumeRenderingButton">${volumeRenderingIcon}</label>`
  const volumeRenderingButtonLabel = volumeRenderingButton.children[1]
  context.main.volumeRenderingButtonLabel = volumeRenderingButtonLabel
  applyContrastSensitiveStyleToElement(
    context,
    'tooltipButton',
    volumeRenderingButtonLabel
  )
  volumeRenderingButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'VIEW_MODE_CHANGED', data: 'VolumeRendering' })
  })
  mainRow.appendChild(volumeRenderingButton)
}

export default createViewModeButtons
