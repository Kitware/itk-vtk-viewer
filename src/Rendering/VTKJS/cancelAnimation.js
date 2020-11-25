function cancelAnimation(context, event) {
  const identifier = event.data
  context.renderWindow.getInteractor().cancelAnimation(identifier)
}

export default cancelAnimation
