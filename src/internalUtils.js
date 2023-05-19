import { mat4 } from 'gl-matrix'

export function arraysEqual(a, b) {
  if (a === b) return true
  if (a == null || b == null) return false
  if (a.length !== b.length) return false
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

const makeMat4 = ({ direction, origin, spacing }) => {
  const mat = mat4.create()
  mat4.fromTranslation(mat, origin)

  mat[0] = direction[0]
  mat[1] = direction[1]
  mat[2] = direction[2]
  mat[4] = direction[3]
  mat[5] = direction[4]
  mat[6] = direction[5]
  mat[8] = direction[6]
  mat[9] = direction[7]
  mat[10] = direction[8]

  return mat4.scale(mat, mat, spacing)
}

export const makeIndexToWorld = ({
  direction: inDirection,
  origin,
  spacing,
}) => {
  // ITK (and VTKMath) uses row-major index axis, but gl-matrix uses column-major. Transpose.
  const DIMENSIONS = 3
  const direction = Array(inDirection.length)
  for (let idx = 0; idx < DIMENSIONS; ++idx) {
    for (let col = 0; col < DIMENSIONS; ++col) {
      direction[col + idx * 3] = inDirection[idx + col * DIMENSIONS]
    }
  }

  const origin3d = [...origin]
  if (origin3d[2] === undefined) origin3d[2] = 0

  const spacing3d = [...spacing]
  if (spacing3d[2] === undefined) spacing3d[2] = 1

  return makeMat4({ direction, origin: origin3d, spacing: spacing3d })
}
