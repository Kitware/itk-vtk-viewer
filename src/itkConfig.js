/* eslint-disable no-undef */
const itkConfig = {
  pipelineWorkerUrl:
    __webpack_public_path__ + 'itk/web-workers/itk-wasm-pipeline.min.worker.js',
  imageIOUrl: __webpack_public_path__ + 'itk/pipeline',
  meshIOUrl: __webpack_public_path__ + 'itk/mesh-io',
  pipelinesUrl: __webpack_public_path__ + 'itk/pipeline',
}

export default itkConfig
