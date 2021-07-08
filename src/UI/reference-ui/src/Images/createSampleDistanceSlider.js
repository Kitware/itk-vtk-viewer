import macro from '@thewtex/vtk.js-esm/macro'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import sampleDistanceIcon from '.././Icons/sample-distance.svg'

function createSampleDistanceSlider(context, uiContainer) {
  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top-screenshot itk-vtk-tooltip-content="Volume sample distance" class="${style.sampleDistanceButton}">
      ${sampleDistanceIcon}
    </div>
    <input type="range" min="0" max="1" value="0.25" step="0.01"
      class="${style.slider} ${context.id}-spacing" />`
  const spacingElement = sliderEntry.querySelector(`.${context.id}-spacing`)
  const spacingDiv = sliderEntry.children[0]
  context.images.volumeSampleDistanceDiv = spacingDiv
  context.images.volumeSampleDistanceSlider = spacingElement
  applyContrastSensitiveStyleToElement(context, 'invertibleButton', spacingDiv)

  spacingElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
      data: {
        name: context.images.selectedName,
        volumeSampleDistance: Number(spacingElement.value),
      },
    })
  })

  uiContainer.appendChild(sliderEntry)
}

export default createSampleDistanceSlider
