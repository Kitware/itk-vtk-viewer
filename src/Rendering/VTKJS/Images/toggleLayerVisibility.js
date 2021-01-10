import applySlicingPlanes from '../Main/applySlicingPlanes'

function toggleLayerVisibility(context, event) {
  const name = event.data
  const actorContext = context.layers.actorContext.get(name)
  const visible = actorContext.visible

  context.itkVtkView.setImageVisibility(visible)

  if (visible) {
    applySlicingPlanes(context, { data: context.main.slicingPlanes })
  }

  context.service.send('RENDER')
}

export default toggleLayerVisibility
