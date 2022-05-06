import registerWebworker from 'webworker-promise/lib/register'
import componentTypeToTypedArray from './componentTypeToTypedArray'

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
    info.arrayShape.set('c', imageType.components)

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

    const arrayShape = Object.fromEntries(info.arrayShape)
    const pixelStrides = {
      z: arrayShape.c * arrayShape.x * arrayShape.y,
      y: arrayShape.c * arrayShape.x,
      x: arrayShape.c,
    }

    const chunkSize = Object.fromEntries(info.chunkSize)

    // stride is the number of elements between elements in a dimension
    const [chunkStrides] = Array.from(info.chunkSize)
      .reverse()
      .reduce(
        ([strides, size], [dim, dimSize]) => [
          { [dim]: size, ...strides },
          size * dimSize,
        ],
        [{}, 1]
      )

    for (let index = 0; index < chunkIndices.length; index++) {
      const chunk = chunks[index]
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
      const roiStart = Object.fromEntries(indexStart)
      const roiEnd = Object.fromEntries(indexEnd)
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

      for (let cc = itStart.c; cc < itEnd.c; cc++) {
        for (let zz = itStart.z; zz < itEnd.z; zz++) {
          for (let yy = itStart.y; yy < itEnd.y; yy++) {
            for (let xx = itStart.x; xx < itEnd.x; xx++) {
              pixelArray[
                cc +
                  xx * pixelStrides.x +
                  yy * pixelStrides.y +
                  zz * pixelStrides.z
              ] =
                chunk[
                  // subtract x * chunkSize.x from xx to start at beginning of chunk despite itStart.x
                  (xx - x * chunkSize.x) * chunkStrides.x +
                    (yy - y * chunkSize.y) * chunkStrides.y +
                    (zz - z * chunkSize.z) * chunkStrides.z +
                    (cc - c * chunkSize.c) * chunkStrides.c
                ]
            } // column
          } // row
        } // slice
      } // component
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
