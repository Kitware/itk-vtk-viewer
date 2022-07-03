import PolyData from '../PolyData.js'

function polyDataTransferables (polyData: PolyData): ArrayBuffer[] {
  const transferables: ArrayBuffer[] = []
  if (polyData.points != null) {
    transferables.push(polyData.points.buffer)
  }
  if (polyData.vertices != null) {
    transferables.push(polyData.vertices.buffer)
  }
  if (polyData.lines != null) {
    transferables.push(polyData.lines.buffer)
  }
  if (polyData.polygons != null) {
    transferables.push(polyData.polygons.buffer)
  }
  if (polyData.triangleStrips != null) {
    transferables.push(polyData.triangleStrips.buffer)
  }
  if (polyData.pointData != null) {
    transferables.push(polyData.pointData.buffer)
  }
  if (polyData.cellData != null) {
    transferables.push(polyData.cellData.buffer)
  }

  return transferables
}

export default polyDataTransferables
