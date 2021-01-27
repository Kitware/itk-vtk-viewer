function applyLabelNames(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const labelNames = event.data.labelNames

  const optionsList = []
  labelNames.forEach((name, label) =>
    optionsList.push(
      `<option ${
        label === actorContext.selectedLabel ? 'selected' : ''
      } value="${label}">${name}</option>`
    )
  )

  optionsList.unshift('<option value="all">All</option>')
  context.images.labelSelector.innerHTML = optionsList.join('')
}

export default applyLabelNames
