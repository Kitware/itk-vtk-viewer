function render(context) {
  if (!context.renderWindow.getInteractor().isAnimating()) {
    context.renderWindow.render()
  }
}

export default render
