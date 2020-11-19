import style from '../ItkVtkViewer.module.css'

function applyVisualizedComponents(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const componentSelector = context.images.componentSelector

  actorContext.visualizedComponents.forEach((visibility, compIdx) => {
    const element = componentSelector.querySelector(
      `input[data-component-index="${compIdx}"][type="checkbox"]`
    )
    element.checked = visibility
  })
}

export default applyVisualizedComponents
