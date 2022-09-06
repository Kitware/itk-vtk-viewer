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

    actorContext.fusedImageRanges = componentRanges
    actorContext.fusedImageData = itkImage.data
    const { fusedImageData } = actorContext

    if (!actorContext.fusedImage) {
      actorContext.fusedImage = vtkImage
    } else {
      // re-use fusedImage
      actorContext.fusedImage.setOrigin(vtkImage.getOrigin())
      actorContext.fusedImage.setSpacing(vtkImage.getSpacing())
      actorContext.fusedImage.setDirection(vtkImage.getDirection())
      actorContext.fusedImage.setDimensions(vtkImage.getDimensions())
    }
    const { fusedImage } = actorContext

    const imageScalars = vtkImage.getPointData().getScalars()

    const numberOfComponents = itkImage.imageType.components
    const fusedImageScalars = vtkDataArray.newInstance({
      name: imageScalars.getName() || 'Scalars',
      values: fusedImageData,
      numberOfComponents,
    })

    // for areBoundsBigger guard
    actorContext.loadedBounds = actorContext.fusedImage.getBounds()

    fusedImage.getPointData().setScalars(fusedImageScalars)
    // Trigger VolumeMapper scalarTexture update
    fusedImage.modified()

    componentRanges.forEach((range, comp) =>
      fusedImageScalars.setRange(range, comp)
    )

    return images
  },
})

export default assignRenderedImage
