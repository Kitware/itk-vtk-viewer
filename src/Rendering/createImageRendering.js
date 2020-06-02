import { observable } from 'mobx'

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy'

import updateSliceProperties from './updateSliceProperties'

function createImageRendering(store, use2D) {
  const numberOfComponents = store.imageUI.numberOfComponents

  store.imageUI.lookupTableProxies = new Array(numberOfComponents)
  store.imageUI.piecewiseFunctionProxies = new Array(numberOfComponents)
  const initialComponentVisibilities = []
  for (let i = 0; i < numberOfComponents; i++) {
    initialComponentVisibilities.push({
      visible: true,
      weight: 1.0,
    })
  }
  store.imageUI.componentVisibilities = observable(initialComponentVisibilities)
  store.imageUI.colorMaps = new Array(numberOfComponents)
  store.imageUI.colorRanges = new Array(numberOfComponents)
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()
  volumeProperty.setIndependentComponents(true)
  const dataArray = store.imageUI.image.getPointData().getScalars()
  for (let component = 0; component < numberOfComponents; component++) {
    store.imageUI.lookupTableProxies[
      component
    ] = vtkLookupTableProxy.newInstance()
    store.imageUI.piecewiseFunctionProxies[
      component
    ] = vtkPiecewiseFunctionProxy.newInstance()
    store.imageUI.independentComponents = true
    let preset = 'Viridis (matplotlib)'
    // If a 2D RGB or RGBA
    if (
      use2D &&
      dataArray.getDataType() === 'Uint8Array' &&
      (numberOfComponents === 3 || numberOfComponents === 4)
    ) {
      preset = 'Grayscale'
      store.imageUI.independentComponents = false
    } else if (numberOfComponents === 1 && !!store.imageUI.labelMap) {
      preset = 'Grayscale'
    } else if (numberOfComponents === 2) {
      switch (component) {
        case 0:
          preset = 'BkMa'
          break
        case 1:
          preset = 'BkCy'
          break
      }
    } else if (numberOfComponents === 3) {
      switch (component) {
        case 0:
          preset = 'BkRd'
          break
        case 1:
          preset = 'BkGn'
          break
        case 2:
          preset = 'BkBu'
          break
      }
    }
    store.imageUI.colorMaps[component] = preset
    store.imageUI.lookupTableProxies[component].setPresetName(preset)

    const lut = store.imageUI.lookupTableProxies[component].getLookupTable()
    const range = dataArray.getRange(component)
    store.imageUI.colorRanges[component] = range
    lut.setMappingRange(range[0], range[1])
    volumeProperty.setRGBTransferFunction(component, lut)

    const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
      component
    ].getPiecewiseFunction()
    volumeProperty.setScalarOpacity(component, piecewiseFunction)

    const componentVisibility = store.imageUI.componentVisibilities[component]
    if (componentVisibility.visible) {
      volumeProperty.setComponentWeight(component, componentVisibility.weight)
    } else {
      volumeProperty.setComponentWeight(component, 0.0)
    }
  }

  // Now for the slice rendering
  updateSliceProperties(store)
}

export default createImageRendering
