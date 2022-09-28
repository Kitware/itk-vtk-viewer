import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'
import { assign } from 'xstate'
import numericalSort from '../numericalSort'

const updateContextWithLabelImage = (actorContext, scaleLabelImage) => {
  const uniqueLabelsSet = new Set(scaleLabelImage.data)
  const uniqueLabels = Array.from(uniqueLabelsSet)
  // The volume mapper currently only supports ColorTransferFunction's,
  // not LookupTable's
  // lut.setAnnotations(uniqueLabels, uniqueLabels);
  uniqueLabels.sort(numericalSort)
  actorContext.uniqueLabels = uniqueLabels
  actorContext.renderedLabelImage = scaleLabelImage
}

const assignRenderedImage = assign({
  images: (
    { images },
    { data: { name, componentRanges, itkImage, vtkImage, labelAtScale } }
  ) => {
    const actorContext = images.actorContext.get(name)

    if (labelAtScale) updateContextWithLabelImage(actorContext, labelAtScale)

    if (actorContext.fusedImage) {
      // re-use fusedImage
      actorContext.fusedImage.setOrigin(vtkImage.getOrigin())
      actorContext.fusedImage.setSpacing(vtkImage.getSpacing())
      actorContext.fusedImage.setDirection(vtkImage.getDirection())
      actorContext.fusedImage.setDimensions(vtkImage.getDimensions())
    } else {
      actorContext.fusedImage = vtkImage
    }
    const { fusedImage } = actorContext

    // for areBoundsBigger guard
    actorContext.loadedBounds = fusedImage.getBounds()

    actorContext.fusedImageRanges = componentRanges
    actorContext.fusedImageData = itkImage.data
    const imageScalars = vtkImage.getPointData().getScalars()

    const numberOfComponents = itkImage.imageType.components
    const fusedImageScalars = vtkDataArray.newInstance({
      name: imageScalars.getName() || 'Scalars',
      values: actorContext.fusedImageData,
      numberOfComponents,
    })

    fusedImage.getPointData().setScalars(fusedImageScalars)

    componentRanges.forEach((range, comp) =>
      fusedImageScalars.setRange(range, comp)
    )

    // Keeps ProxyRepresentation's call of fusedImageScalars.getRange() from slow computation of "magnitude" combination of components
    // We don't use.
    fusedImageScalars.setRange({ min: 0, max: 1 }, numberOfComponents)

    // Trigger VolumeMapper scalarTexture update
    fusedImage.modified()

    return images
  },
})

export default assignRenderedImage
