import macro from 'vtk.js/Sources/macro'

import style from '../ItkVtkViewer.module.css'

function createLabelMapWeightWidget(context) {
  const viewerDOMId = context.id

  const labelImageWeightUIGroup = document.createElement('div')
  context.images.labelImageWeightUIGroup = labelImageWeightUIGroup
  labelImageWeightUIGroup.setAttribute('class', style.uiGroup)
  context.uiGroups.set('labelImageWeights', labelImageWeightUIGroup)

  const labelImageWidgetRow = document.createElement('div')
  labelImageWidgetRow.setAttribute('class', style.uiRow)

  const uniqueLabelSelectorDiv = document.createElement('div')
  uniqueLabelSelectorDiv.id = `${context.id}-labelImageUniqueLabelSelector`

  const labelSelector = document.createElement('select')
  labelSelector.setAttribute('class', style.selector)
  labelSelector.id = `${context.id}-labelSelector`
  context.images.labelSelector = labelSelector

  context.images.labelSelector = labelSelector
  uniqueLabelSelectorDiv.appendChild(labelSelector)

  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  // <input type="range" min="0" max="1" value="${context.images.labelImageWeights[0]}" step="0.05" id="${context.id}-labelImageWeightSlider" class="${style.slider}" />`
  sliderEntry.innerHTML = `
    <input type="range" min="0" max="1" value="1.0" step="0.05" id="${context.id}-labelImageWeightSlider" class="${style.slider}" />`
  const weightElement = sliderEntry.querySelector(
    `#${context.id}-labelImageWeightSlider`
  )
  context.images.labelImageWeightSlider = weightElement

  labelImageWidgetRow.appendChild(uniqueLabelSelectorDiv)
  labelImageWidgetRow.appendChild(sliderEntry)

  labelImageWeightUIGroup.appendChild(labelImageWidgetRow)
  context.uiContainer.appendChild(labelImageWeightUIGroup)

  labelSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
      data: {
        name: context.images.selectedName,
        selectedLabel: event.target.value,
      },
    })
  })

  weightElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    const name = context.images.selectedName
    const actorContext = context.images.actorContext.get(name)
    const labelImageWeights = actorContext.labelImageWeights

    if (actorContext.selectedLabel === 'all') {
      const weight = Number(weightElement.value)
      for (const label of labelImageWeights.keys()) {
        labelImageWeights.set(label, weight)
      }
      actorContext.labelImageToggleWeight = weight
    } else {
      labelImageWeights.set(
        actorContext.selectedLabel,
        Number(weightElement.value)
      )
    }
    context.service.send({
      type: 'LABEL_IMAGE_WEIGHTS_CHANGED',
      data: { name: context.images.selectedName, labelImageWeights },
    })
  })
}

export default createLabelMapWeightWidget
