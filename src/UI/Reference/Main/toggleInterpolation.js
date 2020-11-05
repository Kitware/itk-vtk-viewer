function toggleInterpolation(context, event, actionMeta) {
  if (actionMeta) {
    context.main.interpolationEnabled =
      actionMeta.state.value.active.interpolation === 'enabled'
  }
  if (context.main.interpolationButtonInput) {
    context.main.interpolationButtonInput.checked =
      context.main.interpolationEnabled
  }
}

export default toggleInterpolation
