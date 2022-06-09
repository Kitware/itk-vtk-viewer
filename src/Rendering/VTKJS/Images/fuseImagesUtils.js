const sum = (a, b) => a + b

export const parseByComponent = scaleImage => {
  if (!scaleImage) return []

  // lift ITK image into array if not already (like from InMemoryMultiscaleSpatialImage)
  const scaleImages = Array.isArray(scaleImage) ? scaleImage : [scaleImage]
  // return array of all image components
  return scaleImages.flatMap(image => {
    const srcComponentCount = image.imageType.components
    // pull each component from image
    return [...Array(srcComponentCount).keys()].map(fromComponent => ({
      fromComponent,
      srcComponentCount,
      image,
      data: image.data,
    }))
  })
}

export const countElements = componentInfo =>
  componentInfo.map(({ data }) => data.length).reduce(sum)

export const getLargestTypeByBytes = componentInfo =>
  componentInfo
    .map(({ data }) => data)
    .reduce((lastType, typedArray) =>
      lastType.BYTES_PER_ELEMENT >= typedArray.BYTES_PER_ELEMENT
        ? lastType
        : typedArray
    )

export const fuseComponents = ({ componentInfo, arrayToFill }) => {
  const elementCount = countElements(componentInfo)
  const fusedImageData =
    arrayToFill ??
    new (getLargestTypeByBytes(componentInfo).constructor)(elementCount)

  const componentCount = componentInfo.length
  const tupleCount = elementCount / componentCount
  for (let cIdx = 0; cIdx < componentCount; cIdx++) {
    const { data, srcComponentCount, fromComponent } = componentInfo[cIdx]
    for (let tuple = 0; tuple < tupleCount; tuple++) {
      fusedImageData[tuple * componentCount + cIdx] =
        data[tuple * srcComponentCount + fromComponent]
    }
  }
  return fusedImageData
}
