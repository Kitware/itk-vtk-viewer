title: ImJoy Plugin
---

[![launch ImJoy](https://imjoy.io/static/badge/launch-imjoy-badge.svg)](http://imjoy.io/#/app?plugin=https://kitware.github.io/itk-vtk-viewer/app/)

An *itk-vtk-viewer* plugin is available for [ImJoy](https://imjoy.io), a plugin powered hybrid computing platform for deploying deep learning applications such as advanced image analysis tools.

![ImJoy itk-vtk-viewer plugin](./imjoy.png)

## Installation

Install the plugin into the workspace with the following [ImJoy Web App](http://imjoy.io/#/app?plugin=https://kitware.github.io/itk-vtk-viewer/app/) or [ImJoy Lite App](http://imjoy.io/lite?plugin=https://kitware.github.io/itk-vtk-viewer/app/) links with the plugin URI:

```
https://kitware.github.io/itk-vtk-viewer/app/
```

Note that the link can also be used directly.

To install a specific version, e.g. version `10.8.0`, use the URI:

```
https://unpkg.com/itk-vtk-viewer@10.8.0/dist/index.html
```

## Inputs

Supported context `data` inputs:

**image**: Image to be visualized. See **setImage(image)** API function for the supported image types.


The `image` key is optional; one can also call `setImage()` later.

Usage in javascript:
```javascript
const viewer = await api.createWindow({
  src: "https://kitware.github.io/itk-vtk-viewer/app/",
  data: { image: "https://thewtex.github.io/allen-ccf-itk-vtk-zarr/average_template_50_chunked.zarr"}
  })
```

Usage in Python
```python
# a 2D or 3D numpy array
image_array = np.random.randint(0, 255, [500, 500], dtype='uint8')
viewer = await api.createWindow(src="https://kitware.github.io/itk-vtk-viewer/app/",
                                data={"image": image_array})
```

## API functions

In addition to the standard `setup` and `run` methods, the *itk-vtk-viewer* plugin provides the following methods:

### setImage(image)

Set the image to be visualized. It can be one of the following:
  - An [itk.js Image](https://insightsoftwareconsortium.github.io/itk-js/api/Image.html)
  - An [imjoy-rpc](https://github.com/imjoy-team/imjoy-rpc) encoded ndarray for JavaScript; for Python, it can be a [numpy](https://numpy.org) array
  - An image `File` or `FileList` (can also be an array of `File`) in Javascript
  - A URL or a list of URLs to a remote image file (e.g. a zarr file)

If you want to pass a [scijs ndarray](http://scijs.net/packages/#scijs/ndarray) to `setImage`, you can use the following function to encoded it into an imjoy-rpc encoded array.
```
function encodeScijsArray(array){
  return {
    _rtype: 'ndarray',
    _rdtype: array.dtype,
    _rshape: array.shape,
    _rvalue: array.data.buffer,
  }
}
```