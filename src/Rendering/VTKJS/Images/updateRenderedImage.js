import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import { mat4 } from 'gl-matrix'

import updateVisualizedComponents from './updateVisualizedComponents'
import { fuseImages } from './fuseImages'
import { computeRenderedBounds } from '../Main/computeRenderedBounds'
import { worldBoundsToIndexBounds } from '../../../IO/MultiscaleSpatialImage'
import { computeRanges } from '../../../IO/Analyze/computeRanges'

export const RENDERED_VOXEL_MAX = 512 * 512 * 512 * 2

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

const pickByVisualized = (preComputedRanges, visualizedComponents) =>
  visualizedComponents
    .map(
      sourceIdx => preComputedRanges[sourceIdx] ?? [0, 1] // fallback for label component
    )
    .map(([min, max]) => ({
      min,
      max,
    }))

async function updateRenderedImage(context) {
  const name = context.images.updateRenderedName
  const actorContext = context.images.actorContext.get(name)

  updateVisualizedComponents(context, name)

  const {
    image,
    labelImage,
    editorLabelImage,
    visualizedComponents,
  } = actorContext

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  const { targetScale } = context

  // always load full image if least detailed scale
  const isCoarsestScale = (image || labelImage).coarsestScale === targetScale
  const boundsToLoad = isCoarsestScale
    ? undefined
    : computeRenderedBounds(context)

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

  const preComputedRanges = image?.scaleInfo[targetScale].ranges

  const componentRangesOfFused =
    preComputedRanges &&
    pickByVisualized(preComputedRanges, visualizedComponents)

  const isFuseNeeded =
    labelAtScale ||
    Array.isArray(imageAtScale) || // is conglomerate
    imageAtScale.imageType.components !== visualizedComponents.length // more components in image than renderable

  const fusedInfo = isFuseNeeded
    ? await fuseImages({
        imageAtScale,
        labelAtScale,
        visualizedComponents,
        isRangeNeeded: !componentRangesOfFused,
      })
    : {
        itkImage: imageAtScale,
      }

  const { itkImage, componentRanges } = {
    ...fusedInfo,
    componentRanges:
      fusedInfo.componentRanges ??
      componentRangesOfFused ??
      (await computeRanges(
        imageAtScale.data,
        imageAtScale.imageType.components
      )),
  }

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
