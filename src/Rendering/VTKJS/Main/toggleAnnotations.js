function toggleAnnotations(context) {
  let annotationsEnabled = context.main.annotationsEnabled
  context.itkVtkView.setOrientationAnnotationVisibility(annotationsEnabled)
  if (annotationsEnabled) {
    const outlineActors = context.itkVtkView.getSliceOutlineActors()
    const slicingPlanes = context.main.slicingPlanes
    switch (context.main.viewMode) {
      case 'Volume':
        outlineActors[0].setVisibility(slicingPlanes.x.visible)
        outlineActors[1].setVisibility(slicingPlanes.y.visible)
        outlineActors[2].setVisibility(slicingPlanes.z.visible)
        break
      case 'XPlane':
        outlineActors[0].setVisibility(true)
        outlineActors[1].setVisibility(false)
        outlineActors[2].setVisibility(false)
        break
      case 'YPlane':
        outlineActors[0].setVisibility(false)
        outlineActors[1].setVisibility(true)
        outlineActors[2].setVisibility(false)
        break
      case 'ZPlane':
        outlineActors[0].setVisibility(false)
        outlineActors[1].setVisibility(false)
        outlineActors[2].setVisibility(true)
        break
    }
  } else {
    context.itkVtkView
      .getSliceOutlineActors()
      .forEach(a => a.setVisibility(false))
  }
  context.service.send('RENDER')
}

export default toggleAnnotations
