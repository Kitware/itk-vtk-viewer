itk-wasm
========

[![Examples](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/examples.yml/badge.svg)](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/examples.yml)
[![Toolchains](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/toolchains.yml/badge.svg)](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/toolchains.yml)
[![JavaScript,TypeScript](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/javascript-typescript.yml/badge.svg)](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/javascript-typescript.yml)
[![Python WASM](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/python-wasm.yml/badge.svg)](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/python-wasm.yml)
[![WASI](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/wasi.yml/badge.svg)](https://github.com/InsightSoftwareConsortium/itk-wasm/actions/workflows/wasi.yml)

[![npm version](https://badge.fury.io/js/itk-wasm.svg)](https://www.npmjs.com/package/itk-wasm)

[![DOI](https://zenodo.org/badge/45812381.svg)](https://zenodo.org/badge/latestdoi/45812381)

![License](https://img.shields.io/github/license/InsightSoftwareConsortium/itk-wasm) ![GitHub commit activity](https://img.shields.io/github/commit-activity/y/InsightSoftwareConsortium/itk-wasm)

*itk-wasm* combines [ITK](https://www.itk.org/) and
[WebAssembly](https://webassembly.org/) to enable high-performance spatial
analysis in a web browser, Node.js, and reproducible execution across
programming languages and hardware architectures.

The project provides tools to a) build C/C++ code to
[WebAssembly](https://webassembly.org/), b) bridge local filesystems,
JavaScript/Typescript data structures, and traditional file formats, c)
transfer data efficiently in and out of the WebAssembly runtime, and d)
asynchronous, parallel execution of processing pipelines in a worker pool.
*itk-wasm* can be used to execute [ITK](https://www.itk.org/)
or arbitrary C++ codes in the browser, on a
workstation / server with [Node.js](https://nodejs.org/), or standalone
execution and wrapped in [WASI](https://wasi.dev/) runtimes.

For more information, please see [the project
documentation](https://wasm.itk.org/).
