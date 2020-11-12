function render(context) {
  console.log('render event!')

  if (!context.renderWindow.getInteractor().isAnimating()) {
    context.renderWindow.render()
  }
}

export default render
