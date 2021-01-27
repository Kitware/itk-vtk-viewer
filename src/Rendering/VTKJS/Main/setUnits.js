function setUnits(context, event) {
  if (event.data) {
    context.main.units = event.data
  }
  context.itkVtkView.setUnits(context.main.units)
}

export default setUnits
