import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { blendModeIconDataUri } from '@itk-viewer/icons'

function createBlendModeSelector(context, uiContainer) {
  const blendModeEntry = document.createElement('div')
  blendModeEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Blend mode"
      class="${style.blendModeButton}">
      <img src="${blendModeIconDataUri}" alt="blend mode" />
    </div>
    `
  const blendModeDiv = blendModeEntry.children[0]
  context.images.blendModeDiv = blendModeDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    blendModeDiv
  )
  uiContainer.appendChild(blendModeEntry)

  const blendModeSelector = document.createElement('select')
  blendModeSelector.setAttribute('class', style.selector)
  blendModeSelector.id = `${context.id}-colorMapSelector`
  blendModeSelector.innerHTML = `<option selected value="0">Composite</option>
    <option value="1">Maximum</option>
    <option value="2">Minimum</option>
    <option value="3">Average</option>`
  blendModeEntry.appendChild(blendModeSelector)
  context.images.blendModeSelector = blendModeSelector

  blendModeSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    let mode = 'blendmode'
    switch (parseInt(event.target.value)) {
      case 0:
        mode = 'Composite'
        break
      case 1:
        mode = 'Maximum'
        break
      case 2:
        mode = 'Minimum'
        break
      case 3:
        mode = 'Average'
        break
    }
    context.service.send({
      type: 'IMAGE_BLEND_MODE_CHANGED',
      data: {
        name: context.images.selectedName,
        blendMode: mode,
      },
    })
  })

  uiContainer.appendChild(blendModeSelector)
}

export default createBlendModeSelector
