title: Embedded Viewer
---

ITK/VTK Viewer can be used within an existing web site as a library to embed interactive 3D visualizations for remote or local datasets. To do so, create a container element for the viewer as follows.

```html
<div class="itk-vtk-viewer" />
```

Moreover, the JavaScript library should also be added to the web page. Only one of the following is required

```html
<script type="text/javascript" src="https://kitware.github.io/itk-vtk-viewer/app/itkVtkViewerCDN.js"></script>
```

or

```html
<script type="text/javascript" src="https://unpkg.io/itk-vtk-viewer/dist/itkVtkViewerCDN.js"></script>
```

or, fixed to a specific version:

```html
<script type="text/javascript" src="https://unpkg.io/itk-vtk-viewer@9.14.1/dist/itkVtkViewerCDN.js"></script>
```

### Viewer configuration

The container `<div/>` can be extended with the following set of [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes):

- (Mandatory) __data-url__="/data/005_36months_T2_RegT1_Reg2Atlas_ManualBrainMask_Stripped.nrrd"
- (Optional) __data-viewport__="300x200" | default is 500x500
- (Optional) __data-background-color__="00aa00" | default is black
- (Optional) __data-use2D="false"


![ItkVtkViewer-embedded](./embeddedViewer.png)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    [...]

    <div
      style="float: right; display: inline-block; border: 2px solid gray; margin: 20px; margin-right: 50px;"
      class="itk-vtk-viewer"
      data-url="https://data.kitware.com/api/v1/file/564a65d58d777f7522dbfb61/download/data.nrrd"
      data-viewport="450x300"
    ></div>

    [...]

    <div
      style="float: left; display: inline-block; border: 2px solid gray;
      class="itk-vtk-viewer"
      data-url="https://data.kitware.com/api/v1/file/5b8446868d777f43cc8d5ec1/download/data.nrrd"
      data-viewport="450x400"
      data-background-color="ffffff"
    ></div>

    [...]

    <script type="text/javascript" src="https://unpkg.io/itk-vtk-viewer/dist/itkVtkViewerCDN.js"></script>
  </body>
</html>
```
