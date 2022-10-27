function toggleUICollapsed(context, event, actionMeta) {
  if (!context.uiContainer) {
    return
  }
  if (actionMeta) {
    context.uiCollapsed =
      actionMeta.state.value.active.uiCollapsed === 'enabled'
  }

  context.drawer.opened = !context.uiCollapsed

  if (!context.uiCollapsed && context.images.selectedName) {
    context.service.send({
      type: 'SELECT_LAYER',
      data: context.images.selectedName,
    })
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
