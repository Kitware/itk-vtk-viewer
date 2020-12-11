import updateAvailableComponents from './updateAvailableComponents'
import toggleInterpolation from './toggleInterpolation'
import applyColorRangeBounds from './applyColorRangeBounds'
import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import toggleShadow from './toggleShadow'
import applyGradientOpacity from './applyGradientOpacity'
import applyGradientOpacityScale from './applyGradientOpacityScale'

import vtkITKHelper from 'vtk.js/Sources/Common/DataModel/ITKHelper'

function updateImageInterface(context) {
  updateAvailableComponents(context)

  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image
  const component = actorContext.selectedComponent

  const collapsibleClass = `${context.id}-collapsible`
  // If not a 2D RGB image
  if (actorContext.independentComponents) {
    context.images.colorRangeInputRow.style.display = 'flex'
    context.images.colorRangeInputRow.classList.add(collapsibleClass)
    context.images.colorMapSelector.style.display = 'block'
  } else {
    context.images.colorRangeInputRow.style.display = 'none'
    context.images.colorRangeInputRow.classList.remove(collapsibleClass)
    context.images.colorMapSelector.style.display = 'none'
  }

  if (image) {
    if (image.imageType.dimension === 3) {
      context.images.volumeRow1.style.display = 'flex'
      context.images.volumeRow2.style.display = 'flex'
      context.main.xPlaneRow.style.display = 'block'
      context.main.yPlaneRow.style.display = 'block'
      context.main.zPlaneRow.style.display = 'block'
    } else {
      context.images.volumeRow1.style.display = 'none'
      context.images.volumeRow2.style.display = 'none'
      context.main.xPlaneRow.style.display = 'none'
      context.main.yPlaneRow.style.display = 'none'
      context.main.zPlaneRow.style.display = 'none'
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

    //debugger
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

    if (actorContext.piecewiseFunctionGaussians.has(component)) {
      const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
      applyPiecewiseFunctionGaussians(context, {
        data: {
          name,
          component,
          gaussians,
        },
      })
    }

    toggleShadow(context, { data: name })
    applyGradientOpacity(context, {
      data: { name, gradientOpacity: actorContext.gradientOpacity },
    })
    applyGradientOpacityScale(context, {
      data: { name, gradientOpacityScale: actorContext.gradientOpacityScale },
    })
  }
}

export default updateImageInterface
