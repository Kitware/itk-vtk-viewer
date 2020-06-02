import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

import updateGradientOpacity from './updateGradientOpacity'

function updateVolumeProperties(store) {
  const numberOfComponents = store.imageUI.numberOfComponents
  if (!!store.imageUI.representationProxy) {
    const volumeProps = store.imageUI.representationProxy.getVolumes()
    volumeProps.forEach((volume, volIdx) => {
      const volumeProperty = volume.getProperty()
      let componentsVisible = false
      for (let component = 0; component < numberOfComponents; component++) {
        const lut = store.imageUI.lookupTableProxies[component].getLookupTable()
        const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
          component
        ].getPiecewiseFunction()
        const componentVisibility =
          store.imageUI.componentVisibilities[component]
        componentsVisible = componentVisibility.visible
          ? true
          : componentsVisible
        volumeProperty.setRGBTransferFunction(component, lut)
        volumeProperty.setScalarOpacity(component, piecewiseFunction)
        if (componentVisibility.visible) {
          volumeProperty.setComponentWeight(
            component,
            componentVisibility.weight
          )
        } else {
          volumeProperty.setComponentWeight(component, 0.0)
        }
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
