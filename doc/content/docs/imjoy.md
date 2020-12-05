title: ImJoy Plugin
---

[![launch ImJoy](https://imjoy.io/static/badge/launch-imjoy-badge.svg)](http://imjoy.io/#/app?plugin=https://kitware.github.io/itk-vtk-viewer/app/)

An *itk-vtk-viewer* plugin is available for [ImJoy](https://imjoy.io), a plugin powered hybrid computing platform for deploying deep learning applications such as advanced image analysis tools.

## Installation

Install the plugin into the workspace with the following [ImJoy Web App](http://imjoy.io/#/app?plugin=https://kitware.github.io/itk-vtk-viewer/app/) or [ImJoy Lite App](http://imjoy.io/#/lite?plugin=https://kitware.github.io/itk-vtk-viewer/app/) links with the plugin URI:

```
https://kitware.github.io/itk-vtk-viewer/app/
```

Note that the link can also be used directly.

## Inputs

Supported context `data` inputs:

**image**: Image to be visualized. Can be an [itk.js Image](https://insightsoftwareconsortium.github.io/itk-js/api/Image.html) or a [scijs ndarray](http://scijs.net/packages/#scijs/ndarray) for JavaScript; for Python, it can be a [numpy](https://numpy.org) array.

The `image` key is optional; one can also call `setImage()` later.

Usage in javascript:
```javascript
const imageArray = ... // itk.js Image or scijs ndarray
const viewer = await api.createWindow({
  src: "https://kitware.github.io/itk-vtk-viewer/app/",
  data: { image: imageArray }
  })
```

Usage in Python
```python
# a 2D or 3D numpy array
image_array = np.random.randint(0, 255, [500, 500], dtype='uint8')
viewer = await api.createWindow(src="https://kitware.github.io/itk-vtk-viewer/app/",
                                data={"image": imageArray})
```

## API functions

In addition to the standard `setup` and `run` methods, the *itk-vtk-viewer* plugin provides the following methods:

## Main

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

### setRotateEnabled(enabled)

### getRotateEnabled()

Set/get whether the 3D scene is continuously rotated.

### setAnnotationsEnabled(enabled)

### getAnnotationsEnabled()

Set/get whether annotations such as the current pixel value, scale bar, or orientation widget are displayed.

### setAxesEnabled(enabled)

### getAxesEnabled()

Set/get whether spatial axes are visualized in the scene.

### setInterpolationEnabled(enabled)

### getInterpolationEnabled()

Set/get whether bilinear interpolation is used in the image slicing planes.

### setViewMode(mode)

### getViewMode()

Set/get the viewer mode for the current primary view. Valid values: 'XPlane', 'YPlane', 'ZPlane', or 'Volume'.

### getLayerNames()

Get the names of all data layers.

### setLayerVisibility(visible, name)

### getLayerVisibility(name)

Set/get whether the named layer is visible.

## Image

### setImage(image)

Set the image to be visualized. Can be an [itk.js Image](https://insightsoftwareconsortium.github.io/itk-js/api/Image.html) or a [scijs ndarray](http://scijs.net/packages/#scijs/ndarray) for JavaScript; for Python, it can be a [numpy](https://numpy.org) array.

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

### setImagePiecewiseFunctionGaussians(gaussians, component, name)

### getImagePiecewiseFunctionGaussians(component, name)

Set/get the gaussian parameters that define the piecewise function used to define
the volume rendering opacity transfer function and multi-component slice blending.

### setImageShadowEnabled(enabled, name)

### getImageShadowEnabled(name)

Set/get whether to used gradient-based shadows in the volume rendering.

### setImageGradientOpacity(opacity, name)

### getImageGradientOpacity(name)

Set/get the gradient opacity in the volume rendering.
