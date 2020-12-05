import { OpacityMode } from 'vtk.js/Sources/Rendering/Core/VolumeProperty/Constants'

function updateVolumeProperties(store) {
  const visualizedComponents = store.imageUI.visualizedComponents
  if (!!store.imageUI.representationProxy) {
    const volumeProps = store.imageUI.representationProxy.getVolumes()
    volumeProps.forEach((volume, volIdx) => {
      const volumeProperty = volume.getProperty()
      let componentsVisible = false
      // callback(currentValue, index, ...)
      // visualizedComponents = [2, 4, 6]
      //   currentValues: 2, 4, 6   <- Global indices in the original image data, on which stored stuff (txfunc, colormap) are keyed
      //   indexes:       0, 1, 2   <- Component indices in the fused image, what the mapper/property needs to know
      visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
        const lut = store.imageUI.lookupTableProxies[
          componentIdx
        ].getLookupTable()
        const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
          componentIdx
        ].volume.getPiecewiseFunction()
        const componentVisibility =
          store.imageUI.componentVisibilities[componentIdx]
        componentsVisible = componentVisibility.visible
          ? true
          : componentsVisible
        volumeProperty.setRGBTransferFunction(fusedImgIdx, lut)
        volumeProperty.setScalarOpacity(fusedImgIdx, piecewiseFunction)
        if (componentVisibility.visible) {
          volumeProperty.setComponentWeight(
            fusedImgIdx,
            componentVisibility.weight
          )
        } else {
          volumeProperty.setComponentWeight(fusedImgIdx, 0.0)
        }
      })

      if (!!store.imageUI.labelMap) {
        let mode = OpacityMode.PROPORTIONAL
        if (!componentsVisible) {
          mode = OpacityMode.FRACTIONAL
        }
        const numberOfComponents = store.imageUI.numberOfComponents
        volumeProperty.setOpacityMode(numberOfComponents, mode)
      }
    })
  }
}

export default updateVolumeProperties
