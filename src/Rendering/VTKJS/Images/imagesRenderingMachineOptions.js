import createImageRenderer from './createImageRenderer'
import toggleLayerVisibility from './toggleLayerVisibility'
import applyComponentVisibility from './applyComponentVisibility'
import updateRenderedImage from './updateRenderedImage'
import updateHistogram from './updateHistogram'
import selectImageLayer from './selectImageLayer'
import toggleInterpolation from './toggleInterpolation'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyRenderedImage from './applyRenderedImage'
import applyPiecewiseFunction from './applyPiecewiseFunction'
import applyShadow from './applyShadow'
import applyGradientOpacity from './applyGradientOpacity'
import applyVolumeSampleDistance from './applyVolumeSampleDistance'
import applyBlendMode from './applyBlendMode'
import applyLookupTable from './applyLookupTable'
import applyLabelImageBlend from './applyLabelImageBlend'
import applyLabelNames from './applyLabelNames'
import applyLabelImageWeights from './applyLabelImageWeights'
import applySelectedLabel from './applySelectedLabel'
import {
  computeRenderedBounds,
  getBoundsOfFullImage,
} from '../Main/croppingPlanes'

const EPSILON = 0.000001

const areBoundsBiggerThanLoaded = context => {
  const {
    images: { actorContext, updateRenderedName },
  } = context
  const { loadedBounds } = actorContext.get(updateRenderedName)

  const current = computeRenderedBounds(context)
  const fullImage = getBoundsOfFullImage(context)
  current.forEach((b, i) => {
    current[i] =
      i % 2
        ? Math.min(b, fullImage[i]) // high bound case
        : Math.max(b, fullImage[i]) // low bound case
  })

  return loadedBounds.some((loaded, i) => {
    return i % 2
      ? current[i] - loaded > EPSILON // high bound case: currentBounds[i] > loadedBound
      : loaded - current[i] > EPSILON // low bound case: currentBounds[i] < loadedBound
  })
}

const isTargetScaleLoaded = context => {
  const {
    images: { actorContext, updateRenderedName },
    targetScale,
  } = context
  const { loadedScale } = actorContext.get(updateRenderedName)
  return loadedScale === targetScale
}

const imagesRenderingMachineOptions = {
  imageRenderingActor: {
    services: {
      createImageRenderer,
      updateRenderedImage,
      updateHistogram,
    },

    actions: {
      applyRenderedImage,

      toggleLayerVisibility,

      toggleInterpolation,

      applyComponentVisibility,

      applyPiecewiseFunction,

      applyColorRange,

      applyColorMap,

      applyShadow,

      applyGradientOpacity,

      applyVolumeSampleDistance,

      applyBlendMode,

      applyLookupTable,
      applyLabelImageBlend,
      applyLabelNames,
      applyLabelImageWeights,
      applySelectedLabel,
    },

    guards: {
      isFramerateScalePickingOn: ({ images }) =>
        images.actorContext.get(images.updateRenderedName)
          .isFramerateScalePickingOn,

      // Check if different scale than loaded or if bounds are larger than loaded
      isImageUpdateNeeded: context =>
        context.isUpdateForced ||
        !isTargetScaleLoaded(context) ||
        areBoundsBiggerThanLoaded(context),
    },
  },

  actions: {
    selectImageLayer,
  },
}

export default imagesRenderingMachineOptions
