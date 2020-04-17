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
        const visibility = store.imageUI.componentVisibilities[component]
        actorProp.setRGBTransferFunction(component, lutProxy.getLookupTable())
        actorProp.setPiecewiseFunction(
          component,
          pwfProxy.getPiecewiseFunction()
        )
        actorProp.setComponentWeight(component, visibility)
      }
    })
  }
}

export default updateSliceProperties
