function toggleInterpolation(context) {
  context.itkVtkView.setPlanesUseLinearInterpolation(
    context.main.interpolationEnabled
  )
}

export default toggleInterpolation
