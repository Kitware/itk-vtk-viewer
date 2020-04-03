
function updateVolumeProperties(store) {
  const numberOfComponents = store.imageUI.numberOfComponents
  if (!!store.imageUI.representationProxy) {
    const volumeProps = store.imageUI.representationProxy.getVolumes()
    volumeProps.forEach(volume => {
      const volumeProperty = volume.getProperty()
      for (let component = 0; component < numberOfComponents; component++) {
        const lut = store.imageUI.lookupTableProxies[
          component
        ].getLookupTable()
        const piecewiseFunction = store.imageUI.piecewiseFunctionProxies[
          component
        ].getPiecewiseFunction()
        const visibility = store.imageUI.componentVisibilities[component]
        volumeProperty.setRGBTransferFunction(component, lut)
        volumeProperty.setScalarOpacity(component, piecewiseFunction)
        volumeProperty.setComponentWeight(component, visibility)
      }
    })
  }
}

export default updateVolumeProperties