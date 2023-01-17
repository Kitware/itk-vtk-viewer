/* eslint-disable no-undef */
const itkConfig = {
  pipelineWorkerUrl:
    __webpack_public_path__ +
    'itk-wasm@' +
    __itk_version__ +
    '/dist/web-workers/min-bundles/pipeline.worker.js',
  imageIOUrl: __webpack_public_path__ + 'itk-image-io@' + __itk_version__,
  meshIOUrl: __webpack_public_path__ + 'itk-mesh-io@' + __itk_version__,
  pipelinesUrl:
    __webpack_public_path__ +
    'itk-vtk-viewer@' +
    __itk_vtk_viewer_version__ +
    '/dist/itk/pipeline',
}

export default itkConfig
