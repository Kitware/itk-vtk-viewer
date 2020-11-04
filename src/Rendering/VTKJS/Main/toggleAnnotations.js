function toggleAnnotations(context, event, actionMeta) {
  let annotationsEnabled = context.main.annotationsEnabled
  if (actionMeta) {
    annotationsEnabled = actionMeta.state.value.active.annotations === 'enabled'
  }
  context.itkVtkView.setOrientationAnnotationVisibility(annotationsEnabled)
}

export default toggleAnnotations
