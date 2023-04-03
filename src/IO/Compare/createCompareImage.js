import { runWasm } from '../itkWasmUtils.js'

export async function createCompareImage(
  movingImage,
  fixedImage,
  { method, minMax, pattern = undefined, swapImageOrder = false }
) {
  const args = [
    // '--method',
    // method,
    '--range',
    minMax.join(','),
    ...(pattern ? ['--pattern', pattern.join(',')] : []),
    '--swap-image-order',
    swapImageOrder.toString(),
  ]

  const image = await runWasm({
    pipeline: 'compare',
    args,
    images: [movingImage, fixedImage],
    maxSplits: 1,
  })
  image.ranges = [minMax]
  return image
}
