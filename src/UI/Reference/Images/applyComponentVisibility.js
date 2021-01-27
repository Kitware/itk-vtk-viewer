import style from '../ItkVtkViewer.module.css'

function applyComponentVisibility(context, event) {
  const name = event.data.name
  if (name !== context.images.selectedName) {
    return
  }
  const actorContext = context.images.actorContext.get(name)
  const componentSelector = context.images.componentSelector

  actorContext.componentVisibilities.forEach((visibility, compIdx) => {
    const element = componentSelector.querySelector(
      `input[data-component-index="${compIdx}"][type="checkbox"]`
    )
    element.checked = visibility
  })
}

export default applyComponentVisibility
