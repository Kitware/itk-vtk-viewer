title: Config
---

This documentation provides more detailed information about the viewer configuration.

The viewer configuration is a JSON-serializable JavaScript object in the browser and Python dictionary in a Python environment.

To obtain a viewer's configuration, call the [viewer API `getConfig()` method](../api/).

Pass a viewer's configuration during creation with the `config` option.

The followings sections describe the configuration fields.

## Viewer Config

### viewerConfigVersion

This is a "major.minor" version of the configuration. The major version
changes with incompatible configuration -- a viewer will only use a
configuration that has the same major version. The minor version indicates
supported configuration entries.

### uiMachineOptions

How to render the user interface. Either `'reference'` or `{ href: 'https://url.to/uiMachineOptionsESM.js, export: 'default' }`, or a JavaScript object with the UI machine options. If a JavaScript object, it will not be serializable.

### xyLowerLeft

When viewing the Z slice, the X-Y plane, whether the origin is in the lower left
or upper left.

### renderingViewContainerStyle

CSS style of the container (`div`) for the rendering views.

### uiCollapsed

Whether the user interface is collapsed.

## Main Config

### backgroundColor

Background color of the renderer.

### units

Spatial length units displayed in the scale bar.
