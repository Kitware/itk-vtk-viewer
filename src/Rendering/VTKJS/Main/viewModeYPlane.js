function viewModeYPlane(context) {
  context.itkVtkView.setViewMode('YPlane')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSliceVisibility(false)
    volumeRep.setYSliceVisibility(true)
    volumeRep.setZSliceVisibility(false)
    volumeRep.setVolumeVisibility(false)
    const annotations = context.main.annotationsEnabled
    const outlineActors = context.itkVtkView.getSliceOutlineActors()
    if (annotations) {
      outlineActors[0].setVisibility(false)
      outlineActors[1].setVisibility(true)
      outlineActors[2].setVisibility(false)
    }
    context.service.send('RENDER')
  }
}

export default viewModeYPlane
