import { reaction } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import hex2rgb from '../hex2rgb'

function createPointSetColorChooser(store, pointSetColorRow) {
  const pointSetColorInput = document.createElement('input')
  pointSetColorInput.setAttribute('type', 'color')
  pointSetColorInput.id = `${store.id}-pointSetColorInput`

  const defaultPointSetColor = '#ffffff'

  reaction(
    () => {
      return store.pointSetsUI.pointSets.slice()
    },
    pointSets => {
      if (!!!pointSets || pointSets.length === 0) {
        return
      }

      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex

      pointSets.forEach((pointSet, index) => {
        if (store.pointSetsUI.colors.length <= index) {
          store.pointSetsUI.colors.push(defaultPointSetColor)
        }
      })
      pointSetColorInput.value = store.pointSetsUI.colors[selectedPointSetIndex]
    }
  )

  reaction(
    () => {
      return store.pointSetsUI.selectedPointSetIndex
    },
    selectedPointSetIndex => {
      pointSetColorInput.value = store.pointSetsUI.colors[selectedPointSetIndex]
      if (store.pointSetsUI.hasScalars[selectedPointSetIndex]) {
        pointSetColorInput.style.display = 'none'
      } else {
        pointSetColorInput.style.display = 'inline-block'
      }
    }
  )

  reaction(
    () => {
      return store.pointSetsUI.colors.slice()
    },
    colors => {
      colors.forEach((value, index) => {
        const rgb = hex2rgb(value)
        store.pointSetsUI.representationProxies[index].setColor(rgb)
      })
      store.renderWindow.render()
      const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
      pointSetColorInput.value = colors[selectedPointSetIndex]
    }
  )

  pointSetColorInput.addEventListener('input', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
    store.pointSetsUI.colors[selectedPointSetIndex] = event.target.value
  })

  const defaultPointSetColors = Array(store.pointSetsUI.pointSets.length)
  defaultPointSetColors.fill(defaultPointSetColor)
  pointSetColorInput.value = defaultPointSetColor
  store.pointSetsUI.colors = defaultPointSetColors
  const selectedPointSetIndex = store.pointSetsUI.selectedPointSetIndex
  if (store.pointSetsUI.hasScalars[selectedPointSetIndex]) {
    pointSetColorInput.style.display = 'none'
  } else {
    pointSetColorInput.style.display = 'inline-block'
  }

  pointSetColorRow.appendChild(pointSetColorInput)
}

export default createPointSetColorChooser
