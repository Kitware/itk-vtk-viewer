/* Create the container for the viewer. */
function createContainer(context) {
  // Todo: migrate from ViewerStore
  // context.container = document.createElement('div'),
  if (!!!context.rootContainer) {
    throw new Error('rootContainer must by supplied in the context')
  }
  context.rootContainer.appendChild(context.container)
}

export default createContainer
