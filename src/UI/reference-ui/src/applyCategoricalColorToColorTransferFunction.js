import { CategoricalColors } from 'itk-viewer-color-maps'

function applyCategoricalColorToColorTransferFunction(
  colorTransferFunction,
  labels,
  presetName
) {
  const numberOfLabels = labels.length

  if (!CategoricalColors.has(presetName)) {
    console.error(
      `Categorical color ${presetName} requested but it is not available`
    )
  }
  const colors = CategoricalColors.get(presetName).IndexedColors
  const rgbPoints = new Array(numberOfLabels)
  // Assume background
  const haveBackground = labels[0] === 0 ? true : false
  let startIndex = 0
  if (haveBackground) {
    startIndex = 1
    rgbPoints[0] = [labels[0], 0.0, 0.0, 0.0, 0.5, 1.0]
  }
  for (let labelIndex = startIndex; labelIndex < numberOfLabels; labelIndex++) {
    const index = (labelIndex - startIndex) * 3
    const color = colors.slice(index, index + 3)
    rgbPoints[labelIndex] = [
      labels[labelIndex],
      color[0],
      color[1],
      color[2],
      0.5,
      1.0,
    ]
  }

  colorTransferFunction.removeAllPoints()
  rgbPoints.forEach(point => {
    colorTransferFunction.addRGBPointLong(...point)
  })
  colorTransferFunction.setMappingRange(labels[0], labels[numberOfLabels - 1])
}

export default applyCategoricalColorToColorTransferFunction
