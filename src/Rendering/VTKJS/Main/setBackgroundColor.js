function setBackgroundColor(context, event) {
  if (event.data) {
    context.main.backgroundColor = event.data
  }
  context.itkVtkView.setBackground(context.main.backgroundColor)
  context.renderWindow.render()
}

export default setBackgroundColor
