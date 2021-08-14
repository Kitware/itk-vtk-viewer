import macro from '@kitware/vtk.js/macro'
import createCategoricalColorIconSelector from '../createCategoricalColorIconSelector'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'

import { opacityIconDataUri } from 'itk-viewer-icons'

function createLabelImageColorWidget(context) {
  const viewerDOMId = context.id

  const labelImageColorUIGroup = document.createElement('div')
  context.images.labelImageColorUIGroup = labelImageColorUIGroup
  labelImageColorUIGroup.setAttribute('class', style.uiGroup)
  context.uiGroups.set('labelImages', labelImageColorUIGroup)

  const labelImageWidgetRow = document.createElement('div')
  labelImageWidgetRow.setAttribute('class', style.uiRow)

  const categoricalColorSelector = document.createElement('div')
  categoricalColorSelector.id = `${context.id}-lookupTableSelector`

  const iconSelector = createCategoricalColorIconSelector(
    categoricalColorSelector
  )
  context.images.labelImageIconSelector = iconSelector

  categoricalColorSelector.addEventListener('changed', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const lut = iconSelector.getSelectedValue()
    context.service.send({
      type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
      data: { name, lookupTable: lut },
    })
  })

  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
  <div itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Label image blend" class="${style.gradientOpacitySlider}">
    <img src="${opacityIconDataUri}" alt="opacity"/>
  </div>
  <input type="range" min="0" max="1" value="0.5" step="0.01"
  id="${context.id}-labelImageBlendSlider"
  class="${style.slider}" />`
  const labelImageBlendSlider = sliderEntry.querySelector(
    `#${context.id}-labelImageBlendSlider`
  )
  context.images.labelImageBlendSlider = labelImageBlendSlider
  const sliderEntryDiv = sliderEntry.children[0]
  context.images.labelImageBlendDiv = sliderEntryDiv
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    sliderEntryDiv
  )
  labelImageBlendSlider.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    context.service.send({
      type: 'LABEL_IMAGE_BLEND_CHANGED',
      data: { name, labelImageBlend: Number(labelImageBlendSlider.value) },
    })
  })

  labelImageWidgetRow.appendChild(categoricalColorSelector)
  labelImageWidgetRow.appendChild(sliderEntry)

  labelImageColorUIGroup.appendChild(labelImageWidgetRow)
  context.uiContainer.appendChild(labelImageColorUIGroup)
}

export default createLabelImageColorWidget
