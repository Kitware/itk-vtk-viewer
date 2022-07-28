import MultiscaleSpatialImage, { storeImage } from './MultiscaleSpatialImage'
import componentTypeToTypedArray from './componentTypeToTypedArray'
// import WebworkerPromise from 'webworker-promise'

// import ChuckerWorker from './Chunker.worker'

import {
  WorkerPool,
  runPipeline,
  InterfaceTypes,
  imageSharedBufferOrCopy,
  stackImages,
} from 'itk-wasm'
import computeRange from '../Rendering/VTKJS/computeRange'
import { chunkArray, CXYZT, orderBy, toDimensionMap } from './dimensionUtils'

// const createChunkerWorker = existingWorker => {
//   if (existingWorker) {
//     const webworkerPromise = new WebworkerPromise(existingWorker)
//     return { webworkerPromise, worker: existingWorker }
//   }

//   const newWorker = new ChuckerWorker()
//   const newWebworkerPromise = new WebworkerPromise(newWorker)
//   return { webworkerPromise: newWebworkerPromise, worker: newWorker }
// }

// const createChunk = async (webWorker, args) => {
//   const { webworkerPromise, worker } = createChunkerWorker(webWorker)
//   const chunk = await webworkerPromise.exec('chunk', args)
//   return { chunk, webWorker: worker }
// }
const numberOfWorkers = navigator.hardwareConcurrency
  ? navigator.hardwareConcurrency
  : 6
//const chunkerWorkerPool = new WorkerPool(numberOfWorkers, createChunk)
const downsampleWorkerPool = new WorkerPool(numberOfWorkers, runPipeline)

class Coords {
  constructor(image, dims) {
    this.coords = new Map()
    let spatialDimIndex = 0
    if (dims[0] == 'c') {
      spatialDimIndex = 1
      const coord = new Uint16Array(image.imageType.components)
      for (let c = 0; c < image.imageType.components; c++) {
        coord[c] = c
      }
      this.coords.set('c', coord)
    }
    let spatialIndex = 0
    for (let d = spatialDimIndex; d < dims.length; d++) {
      const size = image.size[spatialIndex]
      const origin = image.origin[spatialIndex]
      const spacing = image.spacing[spatialIndex]
      const coord = new Float64Array(size)
      for (let i = 0; i < size; i++) {
        coord[i] = origin + i * spacing
      }
      this.coords.set(dims[d], coord)
      spatialIndex++
    }
  }

  async get(coord) {
    return this.coords.get(coord)
  }

  has(coord) {
    return this.coords.has(coord)
  }
}

