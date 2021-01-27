function toggleAxes(context) {
  context.itkVtkView.setEnableAxes(context.main.axesEnabled)
  context.service.send('RENDER')
}

export default toggleAxes
