/* Create the containers for the rendering views. */
function createRenderingViewContainers(context) {
  // Todo: migrate from ViewerStore
  // context.container = document.createElement('div'),
  if (!!!context.rootContainer) {
    throw new Error('rootContainer must by supplied in the context')
  }

  // Todo: migrate container creation from ViewerStore
  context.renderingViewContainers.set('volume', context.container)
}

export default createRenderingViewContainers