async function chunkImage(image, chunkSize) {
  const imageType = image.imageType
  const componentType = imageType.componentType

  const dims = ['y', 'x']
  const sizeCXYZTElements = [
    imageType.components,
    image.size[0],
    image.size[1],
    1,
    1,
  ]
  const sizeCXYZTChunks = [
    imageType.components,
    chunkSize[0],
    chunkSize[1],
    1,
    1,
  ]

  if (imageType.components > 1) {
    dims.push('c')
  }

  if (imageType.dimension == 3) {
    dims.unshift('z')
    sizeCXYZTElements[3] = image.size[2]
    sizeCXYZTChunks[3] = chunkSize[2]
  }

  const numberOfCXYZTChunks = [1, 1, 1, 1, 1]
  for (let i = 0; i < numberOfCXYZTChunks.length; i++) {
    numberOfCXYZTChunks[i] = Math.ceil(
      sizeCXYZTElements[i] / sizeCXYZTChunks[i]
    )
  }
  const chunksStride = new Array(5)
  chunksStride[0] = 1
  chunksStride[1] = 1 * numberOfCXYZTChunks[0]
  chunksStride[2] = 1 * numberOfCXYZTChunks[0] * numberOfCXYZTChunks[1]
  chunksStride[3] =
    1 * numberOfCXYZTChunks[0] * numberOfCXYZTChunks[1] * numberOfCXYZTChunks[2]
  chunksStride[4] =
    1 *
    numberOfCXYZTChunks[0] *
    numberOfCXYZTChunks[1] *
    numberOfCXYZTChunks[2] *
    numberOfCXYZTChunks[3]
  let chunks = new Array(
    numberOfCXYZTChunks[0] *
      numberOfCXYZTChunks[1] *
      numberOfCXYZTChunks[2] *
      numberOfCXYZTChunks[3] *
      numberOfCXYZTChunks[4]
  )
  const dataStride = new Array(5)
  dataStride[0] = 1
  dataStride[1] = 1 * imageType.components
  dataStride[2] = 1 * imageType.components * image.size[0]
  dataStride[3] = 1 * imageType.components * image.size[0] * image.size[1]
  dataStride[4] = dataStride[3]
  const chunkType = componentTypeToTypedArray.get(componentType)
  const chunkElements =
    sizeCXYZTChunks[0] *
    sizeCXYZTChunks[1] *
    sizeCXYZTChunks[2] *
    sizeCXYZTChunks[3] *
    sizeCXYZTChunks[4]
  const data = image.data
  //const haveSharedArrayBuffer = typeof window.SharedArrayBuffer === 'function'
  //if (haveSharedArrayBuffer && !data.buffer instanceof SharedArrayBuffer) {
  //const sharedBuffer = new SharedArrayBuffer(data.buffer.byteLength) // eslint-disable-line
  //const sharedTypedArray = new data.constructor(sharedBuffer)
  //sharedTypedArray.set(data, 0)
  //data = sharedTypedArray
  //}
  let offset = 0
  const cxElements = sizeCXYZTChunks[0] * sizeCXYZTChunks[1]

  const singleChunk = numberOfCXYZTChunks.every(e => e === 1)
  if (singleChunk) {
    chunks[0] = data
  } else {
    //if (haveSharedArrayBuffer) {
    // Poorer performance
    //if (false) {
    //const taskArgs = new Array(chunks.length)
    //for (let k = 0; k < numberOfCXYZTChunks[3]; k++) {
    //const kOffset = k * sizeCXYZTChunks[3]
    //for (let j = 0; j < numberOfCXYZTChunks[2]; j++) {
    //const jOffset = j * sizeCXYZTChunks[2]
    //for (let i = 0; i < numberOfCXYZTChunks[1]; i++) {
    //const iOffset = i * sizeCXYZTChunks[1]
    //taskArgs[offset] = [
    //{
    //data,
    //componentType,
    //chunkElements,
    //cxElements,
    //sizeCXYZTChunks,
    //dataStride,
    //kOffset,
    //jOffset,
    //iOffset,
    //},
    //]
    //offset++
    //} // for every x chunk
    //} // for every y chunk
    //} // for every z chunk
    //// const result = await chunkerWorkerPool.runTasks(taskArgs).promise
    //// chunks = result.map(e => e.chunk)
    //} else {
    for (let k = 0; k < numberOfCXYZTChunks[3]; k++) {
      const kOffset = k * sizeCXYZTChunks[3]
      for (let j = 0; j < numberOfCXYZTChunks[2]; j++) {
        const jOffset = j * sizeCXYZTChunks[2]
        for (let i = 0; i < numberOfCXYZTChunks[1]; i++) {
          const iOffset = i * sizeCXYZTChunks[1]
          const chunk = new chunkType(chunkElements)
          let cxOffset = 0
          for (let kk = 0; kk < sizeCXYZTChunks[3]; kk++) {
            const kaOffset = dataStride[3] * (kOffset + kk)
            for (let jj = 0; jj < sizeCXYZTChunks[2]; jj++) {
              const jaOffset = kaOffset + dataStride[2] * (jOffset + jj)
              const iaOffset = jaOffset + dataStride[1] * iOffset
              const dataSlice = data.subarray(iaOffset, iaOffset + cxElements)
              chunk.set(dataSlice, Math.min(cxOffset, chunk.length))
              cxOffset += cxElements
            }
          }
          chunks[offset] = chunk
          offset++
        } // for every x chunk
      } // for every y chunk
    } // for every z chunk
    //}
  }

  const ranges = []
  for (let comp = 0; comp < sizeCXYZTElements[0]; comp++) {
    const range = await computeRange(image.data, comp, sizeCXYZTElements[0])
    ranges.push([range.min, range.max])
  }

  const orderByDims = orderBy(dims)
  const scaleInfo = {
    dims,
    coords: new Coords(image, [...dims].reverse()), // Coords assumes xyz
    chunkCount: orderByDims(toDimensionMap(CXYZT, numberOfCXYZTChunks)),
    chunkSize: orderByDims(toDimensionMap(CXYZT, sizeCXYZTChunks)),
    arrayShape: orderByDims(toDimensionMap(CXYZT, sizeCXYZTElements)),
    ranges,
    direction: image.direction && chunkArray(3, [...image.direction].reverse()), // reverse to cast xyz to zyx
  }

  return { scaleInfo, chunksStride, chunks }
}

