function toggleAxes(context, event, actionMeta) {
  if (actionMeta) {
    context.main.axesEnabled = actionMeta.state.value.active.axes === 'enabled'
  }
  if (context.main.axesButtonInput) {
    context.main.axesButtonInput.checked = context.main.axesEnabled
  }
}

export default toggleAxes
