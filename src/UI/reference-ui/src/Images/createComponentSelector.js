import style from '../ItkVtkViewer.module.css'

function createComponentSelector(context, imageUIGroup) {
  const viewerDOMId = context.id

  const componentSelector = document.createElement('div')
  componentSelector.setAttribute('class', style.selector)
  componentSelector.id = `${viewerDOMId}-componentSelector`
  context.images.componentSelector = componentSelector

  const componentRow = document.createElement('div')
  componentRow.setAttribute('class', style.uiRow)
  // This row needs custom bottom padding, to aid in the illusion
  // that it's the tabbed portion of a tabbed pane
  componentRow.setAttribute('style', 'padding-bottom: 0px;')
  componentRow.className += ` ${viewerDOMId}-volumeComponents`
  context.images.componentRow = componentRow

  componentSelector.addEventListener('change', event => {
    event.preventDefault()
    event.stopPropagation()
    const selectedIndex = Number(event.target.dataset.componentIndex)
    if (event.target.type === 'radio') {
      context.service.send({
        type: 'SELECT_IMAGE_COMPONENT',
        data: { name: context.images.selectedName, component: selectedIndex },
      })
    } else if (event.target.type === 'checkbox') {
      const visibility = event.target.checked
      context.service.send({
        type: 'IMAGE_COMPONENT_VISIBILITY_CHANGED',
        data: {
          name: context.images.selectedName,
          component: selectedIndex,
          visibility,
        },
      })
    }
  })

  componentRow.appendChild(componentSelector)
  imageUIGroup.appendChild(componentRow)
}

export default createComponentSelector
