import { reaction, autorun } from 'mobx'

import style from './ItkVtkViewer.module.css'

import createPointSetRepresentationSelector from './PointSets/createPointSetRepresentationSelector'
import createPointSetColorWidget from './PointSets/createPointSetColorWidget'

function createPointSetsUI(store, uiContainer) {
  const pointSetsUIGroup = document.createElement('div')
  pointSetsUIGroup.setAttribute('class', style.uiGroup)

  const pointSetRepresentationRow = document.createElement('div')
  pointSetRepresentationRow.setAttribute('class', style.uiRow)
  pointSetRepresentationRow.className += ` ${store.id}-collapsible`
  if (store.mainUI.collapsed) {
    pointSetRepresentationRow.style.display = 'none'
  }

  const pointSetSelector = document.createElement('select')
  pointSetSelector.setAttribute('class', style.selector)
  pointSetSelector.id = `${store.id}-pointSetSelector`
  pointSetRepresentationRow.appendChild(pointSetSelector)

  pointSetSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    store.pointSetsUI.selectedPointSetIndex = pointSetSelector.selectedIndex
  })

  function updatePointSetNames(names) {
    pointSetSelector.innerHTML = names
      .map(name => `<option value="${name}">${name}</option>`)
      .join('')
    if (names.length > 1) {
      pointSetSelector.disabled = false
    } else {
      pointSetSelector.disabled = true
    }
  }
  reaction(
    () => {
      return store.pointSetsUI.names.slice()
    },
    names => {
      updatePointSetNames(names)
    }
  )
  if (store.pointSetsUI.pointSets.length > 0) {
    store.pointSetsUI.selectedPointSetIndex = 0
  }
  autorun(() => {
    const pointSets = store.pointSetsUI.pointSets
    store.pointSetsUI.names = pointSets.map((pointSet, index) => {
      const metadata = pointSet.getState().metadata
      return !!metadata && !!metadata.name
        ? metadata.name
        : `Point Set ${index}`
    })
  })

  createPointSetRepresentationSelector(store, pointSetRepresentationRow)
  pointSetsUIGroup.appendChild(pointSetRepresentationRow)

  createPointSetColorWidget(store, pointSetsUIGroup)

  uiContainer.appendChild(pointSetsUIGroup)
  store.pointSetsUI.initialized = true
}

export default createPointSetsUI
