import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

import updateGradientOpacity from './updateGradientOpacity'

function updateVolumeProperties(store) {
  const numberOfComponents = store.imageUI.numberOfComponents
  if (!!store.imageUI.representationProxy) {
    const volumeProps = store.imageUI.representationProxy.getVolumes()
    volumeProps.forEach(volume => {
      const volumeProperty = volume.getProperty()
      let componentsVisible = false
      for (let component = 0; component < numberOfComponents; component++) {
        const lut = store.imageUI.lookupTableProxies[component].getLookupTable()
        const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
          component
        ].getPiecewiseFunction()
        const visibility = store.imageUI.componentVisibilities[component]
        componentsVisible = visibility > 0 ? true : componentsVisible
        volumeProperty.setRGBTransferFunction(component, lut)
        volumeProperty.setScalarOpacity(component, piecewiseFunction)
        volumeProperty.setComponentWeight(component, visibility)
      }
      if (!!store.imageUI.labelMap) {
        let mode = OpacityMode.PROPORTIONAL
        if (!componentsVisible) {
          mode = OpacityMode.FRACTIONAL
        }
        volumeProperty.setOpacityMode(numberOfComponents, mode)
      }
    })
    updateGradientOpacity(store)
  }
}

export default updateVolumeProperties
