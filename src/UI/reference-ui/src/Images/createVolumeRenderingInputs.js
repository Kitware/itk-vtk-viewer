import style from '../ItkVtkViewer.module.css'

import createShadowToggle from './createShadowToggle'
import createGradientOpacitySlider from './createGradientOpacitySlider'
import createSampleDistanceSlider from './createSampleDistanceSlider'
import createBlendModeSelector from './createBlendModeSelector'
import { createCinematicParameters } from './cinematic'

function createVolumeRenderingInputs(context, imagesUIGroup) {
  const volumeRow1 = document.createElement('div')
  volumeRow1.setAttribute('class', style.uiRow)
  createShadowToggle(context, volumeRow1)
  createGradientOpacitySlider(context, volumeRow1)
  imagesUIGroup.appendChild(volumeRow1)
  context.images.volumeRow1 = volumeRow1

  const volumeRow2 = document.createElement('div')
  volumeRow2.setAttribute('class', style.uiRow)
  createSampleDistanceSlider(context, volumeRow2)
  createBlendModeSelector(context, volumeRow2)
  imagesUIGroup.appendChild(volumeRow2)

  context.images.volumeUiElements = [volumeRow1, volumeRow2]

  createCinematicParameters(context, imagesUIGroup)
}

export default createVolumeRenderingInputs
