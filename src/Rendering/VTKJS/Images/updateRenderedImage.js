import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'
import numericalSort from '../numericalSort'
import { fuseImages } from './fuseImages'
import { computeRanges } from './fuseImagesUtils'

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

async function updateRenderedImage(context) {
  const name = context.images.updateRenderedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const { image, labelImage, editorLabelImage } = actorContext

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  const { renderedScale } = actorContext

  const [imageAtScale, labelAtScale] = await Promise.all(
    [image, labelImage]
      .filter(Boolean)
      .map(image => image.scaleLargestImage(renderedScale))
  )
  if (labelAtScale) updateContextWithLabelImage(actorContext, labelAtScale)

  const isFuseNeeded = Array.isArray(imageAtScale) || labelAtScale
  const [itkImage, componentRanges] = isFuseNeeded
    ? await fuseImages({
        imageAtScale,
        labelAtScale,
        visualizedComponents: actorContext.visualizedComponents,
        existingArray: actorContext.fusedImageData,
      })
    : [
        imageAtScale,
        await computeRanges(
          imageAtScale.data,
          imageAtScale.imageType.components
        ),
      ]

  actorContext.fusedImageRanges = componentRanges
  actorContext.fusedImageData = itkImage.data
  const { fusedImageData } = actorContext

  const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage)

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

  fusedImage.getPointData().setScalars(fusedImageScalars)
  // Trigger VolumeMapper scalarTexture update
  fusedImage.modified()

  componentRanges.forEach((range, comp) =>
    fusedImageScalars.setRange(range, comp)
  )

  context.service.send({ type: 'RENDERED_IMAGE_ASSIGNED', data: name })
}

export default updateRenderedImage
