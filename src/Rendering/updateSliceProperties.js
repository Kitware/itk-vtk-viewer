function updateSliceProperties(store) {
  const numberOfComponents = store.imageUI.numberOfComponents
  const independentComponents = store.imageUI.independentComponents
  if (!!store.imageUI.representationProxy) {
    const sliceActors = store.imageUI.representationProxy.getActors()
    sliceActors.forEach(actor => {
      const actorProp = actor.getProperty()
      actorProp.setIndependentComponents(independentComponents)
      for (let component = 0; component < numberOfComponents; component++) {
        const lutProxy = store.imageUI.lookupTableProxies[component]
        const pwfProxy = store.imageUI.piecewiseFunctionProxies[component]
        actorProp.setRGBTransferFunction(component, lutProxy.getLookupTable())
        actorProp.setPiecewiseFunction(
          component,
          pwfProxy.getPiecewiseFunction()
        )
        const componentVisibility =
          store.imageUI.componentVisibilities[component]
        if (componentVisibility.visible) {
          actorProp.setComponentWeight(component, componentVisibility.weight)
        } else {
          actorProp.setComponentWeight(component, 0.0)
        }
      }
    })
  }
}

export default updateSliceProperties
