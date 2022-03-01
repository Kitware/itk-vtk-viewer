import { runPipeline, InterfaceTypes, WorkerPool } from 'itk-wasm'
import dtypeToTypedArray from '../IO/dtypeToTypedArray'

const dtypeToElementSize = new Map([
  ['<b', 1],
  ['<B', 1],
  ['<u1', 1],
  ['|u1', 1],
  ['<i1', 1],
  ['|i1', 1],
  ['<u2', 2],
  ['<i2', 2],
  ['<u4', 4],
  ['<i4', 4],
  ['<u8', 8],
  ['<i8', 8],

  ['<f4', 8],
  ['<f8', 8],
])

const cores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 4
const numberOfWorkers = cores + Math.floor(Math.sqrt(cores))
const workerPool = new WorkerPool(numberOfWorkers, runPipeline)

/**
 * Input:
 *
 *   chunkData: An Array of
 *
 *     {
 *       data: chunkArrayBuffer,
 *       metadata: zarrayMetadata
 *     }
 *
 *   objects.
 *
 *
 * Output:
 *
 *   An Array of decompressed ArrayBuffer chunks.
 */
async function bloscZarrDecompress(chunkData) {
  const desiredOutputs = [
    { type: InterfaceTypes.BinaryStream },
  ]
  const taskArgsArray = []
  let dtype = null
  for (let index = 0; index < chunkData.length; index++) {
    const zarrayMetadata = chunkData[index].metadata
    const compressedChunk = chunkData[index].data
    dtype = zarrayMetadata.dtype
    const nElements = zarrayMetadata.chunks.reduce((a, b) => a * b)
    const outputSize = nElements * dtypeToElementSize.get(dtype)
    const inputs = [
      {
        type: InterfaceTypes.BinaryStream,
        data: { data: new Uint8Array(compressedChunk) },
      },
    ]
    const args = [
      '0',
      '0',
      zarrayMetadata.compressor.cname,
      compressedChunk.byteLength.toString(),
      '--output-size',
      outputSize.toString(),
      '--decompress',
      '--memory-io'
    ]
    taskArgsArray.push(['BloscZarr', args, desiredOutputs, inputs])
  }
  const results = await workerPool.runTasks(taskArgsArray).promise

  const typedArray = dtypeToTypedArray.get(dtype)
  const decompressedChunks = []
  for (let index = 0; index < results.length; index++) {
    // console.log(results[index].stdout);
    // console.error(results[index].stderr);
    decompressedChunks.push(
      new typedArray(results[index].outputs[0].data.buffer)
    )
  }
  return decompressedChunks
}

export default bloscZarrDecompress
