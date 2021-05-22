import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import { transformVec3 } from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget/helpers'

function resetCroppingPlanes(context) {
  const dims = context.main.croppingVirtualImage.getDimensions()
  const direction = context.main.croppingVirtualImage.getDirection()
  const midpoints = [dims[0] / 2, dims[1] / 2, dims[2] / 2]
  const indexToWorld = context.main.croppingVirtualImage.getIndexToWorld()
  const croppingPlanes = [
    {
      center: Array.from(
        transformVec3([0, midpoints[1], midpoints[2]], indexToWorld)
      ),
      normal: Array.from(direction.slice(0, 3)),
    },
    {
      center: Array.from(
        transformVec3([dims[1], midpoints[1], midpoints[2]], indexToWorld)
      ),
      normal: vtkMath.multiplyScalar(Array.from(direction.slice(0, 3)), -1),
    },
    {
      center: Array.from(
        transformVec3([midpoints[0], 0, midpoints[2]], indexToWorld)
      ),
      normal: Array.from(direction.slice(3, 6)),
    },
    {
      center: Array.from(
        transformVec3([midpoints[0], dims[1], midpoints[2]], indexToWorld)
      ),
      normal: vtkMath.multiplyScalar(Array.from(direction.slice(3, 6)), -1),
    },
    {
      center: Array.from(
        transformVec3([midpoints[0], midpoints[1], 0], indexToWorld)
      ),
      normal: Array.from(direction.slice(6, 9)),
    },
    {
      center: Array.from(
        transformVec3([midpoints[0], midpoints[1], dims[2]], indexToWorld)
      ),
      normal: vtkMath.multiplyScalar(Array.from(direction.slice(6, 9)), -1),
    },
  ]
  context.service.send({
    type: 'CROPPING_PLANES_CHANGED',
    data: croppingPlanes,
  })
}

export default resetCroppingPlanes
