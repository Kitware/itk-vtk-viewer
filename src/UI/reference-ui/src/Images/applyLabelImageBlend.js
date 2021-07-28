function applyLabelImageBlend(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const labelImageBlend = event.data.labelImageBlend

  const slider = context.images.labelImageBlendSlider

  slider.value = labelImageBlend

  const haveImage = !!actorContext.image
  if (haveImage) {
    slider.style.display = 'flex'
  } else {
    slider.style.display = 'none'
  }
}

export default applyLabelImageBlend
