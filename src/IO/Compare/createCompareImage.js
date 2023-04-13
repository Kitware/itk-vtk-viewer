import { runWasm } from '../itkWasmUtils.js'

export async function createCompareImage(
  movingImage,
  fixedImage,
  { method, minMax, pattern = undefined }
) {
  const checkerboard = method === 'checkerboard' ? true : false
  const clampedPattern = pattern
    ? fixedImage.size.map((s, idx) => Math.min(s, pattern[idx]))
    : []
  const args = [
    '--checkerboard',
    checkerboard,
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
