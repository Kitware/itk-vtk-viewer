import { runWasm } from '../itkWasmUtils.js'

export async function createCheckerboard(
  movingImage,
  fixedImage,
  { minMax, pattern = undefined, swapImageOrder = false }
) {
  const args = [
    '--range',
    minMax.join(','),
    ...(pattern ? ['--pattern', pattern.join(',')] : []),
    '--swap-image-order',
    swapImageOrder.toString(),
  ]

  const image = await runWasm({
    pipeline: 'checkerboard',
    args,
    images: [movingImage, fixedImage],
    maxSplits: 1,
  })
  image.ranges = [minMax]
  return image
}
