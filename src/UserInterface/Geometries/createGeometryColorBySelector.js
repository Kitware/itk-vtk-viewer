import { reaction } from 'mobx'

import style from '../ItkVtkViewer.module.css'

import {
  ColorMode,
  ScalarMode,
} from 'vtk.js/Sources/Rendering/Core/Mapper/Constants'

function createGeometryColorBySelector(store, colorByRow) {
  const colorBySelector = document.createElement('select')
  colorBySelector.setAttribute('class', style.selector)
  colorBySelector.id = `${store.id}-colorBySelector`

  reaction(
    () => {
      return store.geometriesUI.geometries.slice()
    },
    geometries => {
      if (!!!geometries || geometries.length === 0) {
        return
      }

      const hasScalars = store.geometriesUI.hasScalars
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
      const colorByOptions = store.geometriesUI.colorByOptions

      if (
        store.geometriesUI.hasScalars[selectedGeometryIndex] &&
        colorByOptions[selectedGeometryIndex].length > 1
      ) {
        colorByRow.style.display = 'flex'
      } else {
        colorByRow.style.display = 'none'
      }

      const colorByDefault = store.geometriesUI.colorByDefault
      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.colorBy.length <= index) {
          store.geometriesUI.colorBy.push(colorByDefault[index])
        } else {
          const current = store.geometriesUI.colorBy[index]
          if (
            !!store.geometriesUI.colorByOptions[index] &&
            !!!store.geometriesUI.colorByOptions[index].filter(option => {
              return (
                option.label === current.label && option.value === current.value
              )
            }).length
          ) {
            store.geometriesUI.colorBy[index] = colorByDefault[index]
          }
        }
      })

      if (hasScalars[selectedGeometryIndex]) {
        colorBySelector.value =
          store.geometriesUI.colorBy[selectedGeometryIndex].value
      }
    }
  )

  reaction(
    () => {
      return store.geometriesUI.selectedGeometryIndex
    },
    selectedGeometryIndex => {
      const colorByOptions = store.geometriesUI.colorByOptions

      if (
        !!colorByOptions[selectedGeometryIndex] &&
        !!colorByOptions[selectedGeometryIndex].length
      ) {
        colorBySelector.innerHTML = colorByOptions[selectedGeometryIndex]
          .map(
            ({ label, value }) => `<option value="${value}" >${label}</option>`
          )
          .join('')
        colorBySelector.value =
          store.geometriesUI.colorBy[selectedGeometryIndex].value
      }
      const hasScalars = store.geometriesUI.hasScalars
      if (
        hasScalars[selectedGeometryIndex] &&
        colorByOptions[selectedGeometryIndex].length > 1
      ) {
        colorByRow.style.display = 'flex'
      } else {
        colorByRow.style.display = 'none'
      }
    }
  )

  reaction(
    () => {
      return store.geometriesUI.colorBy.slice()
    },
    colorBy => {
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
      if (!!!colorBy[selectedGeometryIndex]) {
        return
      }
      const [location, colorByArrayName] = colorBy[
        selectedGeometryIndex
      ].value.split(':')
      const proxy =
        store.geometriesUI.representationProxies[selectedGeometryIndex]
      const interpolateScalarsBeforeMapping = location === 'pointData'
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping)
      proxy.setColorBy(colorByArrayName, location)
      store.renderWindow.render()

      const hasScalars = store.geometriesUI.hasScalars
      if (hasScalars[selectedGeometryIndex]) {
        colorBySelector.value =
          store.geometriesUI.colorBy[selectedGeometryIndex].value
      }
    }
  )

  colorBySelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
    const colorByOptions = store.geometriesUI.colorByOptions
    const selectedOption = store.geometriesUI.colorByOptions[
      selectedGeometryIndex
    ].filter(option => {
      return option.value === event.target.value
    })[0]
    store.geometriesUI.colorBy[selectedGeometryIndex] = selectedOption
  })

  // Initialize coloring
  const colorByDefault = store.geometriesUI.colorByDefault
  colorByDefault.forEach((colorBy, index) => {
    if (colorBy) {
      const [location, colorByArrayName] = colorBy.value.split(':')
      const proxy = store.geometriesUI.representationProxies[index]
      const interpolateScalarsBeforeMapping = location === 'pointData'
      proxy.setInterpolateScalarsBeforeMapping(interpolateScalarsBeforeMapping)
      proxy.setColorBy(colorByArrayName, location)
    }
  })
  const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
  const colorByOptions = store.geometriesUI.colorByOptions
  if (colorByDefault[selectedGeometryIndex]) {
    colorBySelector.innerHTML = colorByOptions[selectedGeometryIndex]
      .map(({ label, value }) => `<option value="${value}" >${label}</option>`)
      .join('')
    colorBySelector.value = colorByDefault[selectedGeometryIndex].value
  }
  if (
    store.geometriesUI.hasScalars[selectedGeometryIndex] &&
    colorByOptions[selectedGeometryIndex].length > 1
  ) {
    colorByRow.style.display = 'flex'
  } else {
    colorByRow.style.display = 'none'
  }
  store.geometriesUI.colorBy = colorByDefault

  colorByRow.appendChild(colorBySelector)
}

export default createGeometryColorBySelector
