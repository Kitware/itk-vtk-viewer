title: API
---

This documentation provides more detailed information about the viewer application programming interface (API).

## Viewer API

### getConfig()

Get the viewer configuration. This can be used to restore a viewer's
configuration when created.

### setRenderingViewContainerStyle(containerStyle)

### getRenderingViewContainerStyle()

Set/get the CSS style for the rendering view `div`'s.

### setBackgroundColor(bgColor)

### getBackgroundColor()

Set/get the rendering background color. An array of RGB values from 0.0 to 1.0,
e.g. [1.0, 0.5, 0.5].

### setUnits(units)

### getUnits()

Set/get the string identifying the spatial length units in the scale bar.

### setUICollapsed(collapsed)

### getUICollapsed()

Set/get whether the user interface is collapsed.

## Viewer Main API

### setRotateEnabled(enabled)

### getRotateEnabled()

Set/get whether the 3D scene is continuously rotated.

### setAnnotationsEnabled(enabled)

### getAnnotationsEnabled()

Set/get whether annotations such as the current pixel value, scale bar, or orientation widget are displayed.

### setAxesEnabled(enabled)

### getAxesEnabled()

Set/get whether spatial axes are visualized in the scene.

### setXSlice(position)

### getXSlice()

Set/get the position in world space of the X slicing plane.

### setYSlice(position)

### getYSlice()

Set/get the position in world space of the Y slicing plane.

### setZSlice(position)

### getZSlice()

Set/get the position in world space of the Z slicing plane.

### setViewMode(mode)

### getViewMode()

Set/get the viewer mode for the current primary view. Valid values: 'XPlane', 'YPlane', 'ZPlane', or 'Volume'.

### getLayerNames()

Get the names of all data layers.

### setLayerVisibility(visible, name)

### getLayerVisibility(name)

Set/get whether the named layer is visible.

### selectLayer(name)

Select the layer identified by `name` in the user interface.

### setCroppingPlanes(croppingPlanes)

The croppingPlanes parameter is an array of plane defining objects. Example: `[ { normal: [1, 0, 0], origin: [1, 2, 3] }, ...]`. Maximum number of planes is 6.  

### getCroppingPlanes(): [ { normal: [number, number, number], origin: [number, number, number] }, ...]

Returns array of plane objects.

### resetCroppingPlanes()

Sets cropping box to encompass all images and geometries 

### setCroppingPlanesEnabled(enabled)

Control visibility of croppingPlanes

### getCroppingPlanesEnabled(): Boolean

## Viewer Image API

### setImage(image)

Set the image to be visualized. Can be an [itk.js Image](https://insightsoftwareconsortium.github.io/itk-js/api/Image.html) or a [scijs ndarray](http://scijs.net/packages/#scijs/ndarray) for JavaScript; for Python, it can be a [numpy](https://numpy.org) array.

### setPointSets(pointSets)
Set a set of points to be visualized. It can be an array of or a single imjoy-rpc encoded ndarray. The ndarray should be an array with the shape [x, 2] or [x, 3].

### captureImage()
Take a screenshot for the current view and return a base64 encoded image string.

### setImageInterpolationEnabled(enabled)

### getImageInterpolationEnabled()

Set/get whether bilinear interpolation is used in the image slicing planes.

### setImageComponentVisibility(visibility, component, name)

### getImageComponentVisibility(component, name)

Set/get the given image intensity component index's visibility.

### setImageColorRange(range, component, name)

### getImageColorRange(component, name)

Set/get the [min, max] range of intensity values mapped to colors for the given
image component identified by name.

### setImageColorRangeBounds(bounds, component, name)

### getImageColorRangeBounds(component, name)

Set/get the [min, max] range of intensity values for color maps that provide a bounds
for user inputs.

### setImageColorMap(colorMap, componentIndex, name)

### getImageColorMap(componentIndex, name)

Set/get the color map for the given component/channel.

### setImagePiecewiseFunctionGaussians(gaussians, component, name)

### getImagePiecewiseFunctionGaussians(component, name)

Set/get the gaussian parameters that define the piecewise function used to define
the volume rendering opacity transfer function and multi-component slice blending.

### setImageShadowEnabled(enabled, name)

### getImageShadowEnabled(name)

Set/get whether to used gradient-based shadows in the volume rendering.

### setImageGradientOpacity(opacity, name)

### getImageGradientOpacity(name)

Set/get the gradient opacity in the volume rendering. Values range from 0.0 to 1.0.

### setImageGradientOpacityScale(scale, name)

### getImageGradientOpacityScale(name)

Set/get the gradient scale for gradient-based opacity in the volume rendering. Values range from 0.0 to 1.0.

### setImageVolumeSampleDistance(distance, name)

### getImageVolumeSampleDistance(name)

Set/get the depth sampling distance in the volume rendering. Values range from 0.0 to 1.0.

### setImageBlendMode(mode, name)

### getImageBlendMode(name)

Set/get the volume rendering blend mode. Supported modes: 'Composite',
'Maximum', 'Minimum', 'Average'.

### setLabelImageLookupTable(lookupTable, name)

### getLabelImageLookupTable(name)

Set/get the label image lookup table.

### setLabelImageBlend(blend, name)

### getLabelImageBlend(name)

Set/get the blend ratio between the label image and the intensity image.

### setLabelImageLabelNames(labeNames, name)

### getLabelImageLabelNames(name)

Set/get the string names for the integer label values. A Map of label integer to
string values.

### setLabelImageWeights(weights, name)

### getLabelImageWeights(name)

Set/get the rendering weights assigned to labels. A Map of label integer to
float, 0.0 to 1.0, weight.
string values.

### setImageScale(resolutionScale)

resolutionScale is a integer with 0 being the most detailed scale.