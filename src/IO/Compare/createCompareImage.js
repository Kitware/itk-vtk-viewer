import { composeComponents } from '../composeComponents.js'
import { runWasm } from '../itkWasmUtils.js'

export async function createCompareImage(
  movingImage,
  fixedImage,
  { method, minMax, pattern = undefined, swapImageOrder = false }
) {
  const args = [
    '--method',
    method,
    '--range',
    minMax.join(','),
    ...(pattern ? ['--pattern', pattern.join(',')] : []),
    '--swap-image-order',
    swapImageOrder.toString(),
  ]

  let image = await runWasm({
    pipeline: 'Compare',
    args,
    images: [movingImage, fixedImage],
    maxSplits: 1,
  })
  image.ranges = [minMax]

  if (method !== 'checkerboard') {
    let oneComponentFixed = await runWasm({
      pipeline: 'Compare',
      args,
      images: [fixedImage, image],
      maxSplits: 1,
    })
    image = await composeComponents([oneComponentFixed, image])
    image.ranges = [minMax, minMax]
  }

  return image
}
