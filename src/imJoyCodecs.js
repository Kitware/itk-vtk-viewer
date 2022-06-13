import bloscZarrDecompress from './Compression/bloscZarrDecompress.js'
import { ImageType, Image, bufferToTypedArray } from 'itk-wasm'

async function decodeNumcodecEncoded(numcodecEncoded) {
  const forBloscZarr = [
    {
      data: numcodecEncoded.buffer,
      metadata: {
        compressor: numcodecEncoded.config,
        dtype: '|u1',
        chunks: [numcodecEncoded.nbytes],
      },
    },
  ]
  const decompressed = await bloscZarrDecompress(forBloscZarr)
  return decompressed[0]
}

async function decodeItkWasmImage(wasmImage) {
  const wasmImageType = wasmImage.imageType
  const imageType = new ImageType(
    wasmImageType.dimension,
    wasmImageType.componentType,
    wasmImageType.pixelType,
    wasmImageType.components
  )

  const image = new Image(imageType)
  image.origin = wasmImage.origin
  image.spacing = wasmImage.spacing
  const directionBuffer = await decodeNumcodecEncoded(wasmImage.direction)
  image.direction = new Float64Array(directionBuffer)
  image.size = wasmImage.size
  const dataBuffer = await decodeNumcodecEncoded(wasmImage.data)
  image.data = bufferToTypedArray(imageType.componentType, dataBuffer)

  return image
}

const imJoyCodecs = [
  { name: 'numcodec-encoded', decoder: decodeNumcodecEncoded },
  { name: 'itkwasm-image', decoder: decodeItkWasmImage },
]

export default imJoyCodecs
