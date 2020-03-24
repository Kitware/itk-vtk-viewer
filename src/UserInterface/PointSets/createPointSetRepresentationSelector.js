import { reaction } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import hiddenIcon from '../icons/hidden.svg'
import pointsIcon from '../icons/point-set-points.svg'
import spheresIcon from '../icons/point-set-spheres.svg'

function createPointSetRepresentationSelector(
  store,
  pointSetRepresentationRow
) {
  const viewerDOMId = store.id

  const pointSetHiddenButton = document.createElement('div')
  pointSetHiddenButton.innerHTML = `<input id="${viewerDOMId}-pointSetHiddenButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Hidden" class="${style.fullscreenButton} ${style.toggleButton}" for="${viewerDOMId}-pointSetHiddenButton">${hiddenIcon}</label>`
  pointSetHiddenButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
    store.pointSetsUI.representations[selectedPointSetIndex] = 'Hidden'
  })
  pointSetRepresentationRow.appendChild(pointSetHiddenButton)
  const pointSetHiddenButtonInput = pointSetHiddenButton.children[0]
  const pointSetHiddenButtonLabel = pointSetHiddenButton.children[1]
  applyContrastSensitiveStyle(store, 'tooltipButton', pointSetHiddenButtonLabel)

  const pointSetPointsButton = document.createElement('div')
  pointSetPointsButton.innerHTML = `<input id="${viewerDOMId}-pointSetPointsButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Points" class="${style.fullscreenButton} ${style.toggleButton}" for="${viewerDOMId}-pointSetPointsButton">${pointsIcon}</label>`
  pointSetPointsButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
    store.pointSetsUI.representations[selectedPointSetIndex] = 'Points'
  })
  pointSetRepresentationRow.appendChild(pointSetPointsButton)
  const pointSetPointsButtonInput = pointSetPointsButton.children[0]
  const pointSetPointsButtonLabel = pointSetPointsButton.children[1]
  applyContrastSensitiveStyle(store, 'tooltipButton', pointSetPointsButtonLabel)

  const pointSetSpheresButton = document.createElement('div')
  pointSetSpheresButton.innerHTML = `<input id="${viewerDOMId}-pointSetSpheresButton" type="checkbox" class="${style.toggleInput}"><label itk-vtk-tooltip itk-vtk-tooltip-top itk-vtk-tooltip-content="Spheres" class="${style.fullscreenButton} ${style.toggleButton}" for="${viewerDOMId}-pointSetSpheresButton">${spheresIcon}</label>`
  pointSetSpheresButton.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
    store.pointSetsUI.representations[selectedPointSetIndex] = 'Spheres'
  })
  pointSetRepresentationRow.appendChild(pointSetSpheresButton)
  const pointSetSpheresButtonInput = pointSetSpheresButton.children[0]
  const pointSetSpheresButtonLabel = pointSetSpheresButton.children[1]
  applyContrastSensitiveStyle(
    store,
    'tooltipButton',
    pointSetSpheresButtonLabel
  )

  function updateEnabledRepresentationButtons(selectedPointSetRepresentation) {
    switch (selectedPointSetRepresentation) {
      case 'Hidden':
        pointSetHiddenButtonInput.checked = true
        pointSetPointsButtonInput.checked = false
        pointSetSpheresButtonInput.checked = false
        break
      case 'Points':
        pointSetHiddenButtonInput.checked = false
        pointSetPointsButtonInput.checked = true
        pointSetSpheresButtonInput.checked = false
        break
      case 'Spheres':
        pointSetHiddenButtonInput.checked = false
        pointSetPointsButtonInput.checked = false
        pointSetSpheresButtonInput.checked = true
        break
      default:
        console.error(
          'Invalid pointSet representation: ' + selectedPointSetRepresentation
        )
    }
  }

  function setRepresentation(value, index) {
    if (value === 'Hidden') {
      store.pointSetsUI.representationProxies[index].setVisibility(false)
    } else {
      store.pointSetsUI.representationProxies[index].setRepresentation(value)
      store.pointSetsUI.representationProxies[index].setVisibility(true)
    }
  }

  reaction(
    () => {
      return store.pointSetsUI.representations.slice()
    },
    representations => {
      representations.forEach((representation, index) => {
        setRepresentation(representation, index)
      })
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const representation =
        store.pointSetsUI.representations[selectedPointSetIndex]
      updateEnabledRepresentationButtons(representation)
      store.renderWindow.render()
    }
  )

  reaction(
    () => {
      return store.pointSetsUI.selectedPointSetIndex
    },
    selectedIndex => {
      const selectedPointSetRepresentation =
        store.pointSetsUI.representations[selectedIndex]
      updateEnabledRepresentationButtons(selectedPointSetRepresentation)
    }
  )

  const defaultPointSetRepresentation = 'Points'

  reaction(
    () => {
      return store.pointSetsUI.pointSets.slice()
    },
    pointSets => {
      if (!!!pointSets || pointSets.length === 0) {
        return
      }

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.representations.length <= index) {
          store.pointSetsUI.representations.push(defaultPointSetRepresentation)
        }
      })
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      updateEnabledRepresentationButtons(
        store.pointSetsUI.representations[selectedPointSetIndex]
      )
    }
  )

  const defaultPointSetRepresentations = new Array(
    store.pointSetsUI.pointSets.length
  )
  defaultPointSetRepresentations.fill(defaultPointSetRepresentation)
  updateEnabledRepresentationButtons(defaultPointSetRepresentation)
  store.pointSetsUI.representations = defaultPointSetRepresentations
  const pointSetRepresentationProxies = store.pointSetsUI.representationProxies
}

export default createPointSetRepresentationSelector
