import { windowPointsForSort } from 'itk-viewer-transfer-function-editor'

const getNodes = (range, points) => {
  const delta = range[1] - range[0]
  const windowedPoints = windowPointsForSort(points)
  return windowedPoints.map(([x, y]) => ({
    x: range[0] + delta * x,
    y,
    midpoint: 0.5,
    sharpness: 0,
  }))
}

// grab head and tail or fallback to data range if 1 or less points
const getRange = nodes =>
  nodes.length > 1 ? [nodes[0].x, nodes[nodes.length - 1].x] : undefined

function mapToPiecewiseFunctionNodes(
  context,
  { data: { name, component, points } }
) {
  const actorContext = context.images.actorContext.get(name)
  const dataRange = actorContext.colorRangeBounds.get(component)

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
