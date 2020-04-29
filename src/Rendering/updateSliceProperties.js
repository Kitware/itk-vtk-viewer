function updateSliceProperties(store) {
  const visualizedComponents = store.imageUI.visualizedComponents
  const independentComponents = store.imageUI.independentComponents
  if (!!store.imageUI.representationProxy) {
    const sliceActors = store.imageUI.representationProxy.getActors()
    sliceActors.forEach((actor, actorIdx) => {
      const actorProp = actor.getProperty()
      actorProp.setIndependentComponents(independentComponents)
      visualizedComponents.forEach((componentIdx, fusedImgIdx) => {
        const lutProxy = store.imageUI.lookupTableProxies[componentIdx]
        const pwfProxy = store.imageUI.piecewiseFunctionProxies[componentIdx].slice
        actorProp.setRGBTransferFunction(fusedImgIdx, lutProxy.getLookupTable())
        actorProp.setPiecewiseFunction(
          fusedImgIdx,
          pwfProxy.getPiecewiseFunction()
        )
        const componentVisibility =
          store.imageUI.componentVisibilities[componentIdx]
        if (componentVisibility.visible) {
          actorProp.setComponentWeight(fusedImgIdx, componentVisibility.weight)
        } else {
          actorProp.setComponentWeight(fusedImgIdx, 0.0)
        }
      })
    })
  }
}

export default updateSliceProperties
