import { runWasm } from '../itkWasmUtils.js'
import itkConfig from '../itkConfig.js'

export async function createCompareImage(
  movingImage,
  fixedImage,
  { minMax, checkerboard, pattern = undefined }
) {
  const clampedPattern = pattern
    ? fixedImage.size.map((s, idx) => Math.min(s, pattern[idx]))
    : []
  const args = [
    '--checkerboard',
    checkerboard.toString(),
    '--range',
    minMax.join(','),
    '--pattern',
    clampedPattern.join(','),
  ]

  const itkWasmOptions = {
    pipelineWorkerUrl: itkConfig.pipelineWorkerUrl,
    pipelineBaseUrl: itkConfig.pipelinesUrl,
  }
  console.log('createCompare', itkWasmOptions)
  const image = await runWasm({
    pipeline: 'Compare',
    args,
    images: [movingImage, fixedImage],
    maxSplits: 1,
    itkWasmOptions,
  })
  image.ranges = [minMax, minMax]

  return image
}
