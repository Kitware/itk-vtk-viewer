function toggleBackgroundColor(context) {
  context.itkVtkView.getRenderer().setBackground(context.main.backgroundColor)
  context.renderWindow.render()
}

export default toggleBackgroundColor
