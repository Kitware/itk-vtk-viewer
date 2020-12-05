import macro from 'vtk.js/Sources/macro'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import gradientOpacityIcon from '../../Icons/gradient.svg'

function createGradientOpacitySlider(context, uiContainer) {
  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Gradient opacity" class="${style.gradientOpacitySlider}">
      ${gradientOpacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.2" step="0.01"
      id="${context.id}-gradientOpacitySlider"
      class="${style.slider}" />`
  const gradientOpacityElement = sliderEntry.querySelector(
    `#${context.id}-gradientOpacitySlider`
  )
  const sliderEntryDiv = sliderEntry.children[0]
  context.images.sliderEntryDiv = sliderEntryDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    sliderEntryDiv
  )
  context.images.gradientOpacityElement = gradientOpacityElement

  gradientOpacityElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: {
        name: context.images.selectedName,
        gradientOpacity: Number(gradientOpacityElement.value),
      },
    })
  })
  uiContainer.appendChild(sliderEntry)
}

export default createGradientOpacitySlider
