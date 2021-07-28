function applyGradientOpacityScale(context, event) {
  const name = event.data.name
  const gradientOpacityScale = event.data.gradientOpacityScale

  context.images.gradientOpacityScaleSlider.value = gradientOpacityScale
}

export default applyGradientOpacityScale
