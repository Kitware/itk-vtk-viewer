function toggleRotate(context, event, actionMeta) {
  if (actionMeta) {
    context.main.rotateEnabled =
      actionMeta.state.value.active.rotate === 'enabled'
  }
  if (context.main.rotateButtonInput) {
    context.main.rotateButtonInput.checked = context.main.rotateEnabled
  }
}

export default toggleRotate
