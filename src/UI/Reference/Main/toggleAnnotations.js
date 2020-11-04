function toggleAnnotations(context, event, actionMeta) {
  if (actionMeta) {
    context.main.annotationsEnabled =
      actionMeta.state.value.active.annotations === 'enabled'
  }
  if (context.main.annotationsButtonInput) {
    context.main.annotationsButtonInput.checked =
      context.main.annotationsEnabled
  }
}

export default toggleAnnotations
