function toggleUICollapsed(context, event, actionMeta) {
  if (!context.uiContainer) {
    return
  }
  if (actionMeta) {
    context.uiCollapsed =
      actionMeta.state.value.active.uiCollapsed === 'enabled'
  }

  const viewerDOMId = context.id
  let elements = context.uiContainer.querySelectorAll(
    `.${viewerDOMId}-collapsible`
  )
  let count = elements.length
  if (context.uiCollapsed) {
    while (count--) {
      elements[count].style.display = 'none'
    }
  } else {
    while (count--) {
      elements[count].style.display = 'flex'
    }
  }
  if (!context.use2D && !!context.main.planeUIGroup) {
    if (context.uiCollapsed && context.main.viewMode === 'Volume') {
      context.main.planeUIGroup.style.display = 'none'
    } else {
      context.main.planeUIGroup.style.display = 'block'
    }
  }
}

export default toggleUICollapsed
