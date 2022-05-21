import { PixelTypes, IntTypes, FloatTypes } from 'itk-wasm'

const numpy2itkType = {
  int8: {
    componentType: IntTypes.Int8,
    arrayType: Int8Array,
  },
  uint8: {
    componentType: IntTypes.UInt8,
    arrayType: Uint8Array,
  },
  int16: {
    componentType: IntTypes.Int16,
    arrayType: Int16Array,
  },
  uint16: {
    componentType: IntTypes.UInt16,
    arrayType: Uint16Array,
  },
  int32: {
    componentType: IntTypes.Int32,
    arrayType: Int32Array,
  },
  uint32: {
    componentType: IntTypes.UInt32,
    arrayType: Uint32Array,
  },
  int64: {
    componentType: IntTypes.Int64,
    arrayType: BigInt64Array,
  },
  uint64: {
    componentType: IntTypes.UInt64,
    arrayType: BigUint64Array,
  },
  float32: {
    componentType: FloatTypes.Float32,
    arrayType: Float32Array,
  },
  float64: {
    componentType: FloatTypes.Float64,
    arrayType: Float64Array,
  },
}

function ndarrayToItkImage(array) {
  if (array._rtype !== 'ndarray') {
    throw new Error('Invalid ndarray type: ' + array._rtype)
  }
  const { componentType, arrayType } = numpy2itkType[array._rdtype]
  if (
    array._rshape.length === 2 ||
    (array._rshape.length == 3 && array._rshape[2] <= 4)
  ) {
    const channels = array._rshape.length === 3 ? array._rshape[2] : 1
    const pixelType =
      channels === 1 ? PixelTypes.Scalar : PixelTypes.VariableLengthVector
    return {
      imageType: {
        dimension: 2,
        pixelType,
        componentType,
        components: channels,
      },
      name: 'Image',
      origin: [0.0, 0.0],
      spacing: [1.0, 1.0],
      direction: new Float64Array([1.0, 0.0, 0.0, 1.0]),
      size: [array._rshape[1], array._rshape[0]],
      data: new arrayType(array._rvalue),
    }
  } else if (array._rshape.length === 3) {
    return {
      imageType: {
        dimension: 3,
        pixelType: PixelTypes.Scalar,
        componentType,
        components: 1,
      },
      name: 'Image',
      origin: [0.0, 0.0, 0.0],
      spacing: [1.0, 1.0, 1.0],
      direction: new Float64Array([
        1.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]),
      size: [array._rshape[2], array._rshape[1], array._rshape[0]],
      data: new arrayType(array._rvalue),
    }
  } else if (array._rshape.length === 4) {
    return {
      imageType: {
        dimension: 3,
        pixelType: PixelTypes.Scalar,
        componentType,
        components: array._rshape[3],
      },
      name: 'Image',
      origin: [0.0, 0.0, 0.0],
      spacing: [1.0, 1.0, 1.0],
      direction: new Float64Array([
        1.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]),
      size: [array._rshape[2], array._rshape[1], array._rshape[0]],
      data: new arrayType(array._rvalue),
    }
  } else {
    throw new Error(`Unsupported shape: ${array._rshape}`)
  }
}

export default ndarrayToItkImage
