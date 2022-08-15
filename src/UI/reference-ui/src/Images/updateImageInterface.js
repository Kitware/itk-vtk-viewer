import updateAvailableComponents from './updateAvailableComponents'
import toggleInterpolation from './toggleInterpolation'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import toggleShadow from './toggleShadow'
import applyGradientOpacity from './applyGradientOpacity'
import applyGradientOpacityScale from './applyGradientOpacityScale'
import applyVolumeSampleDistance from './applyVolumeSampleDistance'
import applyBlendMode from './applyBlendMode'

function updateImageInterface(context) {
  updateAvailableComponents(context)

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image
  const component = actorContext.selectedComponent

  // If not a 2D RGB image
  if (actorContext.independentComponents) {
    context.images.colorRangeInputRow.style.display = 'flex'
    context.images.colorMapSelector.style.display = 'block'
  } else {
    context.images.colorRangeInputRow.style.display = 'none'
    context.images.colorMapSelector.style.display = 'none'
  }

  if (image) {
    if (image.imageType.dimension === 3) {
      context.images.volumeRow1.style.display = 'flex'
      context.images.volumeRow2.style.display = 'flex'
      if (context.main.xPlaneRow) {
        context.main.xPlaneRow.style.display = 'flex'
        context.main.yPlaneRow.style.display = 'flex'
        context.main.zPlaneRow.style.display = 'flex'
      }
    } else {
      context.images.volumeRow1.style.display = 'none'
      context.images.volumeRow2.style.display = 'none'
      if (context.main.xPlaneRow) {
        context.main.xPlaneRow.style.display = 'none'
        context.main.yPlaneRow.style.display = 'none'
        context.main.zPlaneRow.style.display = 'none'
      }
    }

    toggleInterpolation(context, { data: name })

    if (actorContext.colorRanges.has(component)) {
      applyColorRange(context, {
        data: {
          name,
          component,
          range: actorContext.colorRanges.get(component),
        },
      })
    }

    if (actorContext.colorRangeBounds.has(component)) {
      applyColorRangeBounds(context, {
        data: {
          name,
          component,
          range: actorContext.colorRangeBounds.get(component),
        },
      })
    }

    if (actorContext.colorMaps.has(component)) {
      const colorMap = actorContext.colorMaps.get(component)
      applyColorMap(context, {
        data: {
          name,
          component,
          colorMap,
        },
      })
      context.images.iconSelector.setSelectedValue(colorMap)
    }

    toggleShadow(context, { data: name })
    applyGradientOpacity(context, {
      data: { name, gradientOpacity: actorContext.gradientOpacity },
    })
    applyGradientOpacityScale(context, {
      data: { name, gradientOpacityScale: actorContext.gradientOpacityScale },
    })
    applyVolumeSampleDistance(context, {
      data: { name, volumeSampleDistance: actorContext.volumeSampleDistance },
    })
    applyBlendMode(context, {
      data: { name, blendMode: actorContext.blendMode },
    })
  }
}

export default updateImageInterface
