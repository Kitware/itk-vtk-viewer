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
  componentInfo
    .map(({ data, srcComponentCount }) => data.length / srcComponentCount)
    .reduce(sum)

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

export const pickAndFuseComponents = async ({
  image,
  labelImage,
  components,
}) => {
  // not Conglomerate, no label image, and all components needed: just return image
  if (
    !Array.isArray(image) &&
    !labelImage &&
    image.imageType.components === components.length
  )
    return image

  const [imageByComponent, labelByComponent] = [image, labelImage].map(image =>
    parseByComponent(image)
  )
  const componentInfo = components.map(
    comp =>
      comp >= 0 ? imageByComponent[comp] : labelByComponent[comp * -1 - 1] // label component index starts at -1
  )

  const imageArray = fuseComponents({
    componentInfo,
  })

  const ranges = componentInfo.map(
    ({ image: { ranges }, fromComponent }) => ranges && ranges[fromComponent]
  )

  // picks out one from ConglomerateImage
  const singleImage = Array.isArray(image) ? image[0] : image

  const itkImage = {
    ...singleImage,
    data: imageArray,
    imageType: {
      ...singleImage.imageType,
      components: components.length,
    },
    ranges,
  }
  return itkImage
}

export const composeComponents = images => {
  const componentCount = images.map(i => i.imageType.components).reduce(sum)
  // include all components
  const components = [...Array(componentCount).keys()]
  // compose Conglomerate images
  return pickAndFuseComponents({
    image: images,
    components,
  })
}
