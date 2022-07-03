import Mesh from '../Mesh.js'

function meshTransferables (mesh: Mesh): ArrayBuffer[] {
  const transferables: ArrayBuffer[] = []
  if (mesh.points != null) {
    transferables.push(mesh.points.buffer)
  }
  if (mesh.pointData != null) {
    transferables.push(mesh.pointData.buffer)
  }
  if (mesh.cells != null) {
    transferables.push(mesh.cells.buffer)
  }
  if (mesh.cellData != null) {
    transferables.push(mesh.cellData.buffer)
  }

  return transferables
}

export default meshTransferables
