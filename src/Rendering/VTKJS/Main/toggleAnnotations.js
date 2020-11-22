function toggleAnnotations(context) {
  let annotationsEnabled = context.main.annotationsEnabled
  context.itkVtkView.setOrientationAnnotationVisibility(annotationsEnabled)
}

export default toggleAnnotations
