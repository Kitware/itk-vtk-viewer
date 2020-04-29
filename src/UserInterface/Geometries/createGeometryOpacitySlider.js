import { reaction, action } from 'mobx'

import style from '../ItkVtkViewer.module.css'
import applyContrastSensitiveStyle from '../applyContrastSensitiveStyle'

import opacityIcon from '../icons/opacity.svg'

function createGeometryOpacitySlider(store, geometryColorRow) {
  const defaultGeometryOpacity = 1.0

  const sliderEntry = document.createElement('div')
  sliderEntry.setAttribute('class', style.sliderEntry)
  sliderEntry.innerHTML = `
    <div itk-vtk-tooltip itk-vtk-tooltip-bottom itk-vtk-tooltip-content="Opacity" class="${style.gradientOpacitySlider}">
      ${opacityIcon}
    </div>
    <input type="range" min="0" max="1" value="${defaultGeometryOpacity}" step="0.01"
      id="${store.id}-geometryOpacitySlider"
      class="${style.slider}" />`
  const opacityElement = sliderEntry.querySelector(
    `#${store.id}-geometryOpacitySlider`
  )
  const sliderEntryDiv = sliderEntry.children[0]
  applyContrastSensitiveStyle(store, 'invertibleButton', sliderEntryDiv)

  reaction(
    () => {
      return store.geometriesUI.geometries.slice()
    },
    geometries => {
      if (!!!geometries || geometries.length === 0) {
        return
      }

      geometries.forEach((geometry, index) => {
        if (store.geometriesUI.opacities.length <= index) {
          store.geometriesUI.opacities.push(defaultGeometryOpacity)
        }
      })
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
      opacityElement.value = store.geometriesUI.opacities[selectedGeometryIndex]
    }
  )

  reaction(
    () => {
      return store.geometriesUI.selectedGeometryIndex
    },
    selectedGeometryIndex => {
      opacityElement.value = store.geometriesUI.opacities[selectedGeometryIndex]
    }
  )

  function applyOpacities(opacities) {
    opacities.forEach((opacity, index) => {
             store.geometriesUI.representationProxies[index].setOpacity(opacity)
      })

    store.renderWindow.render() 
    const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
    opacityElement.value = opacities[selectedGeometryIndex]
  }

  reaction(() => {
     return store.geometriesUI.opacities.slice() 
   }, applyOpacities)

  opacityElement.addEventListener(
    'input',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      const selectedGeometryIndex = store.geometriesUI.selectedGeometryIndex
      store.geometriesUI.opacities[selectedGeometryIndex] = Number(
        event.target.value
      )
    })
  )

  const defaultGeometryOpacities = new Array(
    store.geometriesUI.geometries.length
  )
  defaultGeometryOpacities.fill(defaultGeometryOpacity)
  opacityElement.value = defaultGeometryOpacity
  store.geometriesUI.opacities = defaultGeometryOpacities
  applyOpacities(store.geometriesUI.opacities)

  geometryColorRow.appendChild(sliderEntry)
  }

export default createGeometryOpacitySlider
