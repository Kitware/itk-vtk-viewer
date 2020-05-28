import { action, reaction } from 'mobx'

import macro from 'vtk.js/Sources/macro'

import updateLabelMapPiecewiseFunction from '../../Rendering/updateLabelMapPiecewiseFunction'
import style from '../ItkVtkViewer.module.css'

function createLabelMapWeightWidget(store, uiContainer) {
  const viewerDOMId = store.id

  const labelMapWeightUIGroup = document.createElement('div')
  store.imageUI.labelMapWeightUIGroup = labelMapWeightUIGroup
  labelMapWeightUIGroup.setAttribute('class', style.uiGroup)

  const labelMapWidgetRow = document.createElement('div')
  labelMapWidgetRow.setAttribute('class', style.uiRow)
  labelMapWidgetRow.className += ` ${viewerDOMId}-toggle`

  const uniqueLabelSelectorDiv = document.createElement('div')
  uniqueLabelSelectorDiv.id = `${store.id}-labelMapUniqueLabelSelector`

  const labelSelector = document.createElement('select')
  labelSelector.setAttribute('class', style.selector)
  labelSelector.id = `${store.id}-labelSelector`

  const uniqueLabels = store.imageUI.labelMapLabels
  const labelMapWeights = store.imageUI.labelMapWeights

  const optionsList = uniqueLabels.map(
    (label, idx) =>
      `<option ${
        idx === store.imageUI.selectedLabel ? 'selected' : ''
      } value="${idx}">${idx}</option>`
  )

  optionsList.unshift('<option value="all">All</option>')

  labelSelector.innerHTML = optionsList.join('')
  uniqueLabelSelectorDiv.appendChild(labelSelector)

  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  // <input type="range" min="0" max="1" value="${store.imageUI.labelMapWeights[0]}" step="0.05" id="${store.id}-labelMapWeightSlider" class="${style.slider}" />`
  sliderEntry.innerHTML = `
    <input type="range" min="0" max="1" value="1.0" step="0.05" id="${store.id}-labelMapWeightSlider" class="${style.slider}" />`
  const weightElement = sliderEntry.querySelector(
    `#${store.id}-labelMapWeightSlider`
  )

  labelMapWidgetRow.appendChild(uniqueLabelSelectorDiv)
  labelMapWidgetRow.appendChild(sliderEntry)

  labelMapWeightUIGroup.appendChild(labelMapWidgetRow)
  uiContainer.appendChild(labelMapWeightUIGroup)

  function pushLabelWeight() {
    if (store.imageUI.selectedLabel !== 'all') {
      weightElement.value =
        store.imageUI.labelMapWeights[store.imageUI.selectedLabel]
    }
    updateLabelMapPiecewiseFunction(store, store.imageUI.selectedLabel)
    store.renderWindow.render()
  }

  reaction(
    () => store.imageUI.selectedLabel,
    () => {
      if (store.imageUI.selectedLabel !== 'all') {
        weightElement.value =
          store.imageUI.labelMapWeights[store.imageUI.selectedLabel]
        labelSelector.selectedIndex = parseInt(store.imageUI.selectedLabel) + 1 // 'All' is first
      }
    }
  )

  reaction(
    () => store.imageUI.labelMapWeights.slice(),
    macro.debounce(pushLabelWeight, 25)
  )

  labelSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    store.imageUI.selectedLabel = event.target.value
  })

  weightElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    if (store.imageUI.selectedLabel === 'all') {
      const weight = Number(weightElement.value)
      for (let i = 0; i < store.imageUI.labelMapWeights.length; i++) {
        store.imageUI.labelMapWeights[i] = weight
      }
      store.imageUI.labelMapAllWeight = weight
    } else {
      store.imageUI.labelMapWeights[store.imageUI.selectedLabel] = Number(
        weightElement.value
      )
    }
  })
}

export default createLabelMapWeightWidget
