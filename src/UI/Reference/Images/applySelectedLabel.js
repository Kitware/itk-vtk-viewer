function applySelectedLabel(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)

  const selectedLabel = event.data.selectedLabel

  if (selectedLabel === 'all') {
    context.images.labelSelector.selectedIndex = 0 // 'All' is first
  } else {
    context.images.labelImageWeightSlider.value = actorContext.labelImageWeights.get(
      selectedLabel
    )
    context.images.labelSelector.selectedIndex = parseInt(selectedLabel) + 1 // 'All' is first
  }
}

export default applySelectedLabel
