function viewModeZPlane(context) {
  context.itkVtkView.setViewMode('ZPlane')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSliceVisibility(false)
    volumeRep.setYSliceVisibility(false)
    volumeRep.setZSliceVisibility(true)
    volumeRep.setVolumeVisibility(false)
    const annotations = context.main.annotationsEnabled
    const outlineActors = context.itkVtkView.getSliceOutlineActors()
    if (annotations) {
      outlineActors[0].setVisibility(false)
      outlineActors[1].setVisibility(false)
      outlineActors[2].setVisibility(true)
    }
    context.service.send('RENDER')
  }
}

export default viewModeZPlane
