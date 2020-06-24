import { reaction, observable, action, toJS } from 'mobx'

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'

import style from '../ItkVtkViewer.module.css'

import createColorMapIconSelector from '../createColorMapIconSelector'
import customColorMapIcon from '../customColorMapIcon'

function createColorRangeInput(store, uiContainer) {
  const minimumInput = document.createElement('input')
  minimumInput.type = 'number'
  minimumInput.setAttribute('class', style.numberInput)
  const maximumInput = document.createElement('input')
  maximumInput.type = 'number'
  maximumInput.setAttribute('class', style.numberInput)

  function updateColorRangeInput() {
    const selectedIndex = store.geometriesUI.selectedGeometryIndex
    if (
      !store.geometriesUI.hasScalars[selectedIndex] ||
      store.geometriesUI.hasOnlyDirectColors[selectedIndex]
    ) {
      return
    }
    const colorByKey = store.geometriesUI.colorBy[selectedIndex].value
    const [location, colorByArrayName] = colorByKey.split(':')
    const geometry = store.geometriesUI.geometries[selectedIndex]
    const dataArray =
      location === 'pointData'
        ? geometry.getPointData().getArrayByName(colorByArrayName)
        : geometry.getCellData().getArrayByName(colorByArrayName)
    const range = dataArray.getRange()

    minimumInput.min = range[0]
    minimumInput.max = range[1]
    maximumInput.min = range[0]
    maximumInput.max = range[1]
    const data = dataArray.getData()
    if (data instanceof Float32Array || data instanceof Float64Array) {
      const step = (range[1] - range[0]) / 100.0
      minimumInput.step = step
      maximumInput.step = step
    }

    const colorRange = store.geometriesUI.selectedColorRange
    minimumInput.value = colorRange[0]
    maximumInput.value = colorRange[1]
  }

  function addColorRangesReactions(index, colorRanges) {
    if (store.geometriesUI.colorRangesReactions.has(index)) {
      const disposer = store.geometriesUI.colorRangesReactions.get(index)
      disposer()
    }
    const disposer = reaction(
      () => {
        return toJS(store.geometriesUI.colorRanges)
      },
      colorRanges => {
        if (index !== store.geometriesUI.selectedGeometryIndex) {
          return
        }
        const colorRange = store.geometriesUI.selectedColorRange
        if (!!colorRange) {
          minimumInput.value = colorRange[0]
          maximumInput.value = colorRange[1]
          const lutProxy = store.geometriesUI.selectedLookupTableProxy
          const colorTransferFunction = lutProxy.getLookupTable()
          colorTransferFunction.setMappingRange(...colorRange)
          colorTransferFunction.updateRange()
          if (!store.renderWindow.getInteractor().isAnimating()) {
            store.renderWindow.render()
          }
        }
      }
    )
    store.geometriesUI.colorRangesReactions.set(index, disposer)
  }

  function setDefaultColorRangesColorMaps() {
    const colorByOptions = store.geometriesUI.colorByOptions
    if (!!!colorByOptions || colorByOptions.length === 0) {
      return
    }

    const geometries = store.geometriesUI.geometries
    colorByOptions.forEach((options, index) => {
      const geometry = geometries[index]
      if (!store.geometriesUI.colorRanges.has(index)) {
        const colorRanges = observable(new Map())
        if (options) {
          options.forEach(option => {
            const [location, colorByArrayName] = option.value.split(':')
            const dataArray =
              location === 'pointData'
                ? geometry.getPointData().getArrayByName(colorByArrayName)
                : geometry.getCellData().getArrayByName(colorByArrayName)
            const range = dataArray.getRange()
            colorRanges.set(option.value, range)
          })
        }
        store.geometriesUI.colorRanges.set(index, colorRanges)
        addColorRangesReactions(index, colorRanges)
      } else {
        // Constrain by min / max of possibly new inputs
        const colorRanges = store.geometriesUI.colorRanges.get(index)
        !!options &&
          options.forEach(option => {
            const [location, colorByArrayName] = option.value.split(':')
            const dataArray =
              location === 'pointData'
                ? geometry.getPointData().getArrayByName(colorByArrayName)
                : geometry.getCellData().getArrayByName(colorByArrayName)
            const range = dataArray.getRange()

            if (colorRanges.has(option.value)) {
              const current = colorRanges.get(option.value)
              if (current[0] < range[0] || current[1] > range[1]) {
                const newRange = current.slice()
                if (current[0] < range[0]) {
                  newRange[0] = range[0]
                }
                if (current[1] > range[1]) {
                  newRange[1] = range[1]
                }
                colorRanges.set(option.value, newRange)
              }
            } else {
              colorRanges.set(option.value, range)
            }
          })
        addColorRangesReactions(index, colorRanges)
      }
      if (store.geometriesUI.colorMaps.length <= index) {
        const defaultColorMap = 'Viridis (matplotlib)'
        store.geometriesUI.colorMaps.push(defaultColorMap)
        const lutProxy = store.geometriesUI.selectedLookupTableProxy
        if (!!lutProxy) {
          lutProxy.setPresetName(defaultColorMap)
        }
      }
      if (store.geometriesUI.colorMaps.length <= index) {
        const defaultColorMap = 'Viridis (matplotlib)'
        store.geometriesUI.colorMaps.push(defaultColorMap)
        const lutProxy = store.geometriesUI.selecetdLookupTableProxy
        if (!!lutProxy) {
          lutProxy.setPresetName(defaultColorMap)
        }
      }
    })
    updateColorRangeInput()
  }

  setDefaultColorRangesColorMaps()

  reaction(
    () => {
      return store.geometriesUI.selectedColorRange
    },
    colorRange => {
      if (!!colorRange) {
        minimumInput.value = colorRange[0]
        maximumInput.value = colorRange[1]
        const lutProxy = store.geometriesUI.selectedLookupTableProxy
        const colorTransferFunction = lutProxy.getLookupTable()
        colorTransferFunction.setMappingRange(...colorRange)
        colorTransferFunction.updateRange()
      }
    }
  )

  minimumInput.addEventListener(
    'change',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      const selectedIndex = store.geometriesUI.selectedGeometryIndex
      const colorByKey = store.geometriesUI.colorBy[selectedIndex].value
      const range = store.geometriesUI.colorRanges
        .get(selectedIndex)
        .get(colorByKey)
      range[0] = Number(event.target.value)
      store.geometriesUI.colorRanges.get(selectedIndex).set(colorByKey, range)
    })
  )
  maximumInput.addEventListener(
    'change',
    action(event => {
      event.preventDefault()
      event.stopPropagation()
      const selectedIndex = store.geometriesUI.selectedGeometryIndex
      const colorByKey = store.geometriesUI.colorBy[selectedIndex].value
      const range = store.geometriesUI.colorRanges
        .get(selectedIndex)
        .get(colorByKey)
      range[1] = Number(event.target.value)
      store.geometriesUI.colorRanges.get(selectedIndex).set(colorByKey, range)
    })
  )

  const colorMapSelector = document.createElement('div')
  colorMapSelector.id = `${store.id}-geometryColorMapSelector`

  const iconSelector = createColorMapIconSelector(colorMapSelector)

  function updateColorCanvas() {
    const geometryIndex = store.geometriesUI.selectedGeometryIndex
    if (
      !store.geometriesUI.hasScalars[selectedIndex] ||
      store.geometriesUI.hasOnlyDirectColors[geometryIndex]
    ) {
      return
    }
    const colorMap = store.geometriesUI.colorMaps[geometryIndex]
    const lookupTableProxy = store.geometriesUI.selectedLookupTableProxy
    const colorTransferFunction = lookupTableProxy.getLookupTable()

    if (colorMap.startsWith('Custom')) {
      lookupTableProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
      const colorRange = store.geometriesUI.selectedColorRange
      const isIcons = iconSelector.getIcons()
      if (!!!customIcon) {
        const colorMapIcon = customColorMapIcon(
          colorTransferFunction,
          colorDataRange
        )
        customIcon = { iconFilePath: colorMapIcon, iconValue: colorMap }
        icons.push(customIcon)
        iconSelector.refresh(icons)
      } else if (isIcons[isIcons.length - 1].iconValue !== colorMap) {
        const colorMapIcon = customColorMapIcon(
          colorTransferFunction,
          colorDataRange
        )
        isIcons[isIcons.length - 1].element.src = colorMapIcon
        isIcons[isIcons.length - 1].iconFilePath = colorMapIcon
        isIcons[isIcons.length - 1].iconValue = colorMap
        isIcons[isIcons.length - 1].element.setAttribute('icon-value', colorMap)
        isIcons[isIcons.length - 1].element.setAttribute('alt', colorMap)
        isIcons[isIcons.length - 1].element.setAttribute('title', colorMap)
      }
    } else {
      lookupTableProxy.setPresetName(colorMap)
      lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
    }
    iconSelector.setSelectedValue(colorMap)
    if (!store.renderWindow.getInteractor().isAnimating()) {
      store.renderWindow.render()
    }
  }
  let customIcon = null
  reaction(
    () => {
      return store.geometriesUI.colorMaps.slice()
    },
    colorMaps => {
      updateColorCanvas()
    }
  )
  colorMapSelector.addEventListener('changed', event => {
    event.preventDefault()
    event.stopPropagation()
    const geometryIndex = store.geometriesUI.selectedGeometryIndex
    store.geometriesUI.colorMaps[
      geometryIndex
    ] = iconSelector.getSelectedValue()
  })
  const geometryIndex = store.geometriesUI.selectedGeometryIndex
  iconSelector.setSelectedValue(store.geometriesUI.colorMaps[geometryIndex])

  reaction(
    () => {
      return store.geometriesUI.colorByOptions.slice()
    },
    () => {
      setDefaultColorRangesColorMaps()
    }
  )

  reaction(
    () => {
      return store.geometriesUI.selectedGeometryIndex
    },
    selectedIndex => {
      const directColors = store.geometriesUI.hasOnlyDirectColors
      if (directColors[selectedIndex]) {
        uiContainer.style.display = 'flex'
        updateColorRangeInput()
        updateColorCanvas()
      } else {
        uiContainer.style.display = 'none'
      }
    }
  )
  reaction(
    () => {
      return store.geometriesUI.colorBy.slice()
    },
    () => {
      updateColorRangeInput()
      updateColorCanvas()
    }
  )

  updateColorCanvas()
  const directColors = store.geometriesUI.hasOnlyDirectColors
  const selectedIndex = store.geometriesUI.selectedGeometryIndex
  if (directColors[selectedIndex]) {
    uiContainer.style.display = 'flex'
  } else {
    uiContainer.style.display = 'none'
  }

  uiContainer.appendChild(minimumInput)
  uiContainer.appendChild(colorMapSelector)
  uiContainer.appendChild(maximumInput)
}

export default createColorRangeInput
