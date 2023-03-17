export function updateDrawer(context) {
  context.drawer.opened = !context.uiCollapsed

  const drawerChild = context.drawer.shadowRoot.children[0]
  if (drawerChild)
    drawerChild.style.width = context.drawer.opened
      ? 'var(--_container-width)'
      : ''
}

function toggleUICollapsed(context, event, actionMeta) {
  if (!context.uiContainer) {
    return
  }
  if (actionMeta) {
    context.uiCollapsed =
      actionMeta.state.value.active.uiCollapsed === 'enabled'
  }

  updateDrawer(context)

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
