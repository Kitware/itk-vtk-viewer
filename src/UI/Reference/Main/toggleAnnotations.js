function toggleAnnotations(context, event, actionMeta) {
  const annotationsEnabled =
    actionMeta.state.value.active.annotations === 'enabled'
  context.main.annotationsButtonInput.checked = annotationsEnabled
  context.main.annotationsEnabled = annotationsEnabled
}

export default toggleAnnotations
