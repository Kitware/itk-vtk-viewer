class ImJoyPluginAPI {
  async setup() {
    this.viewer = null
    itkVtkViewer.createViewerFromLocalFiles(container).then(viewer => {
      this.viewer = viewer
    })
  }

  async run(ctx) {
    if (ctx.data) {
      let multiscaleImage = null
      let is2D = false
      if (ctx.data.image) {
        multiscaleImage = await itkVtkViewer.utils.toMultiscaleSpatialImage(
          ctx.data.image,
          false,
          ctx.config.maxConcurrency
        )
        is2D = multiscaleImage.imageType.dimension === 2
      }
      let pointSets = null
      if (ctx.data.pointSets) {
        pointSets = ctx.data.pointSets
        if (!Array.isArray(pointSets)) pointSets = [pointSets]
        pointSets = pointSets.map(points =>
          itkVtkViewer.utils.ndarrayToPointSet(points)
        )
      }
      if (ctx.config) {
        const data = {
          image: multiscaleImage,
          labelImage: ctx.data?.labelImage,
          pointSets: pointSets,
          geometries: null,
          use2D: is2D,
          rotate: false,
          config: ctx.config,
        }
        this.viewer = await itkVtkViewer.createViewer(container, data)
      } else {
        if (multiscaleImage) {
          await this.setImage(ctx.data.image, ctx.config.maxConcurrency)
        }
        if (pointSets) {
          await this.setPointSets(ctx.data.pointSets)
        }
      }
    }
  }

  async setPointSets(pointSets) {
    if (!Array.isArray(pointSets)) pointSets = [pointSets]
    pointSets = pointSets.map(points =>
      itkVtkViewer.utils.ndarrayToPointSet(points)
    )
    if (this.viewer === null) {
      this.viewer = await itkVtkViewer.createViewer(container, {
        image: null,
        pointSets,
        geometries: null,
        rotate: false,
      })
    } else {
      await this.viewer.setPointSets(pointSets)
    }
  }

  addPointSet(pointSet) {
    let points = itkVtkViewer.utils.ndarrayToPointSet(pointSet)
    this.viewer.addPointSet(points)
  }

  async captureImage() {
    return await this.viewer.captureImage()
  }

  async setImage(image, maxConcurrency) {
    const multiscaleImage = await itkVtkViewer.utils.toMultiscaleSpatialImage(
      image,
      false,
      maxConcurrency
    )
    const is2D = multiscaleImage.imageType.dimension === 2
    if (this.viewer === null) {
      this.viewer = await itkVtkViewer.createViewer(container, {
        image: multiscaleImage,
        pointSets: null,
        geometries: null,
        use2D: is2D,
        rotate: false,
      })
    } else {
      await this.viewer.setImage(multiscaleImage, maxConcurrency)
    }
  }

  getImage(name) {
    return this.viewer.getImage(name)
  }

  async setLabelImage(labelImage) {
    if (this.viewer === null) {
      this.viewer = await itkVtkViewer.createViewer(container, {
        image: null,
        labelImage: labelImage,
        pointSets: null,
        geometries: null,
        rotate: false,
      })
    } else {
      await this.viewer.setLabelImage(labelImage)
    }
  }

  getLabelImage() {
    return this.viewer.getLabelImage()
  }

  registerEventListener(event, callback) {
    this.viewer.on(event, callback)
  }

  getConfig() {
    return this.viewer.getConfig()
  }

  setRenderingViewContainerStyle(containerStyle) {
    this.viewer.setRenderingViewContainerStyle(containerStyle)
  }
  getRenderingViewStyle() {
    return this.viewer.getRenderingViewContainerStyle()
  }

  setBackgroundColor(bgColor) {
    this.viewer.setBackgroundColor(bgColor)
  }
  getBackgroundColor() {
    return this.viewer.getBackgroundColor()
  }

  setUnits(units) {
    this.viewer.setUnits(units)
  }
  getUnits() {
    return this.viewer.getUnits()
  }

  setUICollapsed(collapsed) {
    this.viewer.setUICollapsed(collapsed)
  }
  getUICollapsed() {
    return this.viewer.getUICollapsed()
  }

  setRotateEnabled(enabled) {
    this.viewer.setRotateEnabled(enabled)
  }
  getRotateEnabled() {
    return this.viewer.getRotateEnabled()
  }

  setAnnotationsEnabled(enabled) {
    this.viewer.setAnnotationsEnabled(enabled)
  }
  getAnnotationsEnabled() {
    return this.viewer.getAnnotationsEnabled()
  }

  setAxesEnabled(enabled) {
    this.viewer.setAxesEnabled(enabled)
  }
  getAxesEnabled() {
    return this.viewer.getAxesEnabled()
  }

  setXSlice(position) {
    this.viewer.setXSlice(position)
  }

  getXSlice() {
    return this.viewer.getXSlice()
  }

  setYSlice(position) {
    this.viewer.setYSlice(position)
  }

  getYSlice() {
    return this.viewer.getYSlice()
  }

  setZSlice(position) {
    this.viewer.setZSlice(position)
  }
  getZSlice() {
    return this.viewer.getZSlice()
  }

  setViewMode(mode) {
    this.viewer.setViewMode(mode)
  }
  getViewMode() {
    return this.viewer.getViewMode()
  }

  getLayerNames() {
    return this.viewer.getLayerNames()
  }

  setLayerVisibility(visible, name) {
    this.viewer.setLayerVisibility(visible, name)
  }

  getLayerVisibility(name) {
    return this.viewer.getLayerVisibility(name)
  }

  selectLayer(name) {
    this.viewer.selectLayer(name)
  }

  setImageComponentVisibility(visibility, component, name) {
    this.viewer.setImageComponentVisibility(visibility, component, name)
  }

  getImageComponentVisibility(component, name) {
    return this.viewer.getImageComponentVisibility(component, name)
  }

  setImageInterpolationEnabled(enabled) {
    this.viewer.setImageInterpolationEnabled(enabled)
  }
  getImageInterpolationEnabled() {
    return this.viewer.getImageInterpolationEnabled()
  }

  setImageColorRange(range, component, name) {
    this.viewer.setImageColorRange(range, component, name)
  }

  getImageColorRange(component, name) {
    return this.viewer.getImageColorRange(component, name)
  }

  setImageColorRangeBounds(bounds, component, name) {
    this.viewer.setImageColorRangeBounds(bounds, component, name)
  }

  getImageColorRangeBounds(component, name) {
    return this.viewer.getImageColorRangeBounds(component, name)
  }

  setImageColorMap(colorMap, component, name) {
    this.viewer.setImageColorMap(colorMap, component, name)
  }

  getImageColorMap(component, name) {
    return this.viewer.getImageColorMap(component, name)
  }

  setImagePiecewiseFunctionGaussians(gaussians, component, name) {
    this.viewer.setImagePiecewiseFunctionGaussians(gaussians, component, name)
  }

  getImagePiecewiseFunctionGaussians(component, name) {
    return this.viewer.getImagePiecewiseFunctionGaussians(component, name)
  }

  setImageShadowEnabled(shadow, name) {
    this.viewer.setImageShadowEnabled(shadow, name)
  }

  getImageShadowEnabled(name) {
    return this.viewer.getImageShadowEnabled(name)
  }

  setImageGradientOpacity(opacity, name) {
    this.viewer.setImageGradientOpacity(opacity, name)
  }

  getImageGradientOpacity(name) {
    return this.viewer.getImageGradientOpacity(name)
  }

  setImageGradientOpacityScale(scale, name) {
    this.viewer.setImageGradientOpacityScale(scale, name)
  }

  getImageGradientOpacityScale(name) {
    return this.viewer.getImageGradientOpacityScale(name)
  }

  setImageVolumeSampleDistance(distance, name) {
    this.viewer.setImageVolumeSampleDistance(distance, name)
  }

  getImageVolumeSampleDistance(name) {
    return this.viewer.getImageVolumeSampleDistance(name)
  }

  setImageBlendMode(mode, name) {
    this.viewer.setImageBlendMode(mode, name)
  }

  getImageBlendMode(name) {
    return this.viewer.getImageBlendMode(name)
  }

  setLabelImageLookupTable(lookupTable, name) {
    this.viewer.setLabelImageLookupTable(lookupTable, name)
  }

  getLabelImageLookupTable(name) {
    return this.viewer.getLabelImageLookupTable(name)
  }

  setLabelImageBlend(blend, name) {
    this.viewer.setLabelImageBlend(blend, name)
  }

  getLabelImageBlend(name) {
    return this.viewer.getLabelImageBlend(name)
  }

  setLabelImageLabelNames(labelNames, name) {
    this.viewer.setLabelImageLabelNames(labelNames, name)
  }

  getLabelImageLabelNames(name) {
    return this.viewer.getLabelImageLabelNames(name)
  }

  setLabelImageWeights(weights, name) {
    this.viewer.setLabelImageWeights(weights, name)
  }

  getLabelImageWeights(name) {
    return this.viewer.getLabelImageWeights(name)
  }

  setCroppingPlanesEnabled(enabled) {
    this.viewer.setCroppingPlanesEnabled(enabled)
  }

  getCroppingPlanesEnabled() {
    return this.viewer.getCroppingPlanesEnabled()
  }

  setCroppingPlanes(croppingPlanes) {
    this.viewer.setCroppingPlanes(croppingPlanes)
  }

  getCroppingPlanes() {
    return this.viewer.getCroppingPlanes()
  }

  setImageVolumeScatteringBlend(scatteringBlend, name) {
    this.viewer.setImageVolumeScatteringBlend(scatteringBlend, name)
  }

  getImageVolumeScatteringBlend(name) {
    return this.viewer.getImageVolumeScatteringBlend(name)
  }

  setRpcMaxConcurrency(value) {
    this.viewer.setMaxConcurrency(value)
  }

  getRpcMaxConcurrency() {
    return this.viewer.getMaxConcurrency()
  }

  setCompareImages(fixedImageName, movingImageName, options) {
    return this.viewer.setCompareImages(
      fixedImageName,
      movingImageName,
      options
    )
  }

  getCompareImages(name) {
    return this.viewer.getCompareImages(name)
  }
}

export default ImJoyPluginAPI
