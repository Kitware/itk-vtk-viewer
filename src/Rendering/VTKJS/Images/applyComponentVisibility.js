import { applyComponentWeights } from './applyComponentWeights'

function applyComponentVisibility(context, event) {
  const name = event.data.name
  const index = event.data.component
  const visibility = event.data.visibility

  const actorContext = context.images.actorContext.get(name)
  const componentVisibilities = actorContext.componentVisibilities
  const visualizedComponents = actorContext.visualizedComponents

  if (visibility && visualizedComponents.indexOf(index) < 0) {
    // add component to visualizedComponents
    visualizedComponents.push(index)
    for (let i = 0; i < visualizedComponents.length; i++) {
      if (!componentVisibilities[visualizedComponents[i]]) {
        visualizedComponents.splice(i, 1)
        break
      }
    }
    context.service.send({ type: 'UPDATE_RENDERED_IMAGE', data: { name } })
  }

  applyComponentWeights(context, name)
}

export default applyComponentVisibility
