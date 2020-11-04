function toggleAnnotations(context, event, actionMeta) {
  const annotationsEnabled =
    actionMeta.state.value.active.annotations === 'enabled'
  context.itkVtkView.setOrientationAnnotationVisibility(annotationsEnabled)
}

export default toggleAnnotations
