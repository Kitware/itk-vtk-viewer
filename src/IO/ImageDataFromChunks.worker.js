import registerWebworker from 'webworker-promise/lib/register'
import componentTypeToTypedArray from './componentTypeToTypedArray'
import { toDimensionArray } from './dimensionUtils'

const haveSharedArrayBuffer = typeof self.SharedArrayBuffer === 'function'

registerWebworker().operation(
  'imageDataFromChunks',
  ({
    scaleInfo: info,
    imageType,
    chunkIndices,
    chunks,
    indexStart,
    indexEnd,
  }) => {
    const chunkSize = toDimensionArray(['c', 'x', 'y', 'z'], info.chunkSize)
    const chunkStrides = [
      chunkSize[0],
      chunkSize[0] * chunkSize[1],
      chunkSize[0] * chunkSize[1] * chunkSize[2],
      chunkSize[0] * chunkSize[1] * chunkSize[2] * chunkSize[3],
    ] // c, x, y, z,

    const size = toDimensionArray(['x', 'y', 'z'], info.arrayShape)
    const components = imageType.components

    const pixelStrides = [
      components,
      components * size[0],
      components * size[0] * size[1],
      components * size[0] * size[1] * size[2],
    ] // c, x, y, z

    const pixelArrayType = componentTypeToTypedArray.get(
      imageType.componentType
    )
    let pixelArray = null
    const pixelArrayElements = size.reduce((a, b) => a * b) * components
    if (haveSharedArrayBuffer) {
      const pixelArrayBytes =
        pixelArrayElements * pixelArrayType.BYTES_PER_ELEMENT
      const sharedArrayBuffer = new SharedArrayBuffer(pixelArrayBytes)
      pixelArray = new pixelArrayType(sharedArrayBuffer)
    } else {
      pixelArray = new pixelArrayType(pixelArrayElements)
    }

    for (let index = 0; index < chunkIndices.length; index++) {
      const chunk = chunks[index]
      const [h, i, j, k, l] = chunkIndices[index]

      const chunkStart = [
        i * chunkSize[1],
        j * chunkSize[2],
        k * chunkSize[3],
        l * chunkSize[4],
      ]
      const chunkEnd = [
        (i + 1) * chunkSize[1],
        (j + 1) * chunkSize[2],
        (k + 1) * chunkSize[3],
        (l + 1) * chunkSize[4],
      ]
      // Skip if the chunk lives outside the region of interest
      if (
        chunkStart[0] > indexEnd[0] ||
        chunkEnd[0] < indexStart[0] ||
        chunkStart[1] > indexEnd[1] ||
        chunkEnd[1] < indexStart[1] ||
        chunkStart[2] > indexEnd[2] ||
        chunkEnd[2] < indexStart[2] ||
        chunkStart[3] > indexEnd[3] ||
        chunkEnd[3] < indexStart[3]
      ) {
        // We should never get here...
        console.error('Requested a chunk outside the region of interest!')
      }
      const itStart = [
        Math.max(chunkStart[0], indexStart[0]),
        Math.max(chunkStart[1], indexStart[1]),
        Math.max(chunkStart[2], indexStart[2]),
        Math.max(chunkStart[3], indexStart[3]),
      ]
      const itEnd = [
        Math.min(chunkEnd[0], indexEnd[0]),
        Math.min(chunkEnd[1], indexEnd[1]),
        Math.min(chunkEnd[2], indexEnd[2]),
        Math.min(chunkEnd[3], indexEnd[3]),
      ]
      const itChunkOffsets = [0, 0, 0, 0]
      itChunkOffsets[3] = chunkStrides[3] * l
      const itPixelOffsets = [0, 0, 0]
      for (let kk = itStart[2]; kk < itEnd[2]; kk++) {
        itChunkOffsets[2] = chunkStrides[2] * (kk - k * chunkSize[3])
        itPixelOffsets[2] = pixelStrides[2] * (kk - indexStart[2])
        for (let jj = itStart[1]; jj < itEnd[1]; jj++) {
          itChunkOffsets[1] = chunkStrides[1] * (jj - j * chunkSize[2])
          itPixelOffsets[1] = pixelStrides[1] * (jj - indexStart[1])
          for (let ii = itStart[0]; ii < itEnd[0]; ii++) {
            const begin =
              chunkStrides[0] * (itStart[0] - i * chunkSize[1]) +
              itChunkOffsets[1] +
              itChunkOffsets[2] +
              itChunkOffsets[3]
            const end = begin + components * (itEnd[0] - itStart[0])
            const offset =
              pixelStrides[0] * (itStart[0] - indexStart[0]) +
              itPixelOffsets[1] +
              itPixelOffsets[2]
            const subarray = chunk.subarray(begin, end)
            pixelArray.set(subarray, offset)
          } // for every column
        } // for every row
      } // for every slice
    }

    let response = pixelArray
    if (!haveSharedArrayBuffer) {
      response = new registerWebworker.TransferableResponse(pixelArray, [
        pixelArray.buffer,
      ])
    }
    return response
  }
)
