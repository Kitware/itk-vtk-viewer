import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox'

const NDC_RANGE = [0, 1]

// unproject NDC box
const computeFrustumBoundingBox = renderer => {
  const view = renderer.getRenderWindow().getViews()[0]

  const dims = view.getViewportSize(renderer)
  const aspect = dims[0] / dims[1]

  const frustumBounds = [...vtkBoundingBox.INIT_BOUNDS]
  for (const x of NDC_RANGE) {
    for (const y of NDC_RANGE) {
      for (const z of NDC_RANGE) {
        const corner = renderer.normalizedDisplayToWorld(x, y, z, aspect)
        vtkBoundingBox.addPoint(frustumBounds, ...corner)
      }
    }
  }
  return frustumBounds
}

const computeCroppingPlanesBoundingBox = croppingPlanes => {
  const planeBounds = [...vtkBoundingBox.INIT_BOUNDS]
  croppingPlanes.forEach(({ origin }) =>
    vtkBoundingBox.addPoint(planeBounds, ...origin)
  )
  return planeBounds
}

const intersectBoxes = (b1, b2) =>
  b1.map(
    (bound, i) =>
      i % 2
        ? Math.min(bound, b2[i]) // high bound case
        : Math.max(bound, b2[i]) // low bound case
  )

export const computeRenderedBounds = ({
  main: { croppingPlanes, areCroppingPlanesTouched },
  itkVtkView,
}) => {
  const frustumBox = computeFrustumBoundingBox(itkVtkView.getRenderer())

  const areCroppingPlanesRelevant =
    croppingPlanes && croppingPlanes.length === 6 && areCroppingPlanesTouched
  return areCroppingPlanesRelevant
    ? intersectBoxes(
        computeCroppingPlanesBoundingBox(croppingPlanes),
        frustumBox
      )
    : frustumBox
}
