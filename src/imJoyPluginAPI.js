const imJoyPluginAPI = {
  setup() {
    this.viewer = null
    itkVtkViewer.createViewerFromLocalFiles(container).then(viewer => {
      this.viewer = viewer
    })
    api.log('itk-vtk-viewer loaded successfully.')
  },

  async run(ctx) {
    if (ctx.data && ctx.data.image) {
      await this.setImage(ctx.data.image)
    }
  },

  async setImage(image) {
    let itkImage = image
    if (image.shape !== undefined && image.stride !== undefined) {
      itkImage = itkVtkViewer.utils.ndarrayToItkImage(image)
    }

    const is2D = itkImage.imageType.dimension === 2
    if (this.viewer === null) {
      this.viewer = await itkVtkViewer.createViewer(container, {
        image: itkImage,
        pointSets: null,
        geometries: null,
        use2D: is2D,
        rotate: false,
      })
    } else {
      const vtkImage = itkVtkViewer.utils.vtkITKHelper.convertItkToVtkImage(
        itkImage
      )
      await this.viewer.setImage(vtkImage)
    }
  },

  setBackgroundColor(bgColor) {
    this.viewer.setBackgroundColor(bgColor)
  },
  getBackgroundColor() {
    return this.viewer.getBackgroundColor()
  },

  setUICollapsed(collapsed) {
    this.viewer.setUICollapsed(collapsed)
  },
  getUICollapsed() {
    return this.viewer.getUICollapsed()
  },

  setAnnotationsEnabled(enabled) {
    this.viewer.setAnnotationsEnabled(enabled)
  },
  getAnnotationsEnabled() {
    return this.viewer.getAnnotationsEnabled()
  },
}

export default imJoyPluginAPI
