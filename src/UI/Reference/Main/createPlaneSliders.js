import macro from 'vtk.js/Sources/macro'
import style from '../ItkVtkViewer.module.css'

function createPlaneSliders(context) {
  const planeUIGroup = document.createElement('div')
  planeUIGroup.setAttribute('class', style.uiGroup)

  const numberOfValueChars = 6
  const viewerDOMId = context.id
  const renderWindow = context.renderWindow

  const xPlaneRow = document.createElement('div')
  xPlaneRow.setAttribute('class', style.planeUIRow)
  xPlaneRow.className += ` ${viewerDOMId}-x-plane-row`
  context.main.xPlaneRow = xPlaneRow

  const xSliderEntry = document.createElement('div')
  xSliderEntry.setAttribute('class', style.sliderEntry)
  xSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-xSliceLabel" class="${style.xPlaneLabel}">X:</label><input type="range" min="0.0" max="1.0" value="0.5" step="0.1"
      id="${viewerDOMId}-xSlice" class="${style.slider}" />`
  const xPlaneLabel = xSliderEntry.querySelector(`#${viewerDOMId}-xSliceLabel`)
  context.main.xPlaneLabel = xPlaneLabel

  const xSliceElement = xSliderEntry.querySelector(`#${viewerDOMId}-xSlice`)
  xSliceElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'X_SLICE_CHANGED',
      data: Number(xSliceElement.value),
    })
  })
  context.main.xSliceElement = xSliceElement

  xPlaneRow.appendChild(xSliderEntry)
  xPlaneRow.style.display = 'none'
  planeUIGroup.appendChild(xPlaneRow)

  const yPlaneRow = document.createElement('div')
  yPlaneRow.setAttribute('class', style.planeUIRow)
  yPlaneRow.className += ` ${viewerDOMId}-y-plane-row`
  context.main.yPlaneRow = yPlaneRow

  const ySliderEntry = document.createElement('div')
  ySliderEntry.setAttribute('class', style.sliderEntry)
  ySliderEntry.innerHTML = `
    <label id="${viewerDOMId}-ySliceLabel" class="${style.yPlaneLabel}">Y:</label><input type="range" min="0.0" max="1.0" value="0.5" step="0.1"
      id="${viewerDOMId}-ySlice" class="${style.slider}" />`
  const yPlaneLabel = ySliderEntry.querySelector(`#${viewerDOMId}-ySliceLabel`)
  context.main.yPlaneLabel = yPlaneLabel

  const ySliceElement = ySliderEntry.querySelector(`#${viewerDOMId}-ySlice`)
  ySliceElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'Y_SLICE_CHANGED',
      data: Number(ySliceElement.value),
    })
  })
  context.main.ySliceElement = ySliceElement

  yPlaneRow.appendChild(ySliderEntry)
  yPlaneRow.style.display = 'none'
  planeUIGroup.appendChild(yPlaneRow)

  const zPlaneRow = document.createElement('div')
  zPlaneRow.setAttribute('class', style.planeUIRow)
  zPlaneRow.className += ` ${viewerDOMId}-z-plane-row`
  context.main.zPlaneRow = zPlaneRow

  const zSliderEntry = document.createElement('div')
  zSliderEntry.setAttribute('class', style.sliderEntry)
  zSliderEntry.innerHTML = `
    <label id="${viewerDOMId}-zSliceLabel" class="${style.zPlaneLabel}">Z:</label><input type="range" min="0.0" max="1.0" value="0.5" step="0.1"
      id="${viewerDOMId}-zSlice" class="${style.slider}" />`
  const zPlaneLabel = zSliderEntry.querySelector(`#${viewerDOMId}-zSliceLabel`)
  context.main.zPlaneLabel = zPlaneLabel

  const zSliceElement = zSliderEntry.querySelector(`#${viewerDOMId}-zSlice`)
  zSliceElement.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    context.service.send({
      type: 'Z_SLICE_CHANGED',
      data: Number(zSliceElement.value),
    })
  })
  context.main.zSliceElement = zSliceElement

  zPlaneRow.appendChild(zSliderEntry)
  zPlaneRow.style.display = 'none'
  planeUIGroup.appendChild(zPlaneRow)

  const viewContainer = context.viewContainers.get('unified')
  viewContainer.appendChild(planeUIGroup)
}

export default createPlaneSliders
