const itkConfig = {
  pipelineWorkerUrl:
    __webpack_public_path__ + 'itk/web-workers/min-bundles/pipeline.worker.js', // eslint-disable-line no-undef
  imageIOUrl: __webpack_public_path__ + 'itk/image-io', // eslint-disable-line no-undef
  meshIOUrl: __webpack_public_path__ + 'itk/mesh-io', // eslint-disable-line no-undef
  pipelinesUrl: __webpack_public_path__ + 'itk/pipeline', // eslint-disable-line no-undef
}

export default itkConfig
