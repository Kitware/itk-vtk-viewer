function viewModeZPlane(context) {
  context.itkVtkView.setViewMode('ZPlane')

  if (!context.use2D) {
    context.main.xPlaneVisibleButton.style.display = 'none'
    context.main.xPlaneInvisibleButton.style.display = 'none'

    context.main.yPlaneVisibleButton.style.display = 'none'
    context.main.yPlaneInvisibleButton.style.display = 'none'

    context.main.zPlaneVisibleButton.style.display = 'none'
    context.main.zPlaneInvisibleButton.style.display = 'none'
  }

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
