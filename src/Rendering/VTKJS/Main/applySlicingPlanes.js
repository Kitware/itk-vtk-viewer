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
          break
        case 'YPlane':
          volumeRep.setYSliceVisibility(slicingPlanes.y.visible)
          break
        case 'ZPlane':
          volumeRep.setZSliceVisibility(slicingPlanes.z.visible)
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
}

export default applySlicingPlanes
