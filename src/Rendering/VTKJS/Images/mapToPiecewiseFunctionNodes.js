import { getNodes } from 'itk-viewer-transfer-function-editor'

// grab head and tail or fallback to data range if 1 or less points
const getRange = nodes =>
  nodes.length > 1 ? [nodes[0].x, nodes[nodes.length - 1].x] : undefined

function mapToPiecewiseFunctionNodes(
  context,
  { data: { name, component, points } }
) {
  const actorContext = context.images.actorContext.get(name)
  const dataRange = actorContext.colorRangeBounds.get(component)

  if (!dataRange) return // viewer.setImagePiecewiseFunctionPoints called at start

  const nodes = getNodes(dataRange, points)
  const range = getRange(nodes) ?? dataRange

  context.service.send({
    type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
    data: {
      name,
      component,
      range,
      nodes,
    },
  })
}

export default mapToPiecewiseFunctionNodes
