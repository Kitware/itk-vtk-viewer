function toggleInterpolation(context, event, actionMeta) {
  if (context.main.interpolationButtonInput) {
    context.main.interpolationButtonInput.checked =
      context.main.interpolationEnabled
  }
}

export default toggleInterpolation
