function viewModeXPlane(context) {
  context.itkVtkView.setViewMode('XPlane')

  const volumeRep = context.images.representationProxy
  if (volumeRep) {
    volumeRep.setXSliceVisibility(true)
    volumeRep.setYSliceVisibility(false)
    volumeRep.setZSliceVisibility(false)
    volumeRep.setVolumeVisibility(false)
    const annotations = context.main.annotationsEnabled
    const outlineActors = context.itkVtkView.getSliceOutlineActors()
    if (annotations) {
      outlineActors[0].setVisibility(true)
      outlineActors[1].setVisibility(false)
      outlineActors[2].setVisibility(false)
    }
    context.service.send('RENDER')
  }
}

export default viewModeXPlane
