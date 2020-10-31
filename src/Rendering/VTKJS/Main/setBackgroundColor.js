function setBackgroundColor(context, event) {
  if (event.data) {
    context.main.backgroundColor = event.data
  }
  const backgroundColor = context.main.backgroundColor
  context.itkVtkView.setBackground(backgroundColor)
  context.renderWindow.render()
}

export default setBackgroundColor
