import vtkMath from 'vtk.js/Sources/Common/Core/Math'
import { transformVec3 } from 'vtk.js/Sources/Widgets/Widgets3D/ImageCroppingWidget/helpers'

function resetCroppingPlanes(context) {
  const dims = context.main.croppingVirtualImage.getDimensions()
  const direction = context.main.croppingVirtualImage.getDirection()
  const indexToWorld = context.main.croppingVirtualImage.getIndexToWorld()
  const croppingPlanes = [
    {
      origin: Array.from(transformVec3([0, 0, 0], indexToWorld)),
      normal: Array.from(direction.slice(0, 3)),
    },
    {
      origin: Array.from(
        transformVec3([dims[1], dims[1], dims[2]], indexToWorld)
      ),
      normal: vtkMath.multiplyScalar(Array.from(direction.slice(0, 3)), -1),
    },
    {
      origin: Array.from(transformVec3([0, 0, 0], indexToWorld)),
      normal: Array.from(direction.slice(3, 6)),
    },
    {
      origin: Array.from(
        transformVec3([dims[0], dims[1], dims[2]], indexToWorld)
      ),
      normal: vtkMath.multiplyScalar(Array.from(direction.slice(3, 6)), -1),
    },
    {
      origin: Array.from(transformVec3([0, 0, 0], indexToWorld)),
      normal: Array.from(direction.slice(6, 9)),
    },
    {
      origin: Array.from(
        transformVec3([dims[0], dims[1], dims[2]], indexToWorld)
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
