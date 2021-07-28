import macro from '@kitware/vtk.js/macro'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import gradientOpacityIcon from '.././Icons/gradient.svg'

function createGradientOpacitySlider(context, uiContainer) {
  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top-fullscreen itk-vtk-tooltip-content="Gradient opacity scale" class="${style.gradientOpacitySlider}">
      ${gradientOpacityIcon}
    </div>
    <div class="${style.gradientOpacityScale}" style="display: none;">
      <input type="range" min="0" max="0.99" value="0.5" step="0.01" id="${context.id}-gradientOpacityScaleSlider" />
    </div>

    <input type="range" min="0" max="1" value="0.2" step="0.01" orient="vertical"
      id="${context.id}-gradientOpacitySlider"
      class="${style.slider}" />`
  const sliderEntryDiv = sliderEntry.children[0]
  const gradientOpacityScaleDiv = sliderEntry.children[1]
  const gradientOpacityScaleSlider = gradientOpacityScaleDiv.children[0]
  const gradientOpacitySlider = sliderEntry.children[2]
  context.images.sliderEntryDiv = sliderEntryDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    sliderEntryDiv
  )
  context.images.gradientOpacitySlider = gradientOpacitySlider
  context.images.gradientOpacityScaleSlider = gradientOpacityScaleSlider

  sliderEntryDiv.addEventListener('click', event => {
    if (gradientOpacityScaleDiv.style.display === 'none') {
      gradientOpacityScaleDiv.style.display = 'block'
    } else {
      gradientOpacityScaleDiv.style.display = 'none'
    }
  })

  gradientOpacitySlider.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: {
        name: context.images.selectedName,
        gradientOpacity: Number(gradientOpacitySlider.value),
      },
    })
  })

  gradientOpacityScaleSlider.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
      data: {
        name: context.images.selectedName,
        gradientOpacityScale: Number(gradientOpacityScaleSlider.value),
      },
    })
  })

  uiContainer.appendChild(sliderEntry)
}

export default createGradientOpacitySlider
