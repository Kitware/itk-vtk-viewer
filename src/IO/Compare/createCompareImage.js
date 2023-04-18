import { runWasm } from '../itkWasmUtils.js'

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

  const image = await runWasm({
    pipeline: 'Compare',
    args,
    images: [movingImage, fixedImage],
    maxSplits: 1,
  })
  image.ranges = [minMax, minMax]

  return image
}
