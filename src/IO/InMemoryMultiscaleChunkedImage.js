import MultiscaleChunkedImage from './MultiscaleChunkedImage'
import componentTypeToTypedArray from './componentTypeToTypedArray'
import WebworkerPromise from 'webworker-promise'

import ChuckerWorker from './Chunker.worker'

import WorkerPool from 'itk/WorkerPool'
import runPipelineBrowser from 'itk/runPipelineBrowser'
import Image from 'itk/Image'
import IOTypes from 'itk/IOTypes'
import imageSharedBufferOrCopy from 'itk/imageSharedBufferOrCopy'

const createChunkerWorker = existingWorker => {
  if (existingWorker) {
    const webworkerPromise = new WebworkerPromise(existingWorker)
    return { webworkerPromise, worker: existingWorker }
  }

  const newWorker = new ChuckerWorker()
  const newWebworkerPromise = new WebworkerPromise(newWorker)
  return { webworkerPromise: newWebworkerPromise, worker: newWorker }
}

const createChunk = async (webWorker, args) => {
  const { webworkerPromise, worker } = createChunkerWorker(webWorker)
  const chunk = await webworkerPromise.exec('chunk', args)
  return { chunk, webWorker: worker }
}
const numberOfWorkers = navigator.hardwareConcurrency
  ? navigator.hardwareConcurrency
  : 4
//const chunkerWorkerPool = new WorkerPool(numberOfWorkers, createChunk)
const downsampleWorkerPool = new WorkerPool(numberOfWorkers, runPipelineBrowser)

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

  async get() {
    return this.coords
  }
}

function chunkImage(image, chunkSize) {
  const imageType = image.imageType
  const componentType = imageType.componentType

  const dims = []
  const sizeCXYZTChunks = [1, chunkSize[0], chunkSize[1], 1, 1]
  sizeCXYZTChunks[0] = imageType.components
  const sizeCXYZTElements = [imageType.components, 1, 1, 1, 1]
  if (imageType.components > 1) {
    dims.push('c')
  }
  dims.push('x', 'y')
  sizeCXYZTElements[1] = image.size[0]
  sizeCXYZTElements[2] = image.size[1]
  if (imageType.dimension == 3) {
    dims.push('z')
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
  console.time('chunky')
  const chunkType = componentTypeToTypedArray.get(componentType)
  const chunkElements =
    sizeCXYZTElements[0] *
    sizeCXYZTElements[1] *
    sizeCXYZTElements[2] *
    sizeCXYZTElements[3] *
    sizeCXYZTElements[4]
  let data = image.data
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
    //// const result = await chunkerWorkerPool.runTasks(taskArgs)
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
  console.timeEnd('chunky')

  const coords = new Coords(image, dims)
  const metadata = {
    dims,
    coords,
    numberOfCXYZTChunks,
    sizeCXYZTChunks,
    sizeCXYZTElements,
  }

  return { metadata, chunksStride, chunks }
}

class InMemoryMultiscaleChunkedImage extends MultiscaleChunkedImage {
  static async buildPyramid(image, chunkSize = [64, 64, 64]) {
    const level0 = chunkImage(image, chunkSize)
    console.log('image', image)
    const metadata = [level0.metadata]
    const pyramid = [
      {
        chunksStride: level0.chunksStride,
        chunks: level0.chunks,
        largestImage: image,
      },
    ]

    let currentImage = image
    //for (let index = 0; index < chunks.length; index++) {
    while (
      currentImage.size.reduce((a, c, i) => a || c / chunkSize[i] >= 2.0, false)
    ) {
      const factors = currentImage.size.map((s, i) => {
        const n = Math.ceil(s / 2)
        const factor = n >= chunkSize[i] ? 2 : 1
        return factor
      })
      const data = imageSharedBufferOrCopy(currentImage)
      const inputs = [
        {
          path: 'input.json',
          type: IOTypes.Image,
          data: data,
        },
      ]
      const desiredOutputs = [{ path: 'output.json', type: IOTypes.Image }]
      const args = [
        'input.json',
        'output.json',
        factors[0].toString(),
        factors[1].toString(),
        factors.length > 2 ? factors[2].toString() : '1',
      ]
      const downsampleTaskArgs = [['Downsample', args, desiredOutputs, inputs]]
      const results = await downsampleWorkerPool.runTasks(downsampleTaskArgs)
      currentImage = results[0].outputs[0].data

      const levelN = chunkImage(currentImage, chunkSize)
      const metadata = [levelN.metadata]
      const pyramid = [
        {
          chunksStride: levelN.chunksStride,
          chunks: levelN.chunks,
          largestImage: currentImage,
        },
      ]
    }

    // level

    const imageType = image.imageType
    return { metadata, imageType, pyramid }
  }

  constructor(pyramid, metadata, imageType, name = 'Image') {
    super(metadata, imageType, name)
    this.pyramid = pyramid
  }

  async getChunksImpl(level, cxyztArray) {
    const result = new Array(cxyztArray.length)
    const strides = this.pyramid[level].chunksStride
    const chunks = this.pyramid[level].chunks
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
    return result
  }

  async levelLargestImage(level) {
    return this.pyramid[level].largestImage
  }
}

export default InMemoryMultiscaleChunkedImage
