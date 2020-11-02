import { reaction, autorun } from 'mobx'

import style from './ItkVtkViewer.module.css'

import createGeometryRepresentationSelector from './Geometries/createGeometryRepresentationSelector'
import createGeometryColorWidget from './Geometries/createGeometryColorWidget'

function createGeometriesUI(store) {
  const geometriesUIGroup = document.createElement('div')
  geometriesUIGroup.setAttribute('class', style.uiGroup)

  const geometryRepresentationRow = document.createElement('div')
  geometryRepresentationRow.setAttribute('class', style.uiRow)
  geometryRepresentationRow.className += ` ${store.id}-collapsible`
  if (store.mainUI.collapsed) {
    geometryRepresentationRow.style.display = 'none'
  }

  const geometrySelector = document.createElement('select')
  geometrySelector.setAttribute('class', style.selector)
  geometrySelector.id = `${store.id}-geometrySelector`
  geometryRepresentationRow.appendChild(geometrySelector)

  geometrySelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    store.geometriesUI.selectedGeometryIndex = geometrySelector.selectedIndex
  })
  function updateGeometryNames(names) {
    geometrySelector.innerHTML = names
      .map(name => `<option value="${name}">${name}</option>`)
      .join('')
    if (names.length > 1) {
      geometrySelector.disabled = false
    } else {
      geometrySelector.disabled = true
    }
  }
  reaction(
    () => {
      return store.geometriesUI.names.slice()
    },
    names => {
      updateGeometryNames(names)
    }
  )
  if (store.geometriesUI.geometries.length > 0) {
    store.geometriesUI.selectedGeometryIndex = 0
  }
  autorun(() => {
    const geometries = store.geometriesUI.geometries
    store.geometriesUI.names = geometries.map((geometry, index) => {
      const metadata = geometry.getState().metadata
      return !!metadata && !!metadata.name ? metadata.name : `Geometry ${index}`
    })
  })

  createGeometryRepresentationSelector(store, geometryRepresentationRow)
  geometriesUIGroup.appendChild(geometryRepresentationRow)

  createGeometryColorWidget(store, geometriesUIGroup)

  store.mainUI.uiContainer.appendChild(geometriesUIGroup)
  store.geometriesUI.initialized = true
}

export default createGeometriesUI
