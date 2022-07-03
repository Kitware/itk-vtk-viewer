import IOTypes from '../core/IOTypes.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import TextFile from '../core/TextFile.js'
import BinaryFile from '../core/BinaryFile.js'
import TextStream from '../core/TextStream.js'
import BinaryStream from '../core/BinaryStream.js'
import Image from '../core/Image.js'
import Mesh from '../core/Mesh.js'
import PolyData from '../core/PolyData.js'

interface PipelineInput {
  // Backwards compatibility with IOTypes -- remove?
  path?: string
  type: typeof IOTypes[keyof typeof IOTypes] | typeof InterfaceTypes[keyof typeof InterfaceTypes]
  data: string | Uint8Array | TextStream | BinaryStream | TextFile | BinaryFile | Image | Mesh | PolyData
}

export default PipelineInput
