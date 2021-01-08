function applyLabelNames(context, event) {
  const name = event.data.name
  const labelNames = event.data.labelNames

  context.itkVtkView.setLabelNames(labelNames)
}

export default applyLabelNames
