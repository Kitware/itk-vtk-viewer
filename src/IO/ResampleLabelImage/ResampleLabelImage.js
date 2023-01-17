import {
  runPipeline,
  InterfaceTypes,
  imageSharedBufferOrCopy,
  //   WorkerPool,
  //   stackImages,
} from 'itk-wasm'

import itkConfig from '../itkConfig.js'

async function runWasm(pipeline, args, image) {
  const taskArgs = ['0', '0', args.join(','), '--memory-io']
  const inputs = [
    {
      type: InterfaceTypes.Image,
      data: imageSharedBufferOrCopy(image),
    },
  ]

  const desiredOutputs = [{ type: InterfaceTypes.Image }]

  const { pipelinesUrl, pipelineWorkerUrl } = itkConfig

  // remove blob:http://... added to __webpack_public_path__ in webworker
  const pipelinesUrlNoBlob = pipelinesUrl.startsWith('blob:')
    ? pipelinesUrl.substring(5)
    : pipelinesUrl

  const pipelinesWorkerUrlNoBlob = pipelineWorkerUrl.startsWith('blob:')
    ? pipelineWorkerUrl.substring(5)
    : pipelineWorkerUrl

  const worker = new Worker(pipelinesWorkerUrlNoBlob)

  const { outputs } = await runPipeline(
    worker,
    pipeline,
    taskArgs,
    desiredOutputs,
    inputs,
    pipelinesUrlNoBlob
  )
  worker.terminate()

  return outputs[0].data
}

export async function resampleLabelImage(size, image) {
  return runWasm('Resample', size, image)
}
