import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray'

import updateVisualizedComponents from './updateVisualizedComponents'
import numericalSort from '../numericalSort'
import { fuseImages } from './fuseImages'
import { computeRanges } from './fuseImagesUtils'
import { computeRenderedBounds } from '../Main/croppingPlanes'
import { worldBoundsToIndexBounds } from '../../../IO/MultiscaleSpatialImage'
import { mat4 } from 'gl-matrix'

export const RENDERED_VOXEL_MAX = 512 * 512 * 512

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

const getVoxelCount = async (image, bounds, scale) => {
  const scaleInfo = image.scaleInfo[scale]

  if (!bounds) {
    return ['x', 'y', 'z']
      .map(dim => scaleInfo.arrayShape.get(dim))
      .reduce((voxels, dimSize) => voxels * dimSize, 1)
  }

  const indexToWorld = await image.scaleIndexToWorld(scale)

  const fullIndexBounds = image.getIndexBounds(scale)
  const indexBounds = worldBoundsToIndexBounds({
    bounds,
    fullIndexBounds,
    worldToIndex: mat4.invert([], indexToWorld),
  })
  return ['x', 'y', 'z']
    .map(dim => {
      const [start, end] = indexBounds.get(dim)
      return end - start + 1 // plus 1 as bounds are inclusive
    })
    .reduce((voxels, dimSize) => voxels * dimSize, 1)
}

async function updateRenderedImage(context) {
  const name = context.images.updateRenderedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const { image, labelImage, editorLabelImage } = actorContext

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  const { targetScale } = actorContext

  const boundsToLoad = context.main.areCroppingPlanesTouched
    ? computeRenderedBounds(context)
    : undefined // if not touched, keep growing bounds to fit whole image

  const voxelCount = await getVoxelCount(
    image || labelImage,
    boundsToLoad,
    targetScale
  )
  if (voxelCount > RENDERED_VOXEL_MAX)
    throw new Error(
      `Voxel count over max.  Requested: ${voxelCount} Max: ${RENDERED_VOXEL_MAX}`
    )

  const [imageAtScale, labelAtScale] = await Promise.all(
    [image, labelImage].map(image => image?.getImage(targetScale, boundsToLoad))
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
    loadedScale: targetScale,
  })
}

export default updateRenderedImage
