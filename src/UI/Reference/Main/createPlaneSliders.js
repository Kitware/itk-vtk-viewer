import macro from 'vtk.js/Sources/macro'
import style from '../ItkVtkViewer.module.css'

import visibleIcon from '../../Icons/visible.svg'
import invisibleIcon from '../../Icons/invisible.svg'

function createPlaneSliders(context) {
  const planeUIGroup = document.createElement('div')
  planeUIGroup.setAttribute('class', style.uiGroup)

  const numberOfValueChars = 6
  const viewerDOMId = context.id

  const xPlaneRow = document.createElement('div')
  xPlaneRow.setAttribute('class', style.planeUIRow)
  xPlaneRow.className += ` ${viewerDOMId}-x-plane-row`
  context.main.xPlaneRow = xPlaneRow

  const xPlaneVisibleButton = document.createElement('div')
  xPlaneVisibleButton.innerHTML = `<input id="${context.id}-xPlaneVisibleButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-xPlaneVisibleButton">${visibleIcon}</label>`
  const xPlaneVisibleButtonInput = xPlaneVisibleButton.children[0]
  const xPlaneVisibleLabel = xPlaneVisibleButton.children[1]
  xPlaneRow.appendChild(xPlaneVisibleButton)
  context.main.xPlaneVisibleButton = xPlaneVisibleButton

  const xPlaneInvisibleButton = document.createElement('div')
  xPlaneVisibleButton.setAttribute('class', style.visibleButton)
  xPlaneInvisibleButton.setAttribute('class', style.visibleButton)
  xPlaneInvisibleButton.innerHTML = `<input id="${context.id}-invisibleButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-xPlaneInvisibleButton">${invisibleIcon}</label>`
  const xPlaneInvisibleButtonInput = xPlaneInvisibleButton.children[0]
  const xPlaneInvisibleLabel = xPlaneInvisibleButton.children[1]
  xPlaneRow.appendChild(xPlaneInvisibleButton)
  context.main.xPlaneInvisibleButton = xPlaneInvisibleButton

  if (context.main.viewMode === 'Volume') {
    if (context.main.slicingPlanes.x.visible) {
      xPlaneVisibleButton.style.display = 'flex'
      xPlaneInvisibleButton.style.display = 'none'
    } else {
      xPlaneVisibleButton.style.display = 'none'
      xPlaneInvisibleButton.style.display = 'flex'
    }
  } else {
    xPlaneVisibleButton.style.display = 'none'
    xPlaneInvisibleButton.style.display = 'none'
  }

  xPlaneVisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    slicingPlanes.x.visible = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    xPlaneVisibleButton.checked = true
  })
  xPlaneInvisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    slicingPlanes.x.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    xPlaneInvisibleButton.checked = false
  })

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
  planeUIGroup.appendChild(xPlaneRow)

  const yPlaneRow = document.createElement('div')
  yPlaneRow.setAttribute('class', style.planeUIRow)
  yPlaneRow.className += ` ${viewerDOMId}-y-plane-row`
  context.main.yPlaneRow = yPlaneRow

  const yPlaneVisibleButton = document.createElement('div')
  yPlaneVisibleButton.setAttribute('class', style.visibleButton)
  yPlaneVisibleButton.innerHTML = `<input id="${context.id}-yPlaneVisibleButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-yPlaneVisibleButton">${visibleIcon}</label>`
  const yPlaneVisibleButtonInput = yPlaneVisibleButton.children[0]
  const yPlaneVisibleLabel = yPlaneVisibleButton.children[1]
  yPlaneRow.appendChild(yPlaneVisibleButton)
  context.main.yPlaneVisibleButton = yPlaneVisibleButton

  const yPlaneInvisibleButton = document.createElement('div')
  yPlaneInvisibleButton.setAttribute('class', style.visibleButton)
  yPlaneInvisibleButton.innerHTML = `<input id="${context.id}-invisibleButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-yPlaneInvisibleButton">${invisibleIcon}</label>`
  const yPlaneInvisibleButtonInput = yPlaneInvisibleButton.children[0]
  const yPlaneInvisibleLabel = yPlaneInvisibleButton.children[1]
  yPlaneRow.appendChild(yPlaneInvisibleButton)
  context.main.yPlaneInvisibleButton = yPlaneInvisibleButton

  if (context.main.viewMode === 'Volume') {
    if (context.main.slicingPlanes.x.visible) {
      yPlaneVisibleButton.style.display = 'flex'
      yPlaneInvisibleButton.style.display = 'none'
    } else {
      yPlaneVisibleButton.style.display = 'none'
      yPlaneInvisibleButton.style.display = 'flex'
    }
  } else {
    yPlaneVisibleButton.style.display = 'none'
    yPlaneInvisibleButton.style.display = 'none'
  }

  yPlaneVisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    slicingPlanes.y.visible = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    yPlaneVisibleButton.checked = true
  })
  yPlaneInvisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    slicingPlanes.y.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    yPlaneInvisibleButton.checked = false
  })

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
  planeUIGroup.appendChild(yPlaneRow)

  const zPlaneRow = document.createElement('div')
  zPlaneRow.setAttribute('class', style.planeUIRow)
  zPlaneRow.className += ` ${viewerDOMId}-z-plane-row`
  context.main.zPlaneRow = zPlaneRow

  const zPlaneVisibleButton = document.createElement('div')
  zPlaneVisibleButton.setAttribute('class', style.visibleButton)
  zPlaneVisibleButton.innerHTML = `<input id="${context.id}-zPlaneVisibleButton" type="checkbox" checked class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-zPlaneVisibleButton">${visibleIcon}</label>`
  const zPlaneVisibleButtonInput = zPlaneVisibleButton.children[0]
  const zPlaneVisibleLabel = zPlaneVisibleButton.children[1]
  zPlaneRow.appendChild(zPlaneVisibleButton)
  context.main.zPlaneVisibleButton = zPlaneVisibleButton

  const zPlaneInvisibleButton = document.createElement('div')
  zPlaneInvisibleButton.setAttribute('class', style.visibleButton)
  zPlaneInvisibleButton.innerHTML = `<input id="${context.id}-invisibleButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top-annotations itk-vtk-tooltip-content="X plane visibility" class="${style.visibleButton} ${style.toggleButton}" for="${context.id}-zPlaneInvisibleButton">${invisibleIcon}</label>`
  const zPlaneInvisibleButtonInput = zPlaneInvisibleButton.children[0]
  const zPlaneInvisibleLabel = zPlaneInvisibleButton.children[1]
  zPlaneRow.appendChild(zPlaneInvisibleButton)
  context.main.zPlaneInvisibleButton = zPlaneInvisibleButton

  if (context.main.viewMode === 'Volume') {
    if (context.main.slicingPlanes.x.visible) {
      zPlaneVisibleButton.style.display = 'flex'
      zPlaneInvisibleButton.style.display = 'none'
    } else {
      zPlaneVisibleButton.style.display = 'none'
      zPlaneInvisibleButton.style.display = 'flex'
    }
  } else {
    zPlaneVisibleButton.style.display = 'none'
    zPlaneInvisibleButton.style.display = 'none'
  }

  zPlaneVisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    slicingPlanes.z.visible = false
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    zPlaneVisibleButton.checked = true
  })
  zPlaneInvisibleButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const slicingPlanes = context.main.slicingPlanes
    slicingPlanes.z.visible = true
    context.service.send({
      type: 'SLICING_PLANES_CHANGED',
      data: slicingPlanes,
    })
    zPlaneInvisibleButton.checked = false
  })

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
  planeUIGroup.appendChild(zPlaneRow)

  const viewContainer = context.viewContainers.get('unified')
  viewContainer.appendChild(planeUIGroup)

  if (context.use2D || context.uiCollapsed) {
    planeUIGroup.style.display = 'none'
  }
  context.main.planeUIGroup = planeUIGroup
}

export default createPlaneSliders
