import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'
import vtkBoundingBox from 'vtk.js/Sources/Common/DataModel/BoundingBox'

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

export function computeRenderedBounds(context) {
  if (!context.main.croppingPlanes || context.main.croppingPlanes.length !== 6)
    return

  const renderedBounds = [...vtkBoundingBox.INIT_BOUNDS]
  context.main.croppingPlanes.forEach(({ origin }) =>
    vtkBoundingBox.addPoint(renderedBounds, ...origin)
  )
  return renderedBounds
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

  const boundsToLoad = context.main.areCroppingPlanesTouched
    ? computeRenderedBounds(context)
    : undefined // if not touched, keep growing bounds to fit whole image

  const [imageAtScale, labelAtScale] = await Promise.all(
    [image, labelImage].map(image =>
      image?.getImage(renderedScale, boundsToLoad)
    )
  )

  if (labelAtScale) updateContextWithLabelImage(actorContext, labelAtScale)

  const isFuseNeeded =
    Array.isArray(imageAtScale) || // is conglomerate
    labelAtScale ||
    imageAtScale.imageType.components !==
      actorContext.visualizedComponents.length // more components in image than renderable

  const [itkImage, componentRanges] = isFuseNeeded
    ? await fuseImages({
        imageAtScale,
        labelAtScale,
        visualizedComponents: actorContext.visualizedComponents,
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

  // for areBoundsBigger guard
  actorContext.loadedBounds = actorContext.fusedImage.getBounds()

  fusedImage.getPointData().setScalars(fusedImageScalars)
  // Trigger VolumeMapper scalarTexture update
  fusedImage.modified()

  componentRanges.forEach((range, comp) =>
    fusedImageScalars.setRange(range, comp)
  )

  context.service.send({
    type: 'RENDERED_IMAGE_ASSIGNED',
    data: name,
    loadedScale: renderedScale,
  })
}

export default updateRenderedImage
