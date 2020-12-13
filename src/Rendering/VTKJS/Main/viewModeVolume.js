function viewModeVolume(context) {
  context.itkVtkView.setViewMode('Volume')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    const slicingPlanes = context.main.slicingPlanes
    volumeRep.setXSliceVisibility(slicingPlanes.x.visible)
    volumeRep.setYSliceVisibility(slicingPlanes.y.visible)
    volumeRep.setZSliceVisibility(slicingPlanes.z.visible)
    volumeRep.setVolumeVisibility(true)
    const annotations = context.main.annotationsEnabled
    const outlineActors = context.itkVtkView.getSliceOutlineActors()
    if (annotations) {
      outlineActors[0].setVisibility(slicingPlanes.x.visible)
      outlineActors[1].setVisibility(slicingPlanes.y.visible)
      outlineActors[2].setVisibility(slicingPlanes.z.visible)
    }
    context.service.send('RENDER')
  }
}

export default viewModeVolume
