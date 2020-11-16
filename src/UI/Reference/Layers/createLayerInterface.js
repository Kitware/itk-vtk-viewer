import style from '../ItkVtkViewer.module.css'

import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import visibleIcon from '../../Icons/visible.svg'
import invisibleIcon from '../../Icons/invisible.svg'
import imageIcon from '../../Icons/image.svg'

function createLayerEntry(context, name, layer) {
  const layerEntry = document.createElement('div')
  layerEntry.setAttribute('class', style.layerEntryCommon)
  applyContrastSensitiveStyleToElement(context, 'layerEntry', layerEntry)

  const visibleButton = document.createElement('div')
  visibleButton.innerHTML = `<input id="${context.id}-visibleButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-visibleButton">${visibleIcon}</label>`
  const visibleButtonInput = visibleButton.children[0]
  const visibleLabel = visibleButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    visibleLabel
  )
  layerEntry.appendChild(visibleButton)
  const invisibleButton = document.createElement('div')
  invisibleButton.innerHTML = `<input id="${context.id}-invisibleButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-invisibleButton">${invisibleIcon}</label>`
  const invisibleButtonInput = invisibleButton.children[0]
  const invisibleLabel = invisibleButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    invisibleLabel
  )
  layerEntry.appendChild(invisibleButton)

  if (layer.visible) {
    visibleButton.style.display = 'flex'
    invisibleButton.style.display = 'none'
  } else {
    visibleButton.style.display = 'none'
    invisibleButton.style.display = 'flex'
  }

  visibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'TOGGLE_LAYER_VISIBILITY', data: name })
    visibleButton.checked = true
  })
  invisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({ type: 'TOGGLE_LAYER_VISIBILITY', data: name })
    invisibleButton.checked = false
  })

  const layerLabel = document.createElement('label')
  layerLabel.setAttribute('class', `${style.layerLabelCommon}`)
  applyContrastSensitiveStyleToElement(context, 'layerLabel', layerLabel)
  layerLabel.innerText = name
  layerEntry.appendChild(layerLabel)

  const iconElement = document.createElement('div')
  switch (layer.type) {
    case 'image': {
      iconElement.innerHTML = `${imageIcon}`
      break
    }
    default:
      throw new Error(`Unsupported layer type: ${layer.type}`)
  }
  iconElement.setAttribute('class', style.layerIcon)
  applyContrastSensitiveStyleToElement(context, 'invertibleButton', iconElement)
  layerEntry.appendChild(iconElement)

  return layerEntry
}

function createLayerInterface(context, event) {
  const name = context.layers.lastAddedData.name
  const layer = context.layers.actorContext.get(name)
  const layersUIGroup = context.layers.layersUIGroup

  let layerEntry = null
  const numRows = layersUIGroup.children.length
  for (let row = 0; row < numRows; row++) {
    const uiRow = layersUIGroup.children[row]
    if (uiRow.children.length < 3) {
      layerEntry = createLayerEntry(context, name, layer)
      console.log(layersUIGroup)
      uiRow.appendChild(layerEntry)
    }
  }
  if (!!!layerEntry) {
    addLayerUIRow(context)
    const uiRow = layersUIGroup[layersUIGroup.children.length - 1]
    layerEntry = createLayerEntry(context, name, layer)
    uiRow.appendChild(layerEntry)
  }

  context.layers.uiLayers.set(name, layerEntry)
}

export default createLayerInterface
