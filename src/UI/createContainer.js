import style from './Reference/ItkVtkViewer.module.css'

/* Create the container for the viewer. */
function createContainer(context) {
  // Todo: migrate from ViewerStore
  // context.container = document.createElement('div'),
  if (!!!context.rootContainer) {
    throw new Error('rootContainer must by supplied in the context')
  }

  context.viewContainers = new Map()
  const viewContainer = document.createElement('div')
  viewContainer.className = `${style.viewContainer}`
  context.viewContainers.set('unified', viewContainer)
  viewContainer.appendChild(context.container)
  context.rootContainer.appendChild(viewContainer)
}

export default createContainer
