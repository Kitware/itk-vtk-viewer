import { reaction } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import hiddenIcon from '../icons/hidden.svg'
import wireframeIcon from '../icons/geometry-wireframe.svg'
import surfaceIcon from '../icons/geometry-surface.svg'
import surfaceWithEdgesIcon from '../icons/geometry-surface-with-edges.svg'

function createGeometryRepresentationSelector(
  store,
  geometryRepresentationRow
) {
  const viewerDOMId = store.id

  const geometryHiddenButton = document.createElement('div')
  geometryHiddenButton.innerHTML = `<input id="${viewerDOMId}-geometryHiddenButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Hidden" class="${style.fullscreenButton} ${style.toggleButton}" for="${viewerDOMId}-geometryHiddenButton">${hiddenIcon}</label>`
  geometryHiddenButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
    store.geometriesUI.representations[selectedGeometryIndex] = 'Hidden'
  })
  geometryRepresentationRow.appendChild(geometryHiddenButton)
  const geometryHiddenButtonInput = geometryHiddenButton.children[0]
  const geometryHiddenButtonLabel = geometryHiddenButton.children[1]
  applyContrastSensitiveStyle(store, 'tooltipButton', geometryHiddenButtonLabel)

  const geometryWireframeButton = document.createElement('div')
  geometryWireframeButton.innerHTML = `<input id="${viewerDOMId}-geometryWireframeButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Wireframe" class="${style.fullscreenButton} ${style.toggleButton}" for="${viewerDOMId}-geometryWireframeButton">${wireframeIcon}</label>`
  geometryWireframeButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
    store.geometriesUI.representations[selectedGeometryIndex] = 'Wireframe'
  })
  geometryRepresentationRow.appendChild(geometryWireframeButton)
  const geometryWireframeButtonInput = geometryWireframeButton.children[0]
  const geometryWireframeButtonLabel = geometryWireframeButton.children[1]
  applyContrastSensitiveStyle(
    store,
    'tooltipButton',
    geometryWireframeButtonLabel
  )

  const geometrySurfaceButton = document.createElement('div')
  geometrySurfaceButton.innerHTML = `<input id="${viewerDOMId}-geometrySurfaceButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Surface" class="${style.fullscreenButton} ${style.toggleButton}" for="${viewerDOMId}-geometrySurfaceButton">${surfaceIcon}</label>`
  geometrySurfaceButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
    store.geometriesUI.representations[selectedGeometryIndex] = 'Surface'
  })
  geometryRepresentationRow.appendChild(geometrySurfaceButton)
  const geometrySurfaceButtonInput = geometrySurfaceButton.children[0]
  const geometrySurfaceButtonLabel = geometrySurfaceButton.children[1]
  applyContrastSensitiveStyle(
    store,
    'tooltipButton',
    geometrySurfaceButtonLabel
  )

  const geometrySurfaceWithEdgesButton = document.createElement('div')
  geometrySurfaceWithEdgesButton.innerHTML = `<input id="${viewerDOMId}-geometrySurfaceWithEdgesButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-left itk-vtk-tooltip-content="Surface with edges" class="${style.viewModeButton} ${style.toggleButton}" for="${viewerDOMId}-geometrySurfaceWithEdgesButton">${surfaceWithEdgesIcon}</label>`
  geometrySurfaceWithEdgesButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
    store.geometriesUI.representations[selectedGeometryIndex] =
      'Surface with edges'
  })
  geometryRepresentationRow.appendChild(geometrySurfaceWithEdgesButton)
  const geometrySurfaceWithEdgesButtonInput =
    geometrySurfaceWithEdgesButton.children[0]
  const geometrySurfaceWithEdgesButtonLabel =
    geometrySurfaceWithEdgesButton.children[1]
  applyContrastSensitiveStyle(
    store,
    'tooltipButton',
    geometrySurfaceWithEdgesButtonLabel
  )

  function updateEnabledRepresentationButtons(selectedGeometryRepresentation) {
    switch (selectedGeometryRepresentation) {
      case 'Hidden':
        geometryHiddenButtonInput.checked = true
        geometryWireframeButtonInput.checked = false
        geometrySurfaceButtonInput.checked = false
        geometrySurfaceWithEdgesButtonInput.checked = false
        break
      case 'Wireframe':
        geometryHiddenButtonInput.checked = false
        geometryWireframeButtonInput.checked = true
        geometrySurfaceButtonInput.checked = false
        geometrySurfaceWithEdgesButtonInput.checked = false
        break
      case 'Surface':
        geometryHiddenButtonInput.checked = false
        geometryWireframeButtonInput.checked = false
        geometrySurfaceButtonInput.checked = true
        geometrySurfaceWithEdgesButtonInput.checked = false
        break
      case 'Surface with edges':
        geometryHiddenButtonInput.checked = false
        geometryWireframeButtonInput.checked = false
        geometrySurfaceButtonInput.checked = false
        geometrySurfaceWithEdgesButtonInput.checked = true
        break
      default:
        console.error(
          'Invalid geometry representation: ' + selectedGeometryRepresentation
        )
    }
  }

  function setRepresentation(value, index) {
    if (value === 'Hidden') {
      store.geometriesUI.representationProxies[index].setVisibility(false)
    } else {
      store.geometriesUI.representationProxies[index].setRepresentation(value)
      store.geometriesUI.representationProxies[index].setVisibility(true)
    }
    updateEnabledRepresentationButtons(value)
    store.renderWindow.render()
  }

  reaction(
    () => {
      return store.geometriesUI.representations.slice()
    },
    representations => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
      const representation =
        store.geometriesUI.representations[selectedGeometryIndex]
      setRepresentation(representation, selectedGeometryIndex)
      store.renderWindow.render()
    }
  )

  reaction(
    () => {
      return store.geometriesUI.selectedGeometryIndex
    },
    selectedIndex => {
      const selectedGeometryRepresentation =
        store.geometriesUI.representations[selectedIndex]
      updateEnabledRepresentationButtons(selectedGeometryRepresentation)
    }
  )

  const defaultGeometryRepresentation = 'Surface'

  reaction(
    () => {
      return store.geometriesUI.geometries.slice()
    },
    geometries => {
      if (!!!geometries || geometries.length === 0) {
        return
      }

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.representations.length <= index) {
          store.geometriesUI.representations.push(defaultGeometryRepresentation)
        }
      })
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
      updateEnabledRepresentationButtons(
        store.geometriesUI.representations[selectedGeometryIndex]
      )
    }
  )

  const defaultGeometryRepresentations = new Array(
    store.geometriesUI.geometries.length
  )
  defaultGeometryRepresentations.fill(defaultGeometryRepresentation)
  updateEnabledRepresentationButtons(defaultGeometryRepresentation)
  store.geometriesUI.representations = defaultGeometryRepresentations
}

export default createGeometryRepresentationSelector
