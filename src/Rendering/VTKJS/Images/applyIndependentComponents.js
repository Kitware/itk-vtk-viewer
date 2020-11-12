function applyIndependentComponents(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const independentComponents = actorContext.independentComponents
  if (!!context.images.representationProxy) {
    const sliceActors = context.images.representationProxy.getActors()
    sliceActors.forEach((actor, actorIdx) => {
      const actorProp = actor.getProperty()
      actorProp.setIndependentComponents(independentComponents)
    })
  }
}

export default applyIndependentComponents
