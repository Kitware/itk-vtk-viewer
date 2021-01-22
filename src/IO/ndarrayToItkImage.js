import PixelTypes from 'itk/PixelTypes'

const typedArray2itkType = {
  Int8Array: 'int8_t',
  Uint8Array: 'uint8_t',
  Int16Array: 'int16_t',
  Uint16Array: 'uint16_t',
  Int32Array: 'int32_t',
  Uint32Array: 'uint32_t',
  Float32Array: 'float',
  Float64Array: 'double',
}

function ndarrayToItkImage(array) {
  const componentType = typedArray2itkType[array.constructor.name]
  if (
    array.shape.length === 2 ||
    (array.shape.length == 3 && array.shape[2] <= 4)
  ) {
    const channels = array.shape.length === 3 ? array.shape[2] : 1
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
      direction: {
        data: [1.0, 0.0, 0.0, 1.0],
      },
      size: [array.shape[1], array.shape[0]],
      data: array.data,
    }
  } else if (array.shape.length === 3) {
    return {
      imageType: {
        dimension: 3,
        pixelType: PixelTypes.Scalar,
        componentType,
        components: 1,
      },
      name: 'Volume',
      origin: [0.0, 0.0, 0.0],
      spacing: [1.0, 1.0, 1.0],
      direction: {
        data: [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0],
      },
      size: [array.shape[2], array.shape[1], array.shape[0]],
      data: array.data,
    }
  } else {
    throw new Error(`Unsupported shape: ${array.shape}`)
  }
}

export default ndarrayToItkImage
