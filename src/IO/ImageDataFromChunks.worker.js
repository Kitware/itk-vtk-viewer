import registerWebworker from 'webworker-promise/lib/register'
import componentTypeToTypedArray from './componentTypeToTypedArray'
import { CXYZT, ensuredDims } from './dimensionUtils'
import {
  getTypedArray,
  ElementGetter,
  getSize,
  testLittleEndian,
} from './dtypeUtils'

const haveSharedArrayBuffer = typeof self.SharedArrayBuffer === 'function'

const validateIndices = ({ chunkStart, chunkEnd, roiStart, roiEnd }) => {
  if (
    ['x', 'y', 'z'].some(
      dim => chunkStart[dim] > roiEnd[dim] || chunkEnd[dim] < roiStart[dim]
    )
  ) {
    // We should never get here...
    console.error('Requested a chunk outside the region of interest!')
  }
}

const IS_SYSTEM_LITTLE_ENDIAN = (function() {
  const buffer = new ArrayBuffer(2)
  new DataView(buffer).setInt16(0, 256, true /* littleEndian */)
  // Int16Array uses the platform's endianness.
  return new Int16Array(buffer)[0] === 256
})()

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
    const pixelArrayType = componentTypeToTypedArray.get(
      imageType.componentType
    )
    let pixelArray = null
    const pixelArrayElements = Array.from(info.arrayShape.values()).reduce(
      (a, b) => a * b
    )
    if (haveSharedArrayBuffer) {
      const pixelArrayBytes =
        pixelArrayElements * pixelArrayType.BYTES_PER_ELEMENT
      const sharedArrayBuffer = new SharedArrayBuffer(pixelArrayBytes)
      pixelArray = new pixelArrayType(sharedArrayBuffer)
    } else {
      pixelArray = new pixelArrayType(pixelArrayElements)
    }

    const arrayShape = Object.fromEntries(
      ensuredDims(1, CXYZT, info.arrayShape)
    )
    const pixelStrides = {
      z: arrayShape.c * arrayShape.x * arrayShape.y,
      y: arrayShape.c * arrayShape.x,
      x: arrayShape.c,
    }

    const chunkSizeDefault1 = ensuredDims(1, CXYZT, info.chunkSize)
    const chunkSize = Object.fromEntries(chunkSizeDefault1)

    // stride is the number of elements between elements in a dimension
    const [chunkStrides] = Array.from(chunkSizeDefault1)
      .reverse()
      .reduce(
        ([strides, size], [dim, dimSize]) => [
          { [dim]: size, ...strides },
          size * dimSize,
        ],
        [{}, 1]
      )

    for (let index = 0; index < chunkIndices.length; index++) {
      const [c, x, y, z /*t*/] = chunkIndices[index]

      const chunkStart = {
        c: c * chunkSize.c,
        z: z * chunkSize.z,
        y: y * chunkSize.y,
        x: x * chunkSize.x,
      }
      const chunkEnd = {
        c: (c + 1) * chunkSize.c,
        z: (z + 1) * chunkSize.z,
        y: (y + 1) * chunkSize.y,
        x: (x + 1) * chunkSize.x,
      }
      const roiStart = Object.fromEntries(ensuredDims(0, CXYZT, indexStart))
      const roiEnd = Object.fromEntries(ensuredDims(1, CXYZT, indexEnd))
      validateIndices({ chunkStart, chunkEnd, roiStart, roiEnd })

      // iterate on image from chunk or ROI start
      const itStart = {
        c: Math.max(chunkStart.c, roiStart.c),
        z: Math.max(chunkStart.z, roiStart.z),
        y: Math.max(chunkStart.y, roiStart.y),
        x: Math.max(chunkStart.x, roiStart.x),
      }
      const itEnd = {
        c: Math.min(chunkEnd.c, roiEnd.c),
        z: Math.min(chunkEnd.z, roiEnd.z),
        y: Math.min(chunkEnd.y, roiEnd.y),
        x: Math.min(chunkEnd.x, roiEnd.x),
      }

      // write pixels at the start of the output image, not where they start in source image
      const roiStartPixelOffset = Object.keys(pixelStrides).reduce(
        (offset, dim) => offset + pixelStrides[dim] * roiStart[dim],
        0
      )

      // Does input data group component(s) with each pixel?
      const dims = Array.from(info.arrayShape.keys()).join('')
      const areComponentsInterleaved =
        dims.endsWith('xc') || (arrayShape.c === 1 && dims.endsWith('x')) // if one component, can end with just 'x'
      // Input data endiennes matches system or just 1 byte?
      const dataEndiennesOK =
        getSize(info.dtype) === 1 ||
        IS_SYSTEM_LITTLE_ENDIAN === testLittleEndian(info.dtype)

      if (areComponentsInterleaved && dataEndiennesOK) {
        // copy by row TURBO MODE
        const TypedArray = getTypedArray(info.dtype)
        const typedChunk = new TypedArray(chunks[index])
        const offsetInChunkRow = (itStart.x - x * chunkSize.x) * chunkStrides.x
        for (let zz = itStart.z; zz < itEnd.z; zz++) {
          const zChunkOffset = (zz - z * chunkSize.z) * chunkStrides.z
          const zPixelOffset = zz * pixelStrides.z - roiStartPixelOffset
          for (let yy = itStart.y; yy < itEnd.y; yy++) {
            const yChunkOffset =
              offsetInChunkRow +
              (yy - y * chunkSize.y) * chunkStrides.y +
              zChunkOffset
            const subarray = typedChunk.subarray(
              yChunkOffset,
              yChunkOffset + itEnd.c * (itEnd.x - itStart.x)
            )
            const pixelOffset =
              itStart.x * pixelStrides.x + // chunk's x index mapped to image's x index
              yy * pixelStrides.y +
              zPixelOffset
            pixelArray.set(subarray, pixelOffset)
          } // row
        } // slice
      } else {
        // copy by element tortoise mode
        const getChunkElement = ElementGetter(info.dtype, chunks[index])
        for (let cc = itStart.c; cc < itEnd.c; cc++) {
          // subtract c * chunkSize.c from cc to start at beginning of chunk despite itStart.c
          const cChunkOffset = (cc - c * chunkSize.c) * chunkStrides.c
          for (let zz = itStart.z; zz < itEnd.z; zz++) {
            const zChunkOffset =
              (zz - z * chunkSize.z) * chunkStrides.z + cChunkOffset
            const zPixelOffset = zz * pixelStrides.z + cc - roiStartPixelOffset
            for (let yy = itStart.y; yy < itEnd.y; yy++) {
              const yChunkOffset =
                (yy - y * chunkSize.y) * chunkStrides.y + zChunkOffset
              const yPixelOffset = yy * pixelStrides.y + zPixelOffset
              for (let xx = itStart.x; xx < itEnd.x; xx++) {
                pixelArray[
                  xx * pixelStrides.x + yPixelOffset
                ] = getChunkElement(
                  (xx - x * chunkSize.x) * chunkStrides.x + yChunkOffset
                )
              } // column
            } // row
          } // slice
        } // component
      } // copy by row or element
    } // chunk

    let response = pixelArray
    if (!haveSharedArrayBuffer) {
      response = new registerWebworker.TransferableResponse(pixelArray, [
        pixelArray.buffer,
      ])
    }
    return response
  }
)
