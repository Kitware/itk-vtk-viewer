import runPipelineBrowser from 'itk/runPipelineBrowser';
import IOTypes from 'itk/IOTypes';
import dtypeToTypedArray from './dtypeToTypedArray';

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

  ['<f4', 8],
  ['<f8', 8],
])

async function bloscZarrDecompress(compressed, zarrayMetadata) {
  const dtype = zarrayMetadata.dtype;
  const nElements = zarrayMetadata.chunks.reduce((a, b) => a * b);
  const outputSize = nElements * dtypeToElementSize.get(dtype)
  const args = ["inputArray",
    "outputArray",
    zarrayMetadata.compressor.cname,
    compressed.byteLength.toString(),
    outputSize.toString()];
  const desiredOutputs = [
    { path: 'outputArray', type: IOTypes.Binary },
  ];
  const inputs = [
    { path: 'inputArray', type: IOTypes.Binary, data: new Uint8Array(compressed) },
  ];
  const { stdout, stderr, outputs, webWorker } = await runPipelineBrowser(
    null,
    'BloscZarr',
    args,
    desiredOutputs,
    inputs
  );
  webWorker.terminate();
  // console.log(stdout);
  // console.error(stderr);
  const decompressed = new (dtypeToTypedArray.get(dtype))(outputs[0].data.buffer);
  return decompressed;
}

export default bloscZarrDecompress;
