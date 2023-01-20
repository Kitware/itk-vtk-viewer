/* eslint-disable no-undef */
const itkConfig = {
  pipelineWorkerUrl:
    __webpack_public_path__ + 'itk/web-workers/min-bundles/pipeline.worker.js',
  imageIOUrl: __webpack_public_path__ + 'itk/image-io',
  meshIOUrl: __webpack_public_path__ + 'itk/mesh-io',
  pipelinesUrl: __webpack_public_path__ + 'itk/pipeline',
}

export default itkConfig
