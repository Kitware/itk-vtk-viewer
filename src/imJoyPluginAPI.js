const imJoyPluginAPI = {
  setup() {
    this.viewer = null
    itkVtkViewer.createViewerFromLocalFiles(container).then(viewer => {
      this.viewer = viewer
    })
  },

  async run(ctx) {
    if (ctx.data && ctx.data.image) {
      if (ctx.config && !this.viewer) {
        const multiscaleImage = await itkVtkViewer.utils.toMultiscaleChunkedImage(
          ctx.data.image
        )
        const is2D = multiscaleImage.imageType.dimension === 2
        this.viewer = await itkVtkViewer.createViewer(container, {
          image: multiscaleImage,
          pointSets: null,
          geometries: null,
          use2D: is2D,
          rotate: false,
          config: ctx.config,
        })
      } else {
        await this.setImage(ctx.data.image)
      }
    } else if (ctx.data && ctx.data.pointSets) {
      if (ctx.config && !this.viewer) {
        const pointSets = ctx.data.pointSets.map(points =>
          itkVtkViewer.utils.ndarrayToPointSet(points)
        )
        this.viewer = await itkVtkViewer.createViewer(container, {
          image: null,
          pointSets: pointSets,
          geometries: null,
          rotate: false,
          config: ctx.config,
        })
      } else {
        await this.setPointSets(ctx.data.pointSets)
      }
    }
  },

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
  },

  async captureImage() {
    return await this.viewer.captureImage()
  },

  async setImage(image) {
    const multiscaleImage = await itkVtkViewer.utils.toMultiscaleChunkedImage(
      image
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
      await this.viewer.setImage(multiscaleImage)
    }
  },

  getImage(name) {
    return this.viewer.getImage(name)
  },

  getConfig() {
    return this.viewer.getConfig()
  },

  setContainerStyle(containerStyle) {
    this.viewer.setContainerStyle(containerStyle)
  },
  getContainerStyle() {
    return this.viewer.getContainerStyle()
  },

  setBackgroundColor(bgColor) {
    this.viewer.setBackgroundColor(bgColor)
  },
  getBackgroundColor() {
    return this.viewer.getBackgroundColor()
  },

  setUnits(units) {
    this.viewer.setUnits(units)
  },
  getUnits() {
    return this.viewer.getUnits()
  },

  setUICollapsed(collapsed) {
    this.viewer.setUICollapsed(collapsed)
  },
  getUICollapsed() {
    return this.viewer.getUICollapsed()
  },

  setRotateEnabled(enabled) {
    this.viewer.setRotateEnabled(enabled)
  },
  getRotateEnabled() {
    return this.viewer.getRotateEnabled()
  },

  setAnnotationsEnabled(enabled) {
    this.viewer.setAnnotationsEnabled(enabled)
  },
  getAnnotationsEnabled() {
    return this.viewer.getAnnotationsEnabled()
  },

  setAxesEnabled(enabled) {
    this.viewer.setAxesEnabled(enabled)
  },
  getAxesEnabled() {
    return this.viewer.getAxesEnabled()
  },

  setXSlice(position) {
    this.viewer.setXSlice(position)
  },

  getXSlice() {
    return this.viewer.getXSlice()
  },

  setYSlice(position) {
    this.viewer.setYSlice(position)
  },

  getYSlice() {
    return this.viewer.getYSlice()
  },

  setZSlice(position) {
    this.viewer.setZSlice(position)
  },

  getZSlice() {
    return this.viewer.getZSlice()
  },

  setViewMode(mode) {
    this.viewer.setViewMode(mode)
  },
  getViewMode() {
    return this.viewer.getViewMode()
  },

  getLayerNames() {
    return this.viewer.getLayerNames()
  },

  setLayerVisibility(visible, name) {
    this.viewer.setLayerVisibility(visible, name)
  },

  getLayerVisibility(name) {
    return this.viewer.getLayerVisibility(name)
  },

  selectLayer(name) {
    this.viewer.selectLayer(name)
  },

  setImageComponentVisibility(visibility, component, name) {
    this.viewer.setImageComponentVisibility(visibility, component, name)
  },

  getImageComponentVisibility(component, name) {
    return this.viewer.getImageComponentVisibility(component, name)
  },

  setImageInterpolationEnabled(enabled) {
    this.viewer.setImageInterpolationEnabled(enabled)
  },
  getImageInterpolationEnabled() {
    return this.viewer.getImageInterpolationEnabled()
  },

  setImageColorRange(range, component, name) {
    this.viewer.setImageColorRange(range, component, name)
  },

  getImageColorRange(component, name) {
    return this.viewer.getImageColorRange(component, name)
  },

  setImageColorRangeBounds(bounds, component, name) {
    this.viewer.setImageColorRangeBounds(bounds, component, name)
  },

  getImageColorRangeBounds(component, name) {
    return this.viewer.getImageColorRangeBounds(component, name)
  },

  setImageColorMap(colorMap, component, name) {
    this.viewer.setImageColorMap(colorMap, component, name)
  },

  getImageColorMap(component, name) {
    return this.viewer.getImageColorMap(component, name)
  },

  setImagePiecewiseFunctionGaussians(gaussians, component, name) {
    this.viewer.setImagePiecewiseFunctionGaussians(gaussians, component, name)
  },

  getImagePiecewiseFunctionGaussians(component, name) {
    return this.viewer.getImagePiecewiseFunctionGaussians(component, name)
  },

  setImageShadowEnabled(shadow, name) {
    this.viewer.setImageShadowEnabled(shadow, name)
  },

  getImageShadowEnabled(name) {
    return this.viewer.getImageShadowEnabled(name)
  },

  setImageGradientOpacity(opacity, name) {
    this.viewer.setImageGradientOpacity(opacity, name)
  },

  getImageGradientOpacity(name) {
    return this.viewer.getImageGradientOpacity(name)
  },

  setImageGradientOpacityScale(scale, name) {
    this.viewer.setImageGradientOpacityScale(scale, name)
  },

  getImageGradientOpacityScale(name) {
    return this.viewer.getImageGradientOpacityScale(name)
  },

  setImageVolumeSampleDistance(distance, name) {
    this.viewer.setImageVolumeSampleDistance(distance, name)
  },

  getImageVolumeSampleDistance(name) {
    return this.viewer.getImageVolumeSampleDistance(name)
  },

  setImageBlendMode(mode, name) {
    this.viewer.setImageBlendMode(mode, name)
  },

  getImageBlendMode(name) {
    return this.viewer.getImageBlendMode(name)
  },

  setLabelImageLookupTable(lookupTable, name) {
    this.viewer.setLabelImageLookupTable(lookupTable, name)
  },

  getLabelImageLookupTable(name) {
    return this.viewer.getLabelImageLookupTable(name)
  },

  setLabelImageBlend(blend, name) {
    this.viewer.setLabelImageBlend(blend, name)
  },

  getLabelImageBlend(name) {
    return this.viewer.getLabelImageBlend(name)
  },

  setLabelImageLabelNames(labelNames, name) {
    this.viewer.setLabelImageLabelNames(labelNames, name)
  },

  getLabelImageLabelNames(name) {
    return this.viewer.getLabelImageLabelNames(name)
  },

  setLabelImageWeights(weights, name) {
    this.viewer.setLabelImageWeights(weights, name)
  },

  getLabelImageWeights(name) {
    return this.viewer.getLabelImageWeights(name)
  },
}

export default imJoyPluginAPI
