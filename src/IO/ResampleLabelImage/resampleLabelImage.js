import { arraysEqual } from '../../internalUtils.js'
import { runWasm } from '../itkWasmUtils.js'

export async function resampleLabelImage(image, labelImage) {
  const { size, spacing, origin, direction } = image
  const args = [
    '--size',
    size.join(','),
    '--spacing',
    spacing.join(','),
    '--origin',
    origin.join(','),
    '--direction',
    direction.join(','),
  ]

  return runWasm({ pipeline: 'ResampleLabelImage', args, images: [labelImage] })
}

export function compareImageSpaces(imageA, imageB) {
  const equalKeys = ['size', 'direction', 'origin', 'spacing'].map(key =>
    arraysEqual(imageA[key], imageB[key])
  )
  return equalKeys.every(b => b)
}
