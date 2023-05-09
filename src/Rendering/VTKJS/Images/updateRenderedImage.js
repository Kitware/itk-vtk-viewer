import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'
import { mat4 } from 'gl-matrix'

import { fuseImages } from './fuseImages'
import { computeRenderedBounds } from '../Main/computeRenderedBounds'
import { worldBoundsToIndexBounds } from '../../../IO/MultiscaleSpatialImage'
import componentTypeToTypedArray from '../../../IO/componentTypeToTypedArray'

export const RENDERED_VOXEL_MAX = 512 * 512 * 512 * 2
const RENDERED_IMAGE_BYTES_MAX = RENDERED_VOXEL_MAX * 2 // 2 byte pixel type = 1073741824

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

const computeBytes = async (
  { imageType: { componentType, components } },
  voxelCount
) => {
  const bytesPerElement = componentTypeToTypedArray.get(componentType)
    .BYTES_PER_ELEMENT
  return bytesPerElement * components * voxelCount
}

const pickVisualized = (preComputedRanges, visualizedComponents) =>
  visualizedComponents
    .map(
      sourceIdx => preComputedRanges[sourceIdx] ?? [0, 1] // fallback for label component
    )
    .map(([min, max]) => ({
      min,
      max,
    }))

async function updateRenderedImage(context) {
  const name = context.actorName
  const actorContext = context.images.actorContext.get(name)

  const {
    image,
    labelImage,
    editorLabelImage,
    visualizedComponents,
    compare,
  } = actorContext

  if (!image && !labelImage && !editorLabelImage) {
    return
  }

  const compareEnabled = compare.method && compare.method !== 'disabled'
  const fixedImage = compareEnabled
    ? context.images.actorContext.get(compare.fixedImageName)?.image
    : undefined

  if (compareEnabled && !fixedImage)
    console.error(
      `Did not find image to compare with name: ${compare.fixedImageName}`
    )

  const baseImage = fixedImage ?? image ?? labelImage

  const { targetScale } = context
  // always load full image if least detailed scale
  const isCoarsestScale = baseImage.coarsestScale === targetScale
  const boundsToLoad = isCoarsestScale
    ? undefined
    : computeRenderedBounds(context)

  const voxelCount = await getVoxelCount(baseImage, boundsToLoad, targetScale)
  if (voxelCount > RENDERED_VOXEL_MAX)
    throw new Error(
      `Voxel count over max at scale ${targetScale}. Requested: ${voxelCount} Max: ${RENDERED_VOXEL_MAX}`
    )

  const imageByteSize = await computeBytes(baseImage, voxelCount)
  if (!isCoarsestScale && imageByteSize > RENDERED_IMAGE_BYTES_MAX)
    throw new Error(
      `Image byte count over max at scale ${targetScale}. Requested: ${imageByteSize} Max: ${RENDERED_IMAGE_BYTES_MAX}`
    )

  const [imageAtScale, labelAtScale, fixedImageAtScale] = await Promise.all(
    [image, labelImage, fixedImage].map(image =>
      image?.getImage(targetScale, boundsToLoad)
    )
  )
  const imageOrLabelAtScale = imageAtScale ?? labelAtScale

  const preComputedRanges =
    baseImage?.scaleInfo[targetScale].ranges ?? imageOrLabelAtScale?.ranges

  const isFuseNeeded =
    (labelAtScale && imageAtScale) || // fuse with label image
    fixedImageAtScale ||
    Array.isArray(imageAtScale) || // is conglomerate
    imageOrLabelAtScale?.imageType.components !== visualizedComponents.length // more components in image than renderable

  const { itkImage, componentRanges } = isFuseNeeded
    ? await fuseImages({
        imageAtScale,
        labelAtScale,
        fixedImageAtScale,
        visualizedComponents,
        compare,
      })
    : {
        itkImage: imageOrLabelAtScale,
        componentRanges: pickVisualized(
          preComputedRanges,
          visualizedComponents
        ),
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
