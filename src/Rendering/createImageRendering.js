import { observable } from 'mobx'

import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import vtkPiecewiseFunctionProxy from 'vtk.js/Sources/Proxy/Core/PiecewiseFunctionProxy'

//import updateSliceProperties from './updateSliceProperties'

function createImageRendering(store, use2D) {
  const numberOfComponents = store.imageUI.numberOfComponents
  const totalComponents = store.imageUI.totalIntensityComponents

  store.imageUI.lookupTableProxies = new Array(totalComponents)
  store.imageUI.piecewiseFunctionProxies = new Array(totalComponents)
  const initialComponentVisibilities = []
  for (let i = 0; i < totalComponents; i++) {
    const visible =
      store.imageUI.visualizedComponents.indexOf(i) >= 0 ? true : false
    initialComponentVisibilities.push({
      visible: visible,
      weight: 1.0,
    })
  }
  store.imageUI.componentVisibilities = observable(initialComponentVisibilities)
  store.imageUI.colorMaps = new Array(totalComponents)
  store.imageUI.colorRanges = new Array(totalComponents)
  const volume = store.imageUI.representationProxy.getVolumes()[0]
  const volumeProperty = volume.getProperty()
  volumeProperty.setIndependentComponents(true)
  const dataArray = store.imageUI.image.getPointData().getScalars()
  if (dataArray.getNumberOfComponents() !== totalComponents) {
    console.error(
      `Mismatch between components in image scalars (${dataArray.getNumberOfComponents()}) and totalComponents (${totalComponents})`
    )
  }
  for (let component = 0; component < totalComponents; component++) {
    store.imageUI.lookupTableProxies[
      component
    ] = vtkLookupTableProxy.newInstance()
    store.imageUI.piecewiseFunctionProxies[component] = {
      slice: vtkPiecewiseFunctionProxy.newInstance(),
      volume: vtkPiecewiseFunctionProxy.newInstance(),
    }
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

    const fusedImgIndex = store.imageUI.visualizedComponents.indexOf(component)
    if (fusedImgIndex >= 0) {
      const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
        component
      ].volume.getPiecewiseFunction()

      volumeProperty.setScalarOpacity(fusedImgIndex, piecewiseFunction)
      volumeProperty.setRGBTransferFunction(fusedImgIndex, lut)

      const componentVisibility = store.imageUI.componentVisibilities[component]
      if (componentVisibility.visible) {
        volumeProperty.setComponentWeight(
          fusedImgIndex,
          componentVisibility.weight
        )
      } else {
        volumeProperty.setComponentWeight(fusedImgIndex, 0.0)
      }
    }
  }

  // Now for the slice rendering
  //updateSliceProperties(store)
}

export default createImageRendering
