import vtkLookupTableProxy from 'vtk.js/Sources/Proxy/Core/LookupTableProxy'
import CategoricalColors from './CategoricalColors'

function applyCategoricalColorToLookupTableProxy(lutProxy, labels, presetName) {
  console.log(lutProxy, labels, presetName)
  const numberOfLabels = labels.length

  const colors = CategoricalColors.get(presetName)
  const rgbPoints = new Array(numberOfLabels)
  // Assume background
  const haveBackground = labels[0] === 0 ? true : false
  let startIndex = 0
  if (haveBackground) {
    startIndex = 1
    rgbPoints[0] = [labels[0], 0.0, 0.0, 0.0, 0.5, 1.0]
  }
  for (let labelIndex = startIndex; labelIndex < numberOfLabels; labelIndex++) {
    const color = colors[(labelIndex - startIndex) % colors.length]
    rgbPoints[labelIndex] = [
      labels[labelIndex],
      color[0],
      color[1],
      color[2],
      0.5,
      1.0,
    ]
  }
  lutProxy.setMode(vtkLookupTableProxy.Mode.RGBPoints)
  lutProxy.setRGBPoints(rgbPoints)

  const colorTransferFunction = lutProxy.getLookupTable()
  colorTransferFunction.setMappingRange(labels[0], labels[numberOfLabels - 1])
}

export default applyCategoricalColorToLookupTableProxy
