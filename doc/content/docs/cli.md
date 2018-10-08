title: Command Line Interface
---

ITK/VTK Viewer can be used as a command line tool for opening and visualizing your local data file.

## Installation

First, [install Node.js](https://nodejs.org/en/download/), if not already installed. After Node.js is installed, the `node` and `npm` executables should be in your `PATH`.

```sh
$ npm install itk-vtk-viewer -g
```

This command will install the application globally, which will provide a new command line executable, `itk-vtk-viewer`:

```sh
$ itk-vtk-viewer

  Usage: itk-vtk-viewer [options] ] [inputFile]

    Options:

    -V, --version      output the version number
    -p, --port [3000]  Start web server with given port (default: 3000)
    -s, --server-only  Do not open the web browser

    -h, --help         output usage information
```

### Quick start

To visualize an image, pass the path to the file to visualize. By default, a new tab will open in your browser with your visualization.

```sh
$ itk-vtk-viewer ./MRHead.nrrd

itk-vtk-viewer
  => Serving .

       http://10.10.10.10:3000/?fileToLoad=/data/MRHead.nrrd
```

### Drag and drop viewer

Instead of specifying files via the command line,

1. drag and drop,
2. click on the viewer page, or
3. press the *Enter* key

after starting the executable without positional arguments:

```sh
$ itk-vtk-viewer
```

![ItkVtkViewer](./viewer.jpg)