class InMemoryMultiscaleSpatialImage extends MultiscaleSpatialImage {
  static async buildPyramid(
    image,
    chunkSize = [64, 64, 64],
    isLabelImage = false
  ) {
    const scale0 = await chunkImage(image, chunkSize)
    const scaleInfo = [scale0.scaleInfo]
    const pyramid = [
      {
        chunksStride: scale0.chunksStride,
        chunks: scale0.chunks,
        largestImage: image,
      },
    ]

    let currentImage = image
    const maxTotalSplits = Math.min(
      parseInt(numberOfWorkers / 2),
      Math.max(currentImage.size[currentImage.size.length - 1], 1)
    )
    const pipelinePath = isLabelImage ? 'DownsampleLabelImage' : 'Downsample'
    while (
      currentImage.size.reduce((a, c, i) => a || c / chunkSize[i] >= 2.0, false)
    ) {
      const factors = currentImage.size.map((s, i) => {
        const n = Math.ceil(s / 2)
        const factor = n >= chunkSize[i] ? 2 : 1
        return factor
      })

      const downsampleTaskArgs = []
      for (let index = 0; index < maxTotalSplits; index++) {
        const data = imageSharedBufferOrCopy(currentImage)
        const inputs = [
          {
            type: InterfaceTypes.Image,
            data: data,
          },
        ]

        const desiredOutputs = [
          { type: InterfaceTypes.Image },
          { type: InterfaceTypes.TextStream },
        ]
        const args = [
          '0',
          '0',
          factors.join(','),
          '--max-total-splits',
          '' + maxTotalSplits,
          '--split',
          '' + index,
          '--number-of-splits',
          '' + maxTotalSplits,
          '--memory-io',
        ]
        downsampleTaskArgs.push([pipelinePath, args, desiredOutputs, inputs])
      }
      const results = await downsampleWorkerPool.runTasks(downsampleTaskArgs)
        .promise
      const validResults = results.filter((r, i) => r.returnValue === 0)
      const imageSplits = validResults.map(({ outputs }) => outputs[0].data)
      currentImage = stackImages(imageSplits)

      const scaleN = await chunkImage(currentImage, chunkSize)
      scaleInfo.push(scaleN.scaleInfo)
      pyramid.push({
        chunksStride: scaleN.chunksStride,
        chunks: scaleN.chunks,
        largestImage: currentImage,
      })
    }

    // scale
    const imageType = image.imageType
    return { scaleInfo, imageType, pyramid }
  }

  constructor(pyramid, scaleInfo, imageType, name = 'Image') {
    super(scaleInfo, imageType, name)
    this.pyramid = pyramid

    // cache whole images for getImage to retrieve
    pyramid.forEach((data, scale) => {
      storeImage({
        cache: this.cachedImages,
        scale,
        bounds: this.getIndexBounds(scale),
        image: data.largestImage,
      })
    })
  }

  async getChunksImpl(scale, cxyztArray) {
    const result = new Array(cxyztArray.length)
    const strides = this.pyramid[scale].chunksStride
    const chunks = this.pyramid[scale].chunks
    for (let i = 0; i < result.length; i++) {
      const cxyzt = cxyztArray[i]
      result[i] =
        chunks[
          cxyzt[0] * strides[0] +
            cxyzt[1] * strides[1] +
            cxyzt[2] * strides[2] +
            cxyzt[3] * strides[3] +
            cxyzt[4] * strides[4]
        ]
    }
    return result.map(a => a.buffer)
  }
}

export default InMemoryMultiscaleSpatialImage
