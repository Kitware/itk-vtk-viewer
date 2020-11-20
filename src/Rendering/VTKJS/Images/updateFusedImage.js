function updateFusedImage(actorContext) {
  const image = actorContext.image
  const labelMap = actorContext.labelMap
  const editorLabelImage = actorContext.editorLabelImage

  if (!!!image && !!!labelMap && !!!editorLabelImage) {
    actorContext.fusedImage = null
    return
  }
  if (!!!image && !!!editorLabelImage) {
    actorContext.fusedImage = labelMap
    return
  }

  if (this.visualizedComponents.length === 0) {
    return null
  } else if (!!labelMap && this.visualizedComponents.length === 4) {
    return null
  }

  const imageScalars = image.getPointData().getScalars()
  const imageData = imageScalars.getData()
  const imageComponents = imageScalars.getNumberOfComponents()

  this.totalIntensityComponents = imageComponents

  if (!!!labelMap && imageComponents <= 4) {
    return image
  }

  const visualizedComponents = this.visualizedComponents.map(idx => idx)

  const fusedImage = vtkImageData.newInstance()
  fusedImage.setOrigin(image.getOrigin())
  fusedImage.setSpacing(image.getSpacing())
  fusedImage.setDirection(image.getDirection())
  const imageDimensions = image.getDimensions()

  if (!!labelMap) {
    const labelMapDimensions = labelMap.getDimensions()
    const dimensionsEqual = imageDimensions.every((dim, index) => {
      return labelMapDimensions[index] === dim
    })
    if (!dimensionsEqual) {
      console.error(
        `Dimensions not equal! Not fusing. Image: ${imageDimensions} Label map: ${labelMapDimensions}`
      )
      return image
    }
  }

  const numVisualizedComponents = this.visualizedComponents.length

  fusedImage.setDimensions(image.getDimensions())

  const imageTuples = imageScalars.getNumberOfTuples()

  let labelMapScalars = null
  let labelMapData = null

  if (!!labelMap) {
    labelMapScalars = labelMap.getPointData().getScalars()
    labelMapData = labelMapScalars.getData()
    visualizedComponents.push(-1)
  }

  const fusedImageComponents = labelMapData
    ? numVisualizedComponents + 1
    : numVisualizedComponents

  const length = imageTuples * fusedImageComponents

  // We only need to construct a new typed array if we don't already
  // have one of the right length.
  if (!!!this.fusedImageData || this.fusedImageData.length !== length) {
    this.fusedImageData = new imageData.constructor(length)
  }

  const copyStructure = []

  // Loop through comparing to last time and check which components need
  // to be copied into fusedImageData.  This loop doesn't include the
  // labelmap componentm, it will be checked next.
  for (let i = 0; i < numVisualizedComponents; i++) {
    if (visualizedComponents[i] !== this.lastVisualizedComponents[i]) {
      copyStructure.push({
        srcImageData: imageData,
        imageComponents: imageComponents,
        copyFromComponent: this.visualizedComponents[i],
        copyToComponent: i,
      })
    }
  }

  // Check if we need to re-copy the labelmap component
  if (
    visualizedComponents[numVisualizedComponents] === -1 &&
    this.lastVisualizedComponents[numVisualizedComponents] !== -1
  ) {
    copyStructure.push({
      srcImageData: labelMapData,
      imageComponents: 1,
      copyFromComponent: 0,
      copyToComponent: numVisualizedComponents,
    })
  }

  // console.log(`Copying ${copyStructure.length} components into fused image`)

  let fusedIndex = 0
  let imageIndex = 0
  for (let tuple = 0; tuple < imageTuples; tuple++) {
    for (let cIdx = 0; cIdx < copyStructure.length; cIdx++) {
      imageIndex =
        tuple * copyStructure[cIdx].imageComponents +
        copyStructure[cIdx].copyFromComponent
      fusedIndex =
        tuple * fusedImageComponents + copyStructure[cIdx].copyToComponent
      this.fusedImageData[fusedIndex] =
        copyStructure[cIdx].srcImageData[imageIndex]
    }
  }

  const fusedImageScalars = vtkDataArray.newInstance({
    name: imageScalars.getName() || 'Scalars',
    values: this.fusedImageData,
    numberOfComponents: fusedImageComponents,
  })

  fusedImage.getPointData().setScalars(fusedImageScalars)
  this.lastVisualizedComponents = visualizedComponents.map(idx => idx)
  return fusedImage
}

export default updateFusedImage
