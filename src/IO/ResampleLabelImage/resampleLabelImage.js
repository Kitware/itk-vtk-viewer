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

function compareArrays(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export function compareImageSpaces(imageA, imageB) {
  const equalKeys = ['size', 'direction', 'origin', 'spacing'].map(key =>
    compareArrays(imageA[key], imageB[key])
  )
  return equalKeys.every(b => b)
}
