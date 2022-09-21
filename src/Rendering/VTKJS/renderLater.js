function renderLater(context) {
  if (!context.renderWindow.getInteractor().isAnimating()) {
    context.itkVtkView.renderLater()
  }
}

export default renderLater
