function applyGradientOpacity(context, event) {
  const name = event.data.name
  const gradientOpacity = event.data.gradientOpacity

  context.images.gradientOpacitySlider.value = gradientOpacity
}

export default applyGradientOpacity
