function applySlicingPlanes(context, event) {
  const slicingPlanes = event.data

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    const name = context.images.selectedName
    const imageVisible = context.layers.actorContext.get(name).visible
    if (imageVisible) {
      switch (context.main.viewMode) {
        case 'Volume':
          volumeRep.setXSliceVisibility(slicingPlanes.x.visible)
          volumeRep.setYSliceVisibility(slicingPlanes.y.visible)
          volumeRep.setZSliceVisibility(slicingPlanes.z.visible)
          break
        case 'XPlane':
          volumeRep.setXSliceVisibility(slicingPlanes.x.visible)
          volumeRep.getActors()[0].setVisibility(true)
          break
        case 'YPlane':
          volumeRep.setYSliceVisibility(slicingPlanes.y.visible)
          volumeRep.getActors()[1].setVisibility(true)
          break
        case 'ZPlane':
          volumeRep.setZSliceVisibility(slicingPlanes.z.visible)
          volumeRep.getActors()[2].setVisibility(true)
          break
      }
    } else {
      volumeRep.setXSliceVisibility(false)
      volumeRep.setYSliceVisibility(false)
      volumeRep.setZSliceVisibility(false)
    }
    if (
      slicingPlanes.x.visible ||
      slicingPlanes.y.visible ||
      slicingPlanes.z.visible
    ) {
      context.itkVtkView.setViewPlanes(true)
    } else {
      context.itkVtkView.setViewPlanes(false)
    }
  }

  context.service.send('RENDER')
}

export default applySlicingPlanes
