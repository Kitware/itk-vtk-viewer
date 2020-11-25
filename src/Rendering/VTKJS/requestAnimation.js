function requestAnimation(context, event) {
  const identifier = event.data
  context.renderWindow.getInteractor().requestAnimation(identifier)
}

export default requestAnimation
