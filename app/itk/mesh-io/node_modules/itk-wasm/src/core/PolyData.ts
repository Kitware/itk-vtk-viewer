import PolyDataType from './PolyDataType.js'
import TypedArray from './TypedArray.js'

class PolyData {
  name: string = 'PolyData'

  numberOfPoints: number
  points: Float32Array

  verticesBufferSize: number
  vertices: null | Uint32Array

  linesBufferSize: number
  lines: null | Uint32Array

  polygonsBufferSize: number
  polygons: null | Uint32Array

  triangleStripsBufferSize: number
  triangleStrips: null | Uint32Array

  numberOfPointPixels: number
  pointData: null | TypedArray

  numberOfCellPixels: number
  cellData: null | TypedArray

  constructor (public readonly polyDataType = new PolyDataType()) {
    this.polyDataType = polyDataType

    this.name = 'PolyData'

    this.numberOfPoints = 0
    this.points = new Float32Array()

    this.verticesBufferSize = 0
    this.vertices = null

    this.linesBufferSize = 0
    this.lines = null

    this.polygonsBufferSize = 0
    this.polygons = null

    this.triangleStripsBufferSize = 0
    this.triangleStrips = null

    this.numberOfPointPixels = 0
    this.pointData = null

    this.numberOfCellPixels = 0
    this.cellData = null
  }
}

export default PolyData
