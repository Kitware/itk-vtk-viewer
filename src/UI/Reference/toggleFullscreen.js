import fullscreenMethods from './fullscreenMethods'

function toggleFullscreen(context, event, actionMeta) {
  const fullscreenEnabled =
    actionMeta.state.value.active.fullscreen === 'enabled'
  const fullscreenButtonInput = context.main.fullscreenButton.children[0]
  fullscreenButtonInput.checked = fullscreenEnabled

  // Triggered by operating system events, e.g. pressing Esc while in
  // Fullscreen or F11 when not in fullscreen
  if (fullscreenEnabled === document[fullscreenMethods[3]]) {
    return
  }

  const container = context.rootContainer
  const oldWidth = context.main.rootContainerOldWidth
  const oldHeight = context.main.rootContainerOldHeight

  if (fullscreenEnabled) {
    context.main.rootContainerOldWidth = container.style.width
    context.main.rootContainerOldHeight = container.style.height
    container.style.width = '100vw'
    container.style.height = '100vh'
    context.rootContainer[fullscreenMethods[0]]()
  } else {
    container.style.width = oldWidth
    container.style.height = oldHeight
    document[fullscreenMethods[1]]()
  }
}

export default toggleFullscreen
