function filterAndProcessOpacityNodes(numComps, opacityNodes) {
  const filteredNodes = new Array(opacityNodes.length)
  const baseLevel = 1.0 / numComps

  for (let i = 0; i < filteredNodes.length; i++) {
    filteredNodes[i] = { ...opacityNodes[i] }
    if (filteredNodes[i].y < baseLevel) {
      filteredNodes[i].y = baseLevel
    }
  }

  const kernelSize = 9
  const halfWindow = (kernelSize - 1) / 2

  for (let i = 0; i < filteredNodes.length; i++) {
    let sum = 0.0
    let count = 0
    for (let j = i - halfWindow; j <= i + halfWindow; j++) {
      if (j > 0 && j < filteredNodes.length) {
        sum += filteredNodes[j].y
        count += 1
      }
    }
    filteredNodes[i].y = sum / count
  }

  return filteredNodes
}

export default filterAndProcessOpacityNodes
