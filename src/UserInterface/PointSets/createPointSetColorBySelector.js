import { reaction } from 'mobx'

import style from '../ItkVtkViewer.module.css'

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants'

function createPointSetColorBySelector(store, colorByRow) {
  const colorBySelector = document.createElement('select')
  colorBySelector.setAttribute('class', style.selector)
  colorBySelector.id = `${store.id}-colorBySelector`

  reaction(
    () => {
      return store.pointSetsUI.pointSets.slice()
    },
    pointSets => {
      if (!!!pointSets || pointSets.length === 0) {
        return
      }

      const hasScalars = store.pointSetsUI.hasScalars
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      const colorByOptions = store.pointSetsUI.colorByOptions

      if (
        store.pointSetsUI.hasScalars[selectedPointSetIndex] &&
        colorByOptions[selectedPointSetIndex].length > 1
      ) {
        colorByRow.style.display = 'flex'
      } else {
        colorByRow.style.display = 'none'
      }

      const colorByDefault = store.pointSetsUI.colorByDefault
      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.colorBy.length <= index) {
          store.pointSetsUI.colorBy.push(colorByDefault[index])
        } else {
          const current = store.pointSetsUI.colorBy[index]
          if (
            !!store.pointSetsUI.colorByOptions[index] &&
            !!!store.pointSetsUI.colorByOptions[index].filter(option => {
              return (
                option.label === current.label && option.value === current.value
              )
            }).length
          ) {
            store.pointSetsUI.colorBy[index] = colorByDefault[index]
          }
        }
      })

      if (hasScalars[selectedPointSetIndex]) {
        colorBySelector.value =
          store.pointSetsUI.colorBy[selectedPointSetIndex].value
      }
    }
  )

  reaction(
    () => {
      return store.pointSetsUI.selectedPointSetIndex
    },
    selectedPointSetIndex => {
      const colorByOptions = store.pointSetsUI.colorByOptions

      if (
        !!colorByOptions[selectedPointSetIndex] &&
        !!colorByOptions[selectedPointSetIndex].length
      ) {
        colorBySelector.innerHTML = colorByOptions[selectedPointSetIndex]
          .map(
            ({ label, value }) => `<option value="${value}" >${label}</option>`
          )
          .join('')
        colorBySelector.value =
          store.pointSetsUI.colorBy[selectedPointSetIndex].value
      }
      const hasScalars = store.pointSetsUI.hasScalars
      if (
        hasScalars[selectedPointSetIndex] &&
        colorByOptions[selectedPointSetIndex].length > 1
      ) {
        colorByRow.style.display = 'flex'
      } else {
        colorByRow.style.display = 'none'
      }
    }
  )

  reaction(
    () => {
      return store.pointSetsUI.colorBy.slice()
    },
    colorBy => {
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      if (!!!colorBy[selectedPointSetIndex]) {
        return
      }
      const [location, colorByArrayName] = colorBy[
        selectedPointSetIndex
      ].value.split(':')
      const proxy =
        store.pointSetsUI.representationProxies[selectedPointSetIndex]
      const interpolateScalarsBeforeMapping = location === 'pointData'
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping)
      proxy.setColorBy(colorByArrayName, location)
      store.renderWindow.render()

      const hasScalars = store.pointSetsUI.hasScalars
      if (hasScalars[selectedPointSetIndex]) {
        colorBySelector.value =
          store.pointSetsUI.colorBy[selectedPointSetIndex].value
      }
    }
  )

  colorBySelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
    const colorByOptions = store.pointSetsUI.colorByOptions
    const selectedOption = store.pointSetsUI.colorByOptions[
      selectedPointSetIndex
    ].filter(option => {
      return option.value === event.target.value
    })[0]
    store.pointSetsUI.colorBy[selectedPointSetIndex] = selectedOption
  })

  // Initialize coloring
  const colorByDefault = store.pointSetsUI.colorByDefault
  colorByDefault.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':')
      const proxy = store.pointSetsUI.representationProxies[index]
      const interpolateScalarsBeforeMapping = location === 'pointData'
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping)
      proxy.setColorBy(colorByArrayName, location)
    }
  })
  const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
  const colorByOptions = store.pointSetsUI.colorByOptions
  if (colorByDefault[selectedPointSetIndex]) {
    colorBySelector.innerHTML = colorByOptions[selectedPointSetIndex]
      .map(({ label, value }) => `<option value="${value}" >${label}</option>`)
      .join('')
    colorBySelector.value = colorByDefault[selectedPointSetIndex].value
  }
  const hasScalars = store.pointSetsUI.hasScalars
  if (
    hasScalars[selectedPointSetIndex] &&
    colorByOptions[selectedPointSetIndex].length > 1
  ) {
    colorByRow.style.display = 'flex'
  } else {
    colorByRow.style.display = 'none'
  }
  store.pointSetsUI.colorBy = colorByDefault

  colorByRow.appendChild(colorBySelector)
}

export default createPointSetColorBySelector
