import style from '../ItkVtkViewer.module.css'

function updateAvailableComponents(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image

  const components = image.imageType.components
  if (components > 1 && actorContext.independentComponents) {
    context.images.componentRow.style.display = 'flex'
  } else {
    context.images.componentRow.style.display = 'none'
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
          actorContext.componentWeights[idx] > 0.0 ? 'checked="checked"' : ''
        } class="${
          style.componentVisibility
        }" data-component-index="${component}"\></label>`
    )
    .join('')
  context.images.componentSelector.value = actorContext.selectedComponentIndex
}

export default updateAvailableComponents
