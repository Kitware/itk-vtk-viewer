import IntTypes from './IntTypes.js'
import FloatTypes from './FloatTypes.js'
import PixelTypes from './PixelTypes.js'

class PolyDataType {
  constructor (
    public readonly pointPixelComponentType: typeof IntTypes[keyof typeof IntTypes] | typeof FloatTypes[keyof typeof FloatTypes] = FloatTypes.Float32,
    public readonly pointPixelType: typeof PixelTypes[keyof typeof PixelTypes] = PixelTypes.Scalar,
    public readonly pointPixelComponents: number = 1,
    public readonly cellPixelComponentType: typeof IntTypes[keyof typeof IntTypes] | typeof FloatTypes[keyof typeof FloatTypes] = FloatTypes.Float32,
    public readonly cellPixelType: typeof PixelTypes[keyof typeof PixelTypes] = PixelTypes.Scalar,
    public readonly cellPixelComponents: number = 1) {}
}

export default PolyDataType
