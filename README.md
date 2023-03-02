## [ITK/VTK Viewer - Web based Image, Mesh, and Point Set Viewer](http://kitware.github.io/itk-vtk-viewer/)

![Build and Test](https://github.com/Kitware/itk-vtk-viewer/workflows/Build%20and%20Test/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![npm-download](https://img.shields.io/npm/dm/itk-vtk-viewer.svg)
[![](https://data.jsdelivr.com/v1/package/npm/itk-vtk-viewer/badge?style=rounded)](https://www.jsdelivr.com/package/npm/itk-vtk-viewer)
![npm-version-requirement](https://img.shields.io/badge/npm->=8.0.0-brightgreen.svg)
![node-version-requirement](https://img.shields.io/badge/node->=12.0.0-brightgreen.svg)
[![launch ImJoy](https://imjoy.io/static/badge/launch-imjoy-badge.svg)](http://imjoy.io/#/app?plugin=https://kitware.github.io/itk-vtk-viewer/app/)
[![DOI](https://zenodo.org/badge/92198432.svg)](https://zenodo.org/badge/latestdoi/92198432)

# Introduction

ITK/VTK Viewer is an open-source software system for medical and
scientific image, mesh, and point set visualization.

# Reporting Issues

If you would like to discuss a bug or possible improvement:

1. If you have a patch, please read the [CONTRIBUTING.md][] document.

2. Open an entry in the [Issue Tracker][].

[contributing.md]: CONTRIBUTING.md
[issue tracker]: https://github.com/Kitware/itk-vtk-viewer/issues

# Requirements

In general ITK/VTK Viewer tries to be as portable as possible; the specific configurations below are tested and known to work.

ITK/VTK Viewer supports the following development environments:

- Node 16+
- NPM 8+

and the following browsers:

- Firefox
- Chrome
- Safari

# Documentation

See the [documentation](https://kitware.github.io/itk-vtk-viewer) for a
getting started guide, advanced documentation, and API descriptions.

# Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for instructions to contribute.

# License

ITK/VTK Viewer is distributed under the OSI-approved BSD 3-clause License.
See [Copyright.txt][] for details.

[copyright.txt]: Copyright.txt

# Build Blosc with Debug

Checkout `c-blosc` git submodule, then

`itk-wasm --build-dir web-build build -- -DCMAKE_BUILD_TYPE=Debug`
