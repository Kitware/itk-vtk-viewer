import { vec3 } from 'gl-matrix'
import { computeBoundsFromPoints } from 'vtk.js/Sources/Common/Core/Math'
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox'

export const transformBounds = (transformingMat4, bounds) => {
  const in1 = [0, 0, 0]
  const in2 = [0, 0, 0]
  vtkBoundingBox.computeCornerPoints(bounds, in1, in2)
  const out1 = [0, 0, 0]
  const out2 = [0, 0, 0]
  vec3.transformMat4(out1, in1, transformingMat4)
  vec3.transformMat4(out2, in2, transformingMat4)

  return computeBoundsFromPoints(out1, out2, [...vtkBoundingBox.INIT_BOUNDS])
}
