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

### setImage(image)

Set the image to be visualized. Can be an [itk.js Image](https://insightsoftwareconsortium.github.io/itk-js/api/Image.html) or a [scijs ndarray](http://scijs.net/packages/#scijs/ndarray) for JavaScript; for Python, it can be a [numpy](https://numpy.org) array.

### setBackgroundColor(bgColor)

Set the rendering background color. An array of RGB values from 0.0 to 1.0,
e.g. [1.0, 0.5, 0.5].

### getBackgroundColor()

Get the current rendering background color.

### setUnits(units)

Set the string identifying the spatial length units in the scale bar.

### getUnits()

Get the string identifying the spatial length units in the scale bar.

### setUICollapsed(collapsed)

Set whether the user interface is collapsed.

### getUICollapsed()

Get whether the user interface is collapsed.

### setRotateEnabled(enabled)

Set whether the 3D scene is continuously rotated.

### getRotateEnabled()

Get whether the 3D scene is continuously rotated.

### setAnnotationsEnabled(enabled)

Set whether annotations such as the current pixel value, scale bar, or orientation widget are displayed.

### getAnnotationsEnabled()

Get whether annotations such as the current pixel value, scale bar, or orientation widget are displayed.

### setAxesEnabled(enabled)

Set whether spatial axes are visualized in the scene.

### getAxesEnabled()

Get whether spatial axes are visualized in the scene.

### setInterpolationEnabled(enabled)

Set whether bilinear interpolation is used in the image slicing planes.

### getInterpolationEnabled()

Get whether bilinear interpolation is used in the image slicing planes.

### setViewMode(mode)

Set the viewer mode for the current primary view. Valid values: 'XPlane', 'YPlane', 'ZPlane', or 'VolumeRendering'.

### getViewMode()

Get the viewer mode for the current primary view.
