import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

import updateVisualizedComponents from './updateVisualizedComponents'
import { fuseImages } from './fuseImages'
import { computeRanges } from './fuseImagesUtils'
import { computeRenderedBounds } from '../Main/croppingPlanes'
import { worldBoundsToIndexBounds } from '../../../IO/MultiscaleSpatialImage'
import { mat4 } from 'gl-matrix'

export const RENDERED_VOXEL_MAX = 512 * 512 * 512

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

  const { targetScale } = context

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
      `Voxel count over max at scale ${targetScale}. Requested: ${voxelCount} Max: ${RENDERED_VOXEL_MAX}`
    )

  const [imageAtScale, labelAtScale] = await Promise.all(
    [image, labelImage].map(image => image?.getImage(targetScale, boundsToLoad))
  )

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

  const vtkImage = vtkITKHelper.convertItkToVtkImage(itkImage)
  return {
    itkImage,
    vtkImage,
    labelAtScale,
    componentRanges,
    loadedScale: targetScale,
    name,
  }
}

export default updateRenderedImage
