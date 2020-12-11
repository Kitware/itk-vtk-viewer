import style from '../ItkVtkViewer.module.css'

import createShadowToggle from './createShadowToggle'
import createGradientOpacitySlider from './createGradientOpacitySlider'

function createVolumeRenderingInputs(context, imagesUIGroup) {
  const viewerDOMId = context.id

  const volumeRow1 = document.createElement('div')
  volumeRow1.setAttribute('class', style.uiRow)
  volumeRow1.className += ` ${viewerDOMId}-volume1 ${viewerDOMId}-collapsible`
  createShadowToggle(context, volumeRow1)
  createGradientOpacitySlider(context, volumeRow1)
  imagesUIGroup.appendChild(volumeRow1)

  const volumeRow2 = document.createElement('div')
  volumeRow2.setAttribute('class', style.uiRow)
  volumeRow2.className += ` ${viewerDOMId}-volume2 ${viewerDOMId}-collapsible`
  //createSampleDistanceSlider(store, volumeRow2)
  //createBlendModeSelector(store, volumeRow2)
  imagesUIGroup.appendChild(volumeRow2)

  context.images.volumeRow1 = volumeRow1
  context.images.volumeRow2 = volumeRow2
}

export default createVolumeRenderingInputs
