import style from '../ItkVtkViewer.module.css'

import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import {
  visibleIconDataUri,
  invisibleIconDataUri,
  boundingBoxIconDataUri,
} from 'itk-viewer-icons'
import { makeHtml } from '../utils'
import './layerIcon.js'

function createLayerEntry(context, name, layer) {
  const layerEntry = document.createElement('div')
  layerEntry.setAttribute('class', style.layerEntryCommon)
  layerEntry.style.borderWidth = '3px'
  applyContrastSensitiveStyleToElement(context, 'layerEntry', layerEntry)

  const visibleButton = document.createElement('div')
  visibleButton.innerHTML = `<input id="${context.id}-visibleButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-visibleButton"><img src="${visibleIconDataUri}" alt="visible"/></label>`
  const visibleLabel = visibleButton.children[1]
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    visibleLabel
  )
  layerEntry.appendChild(visibleButton)
  const invisibleButton = document.createElement('div')
  invisibleButton.innerHTML = `<input id="${context.id}-invisibleButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="Visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-invisibleButton"><img src="${invisibleIconDataUri} alt="invisible""/></label>`
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

  const imageIcons = document.createElement('div')
  imageIcons.style.display = 'flex'
  imageIcons.setAttribute('class', `${style.iconGroup}`)
  layerEntry.appendChild(imageIcons)

  const spinner = document.createElement('div')
  spinner.setAttribute('class', `${style.ldsRing}`)
  spinner.innerHTML = '<div></div><div></div><div></div><div></div>'
  imageIcons.appendChild(spinner)

  layer.spinner = spinner

  const layerBBoxButton = document.createElement('div')
  layerBBoxButton.innerHTML = `<input id="${context.id}-layerBBoxButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Label BBox" class="${style.toggleButton}" for="${context.id}-layerBBoxButton"><img src="${boundingBoxIconDataUri}" alt="bbox"/></label>`
  const layerBBoxButtonInput = layerBBoxButton.children[0]
  const layerBBoxLabel = layerBBoxButton.children[1]
  layerBBoxButton.style.height = '23px'
  applyContrastSensitiveStyleToElement(
    context,
    'invertibleButton',
    layerBBoxLabel
  )
  imageIcons.appendChild(layerBBoxButton)
  layerBBoxButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'TOGGLE_LAYER_BBOX',
      data: {
        name: context.images.selectedName,
        layerName: name,
      },
    })
    const actorContext = context.layers.actorContext.get(name)
    layerBBoxButtonInput.checked = actorContext.bbox
  })

  const icon = makeHtml(`<layer-icon class="${style.layerIcon}"></layer-icon>`)
  icon.layer = layer
  icon.name = name
  imageIcons.appendChild(icon)

  layerEntry.addEventListener('click', event => {
    event.preventDefault()
    context.service.send({ type: 'SELECT_LAYER', data: name })
  })

  return layerEntry
}

function createLayerInterface(context) {
  const name = context.layers.lastAddedData.name
  const layer = context.layers.actorContext.get(name)

  const layerEntry = createLayerEntry(context, name, layer)
  context.layers.layersUIGroup.appendChild(layerEntry)

  context.layers.uiLayers.set(name, layerEntry)
}

export default createLayerInterface
