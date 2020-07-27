import { reaction, action } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import macro from 'vtk.js/Sources/macro'
import sampleDistanceIcon from 'vtk.js/Sources/Interaction/UI/Icons/Spacing.svg'

import updateVolumeSampleDistance from '../../Rendering/updateVolumeSampleDistance'

function createSampleDistanceSlider(store, uiContainer) {
  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Volume sample distance" class="${style.sampleDistanceButton}">
      ${sampleDistanceIcon}
    </div>
    <input type="range" min="0" max="1" value="0.25" step="0.01"
      class="${style.slider} ${store.id}-spacing" />`
  const spacingElement = sliderEntry.querySelector(`.${store.id}-spacing`)
  const spacingDiv = sliderEntry.children[0]
  applyContrastSensitiveStyle(store, 'invertibleButton', spacingDiv)

  reaction(
    () => {
      return store.imageUI.volumeSampleDistance
    },
    macro.throttle(() => {
      spacingElement.value = store.imageUI.volumeSampleDistance
      updateVolumeSampleDistance(store)
    }, 20)
  )

  function updateSpacing() {
    const value = Number(spacingElement.value)
    store.imageUI.representationProxy.setSampleDistance(value)
    store.renderWindow.render()
  }

  spacingElement.addEventListener(
    'input',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      store.imageUI.volumeSampleDistance = Number(spacingElement.value)
    })
  )
  uiContainer.appendChild(sliderEntry)
}

export default createSampleDistanceSlider
