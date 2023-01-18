import { runPipeline, InterfaceTypes, imageSharedBufferOrCopy } from 'itk-wasm'

import itkConfig from '../itkConfig.js'

async function runWasm(pipeline, args, image) {
  const taskArgs = ['0', '0', ...args, '--memory-io']
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

  const worker = new Worker(
    new URL(pipelinesWorkerUrlNoBlob, self.location.origin) // URL is invalid for tests unless base provided to URL
  )

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

export async function resampleLabelImage(image, labelImage) {
  const { size, spacing, origin, direction } = image
  const args = [
    '--size',
    size.join(','),
    '--spacing',
    spacing.join(','),
    '--origin',
    origin.join(','),
    '--direction',
    direction.join(','),
  ]

  return runWasm('ResampleLabelImage', args, labelImage)
}
