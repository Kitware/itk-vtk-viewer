import style from '../ItkVtkViewer.module.css'

function updateAvailableComponents(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  if (image) {
    const components = image.imageType.components
    const viewerDOMId = context.id
    const collapsibleClass = `${viewerDOMId}-collapsible`
    if (components > 1 && actorContext.independentComponents) {
      context.images.componentRow.style.display = 'flex'
      context.images.componentRow.classList.add(collapsibleClass)
    } else {
      context.images.componentRow.style.display = 'none'
      context.images.componentRow.classList.remove(collapsibleClass)
    }

    context.images.componentSelector.innerHTML = new Array(components)
      .fill(undefined)
      .map((_, ii) => ii)
      .map(
        (idx, component) =>
          `<input name="tabs" type="radio" id="tab-${component}" ${
            idx === 0 ? 'checked="checked"' : ''
          } class="${
            style.componentTab
          }" data-component-index="${component}"/><label for="tab-${component}" class="${
            style.compTabLabel
          }">&nbsp;${component}&nbsp;<input type="checkbox" ${
            actorContext.componentVisibilities[idx] ? 'checked="checked"' : ''
          } class="${
            style.componentVisibility
          }" data-component-index="${component}"\></label>`
      )
      .join('')
    context.images.componentSelector.value = actorContext.selectedComponent
  }
}

export default updateAvailableComponents
