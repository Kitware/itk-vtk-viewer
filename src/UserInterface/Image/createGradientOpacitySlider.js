import { autorun, action } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import gradientOpacityIcon from '../icons/gradient.svg'

function createGradientOpacitySlider(store, uiContainer) {
  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Gradient opacity" class="${style.gradientOpacitySlider}">
      ${gradientOpacityIcon}
    </div>
    <input type="range" min="0" max="1" value="0.2" step="0.01"
      id="${store.id}-gradientOpacitySlider"
      class="${style.slider}" />`
  const edgeElement = sliderEntry.querySelector(
    `#${store.id}-gradientOpacitySlider`
  )
  const sliderEntryDiv = sliderEntry.children[0]
  applyContrastSensitiveStyle(store, 'invertibleButton', sliderEntryDiv)

  function updateGradientOpacity() {
    const gradientOpacity = store.imageUI.gradientOpacity
    edgeElement.value = gradientOpacity
    store.imageUI.representationProxy.setEdgeGradient(gradientOpacity)
    store.renderWindow.render()
  }
  autorun(() => {
    updateGradientOpacity()
  })
  edgeElement.addEventListener(
    'input',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.imageUI.gradientOpacity = Number(edgeElement.value)
    })
  )
  uiContainer.appendChild(sliderEntry)
}

export default createGradientOpacitySlider
