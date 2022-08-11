import { vec3 } from 'gl-matrix'

// from vtk.js/Sources/Common/DataModel/BoundingBox
// Computes the two corners with minimal and miximal coordinates
function computeCornerPoints(bounds, point1, point2) {
  point1[0] = bounds[0]
  point1[1] = bounds[2]
  point1[2] = bounds[4]

  point2[0] = bounds[1]
  point2[1] = bounds[3]
  point2[2] = bounds[5]
  return point1
}

// from vtk.js/Sources/Common/Core/Math
function computeBoundsFromPoints(point1, point2, bounds) {
  bounds[0] = Math.min(point1[0], point2[0])
  bounds[1] = Math.max(point1[0], point2[0])
  bounds[2] = Math.min(point1[1], point2[1])
  bounds[3] = Math.max(point1[1], point2[1])
  bounds[4] = Math.min(point1[2], point2[2])
  bounds[5] = Math.max(point1[2], point2[2])
  return bounds
}

export const transformBounds = (transformingMat4, bounds) => {
  const in1 = [0, 0, 0]
  const in2 = [0, 0, 0]
  computeCornerPoints(bounds, in1, in2)
  const out1 = [0, 0, 0]
  const out2 = [0, 0, 0]
  vec3.transformMat4(out1, in1, transformingMat4)
  vec3.transformMat4(out2, in2, transformingMat4)

  return computeBoundsFromPoints(out1, out2, [])
}
