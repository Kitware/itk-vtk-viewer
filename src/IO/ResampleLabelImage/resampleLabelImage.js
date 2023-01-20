import {
  runPipeline,
  InterfaceTypes,
  imageSharedBufferOrCopy,
  WorkerPool,
  stackImages,
} from 'itk-wasm'

import itkConfig from '../itkConfig.js'

async function runWasm(pipeline, args, image) {
  const { pipelinesUrl, pipelineWorkerUrl } = itkConfig

  // remove blob:http://... added to __webpack_public_path__ in webworker
  const pipelinesUrlNoBlob = pipelinesUrl.startsWith('blob:')
    ? pipelinesUrl.substring(5)
    : pipelinesUrl
  // prepend base to URL string for tests to run
  itkConfig.pipelinesUrl = new URL(
    pipelinesUrlNoBlob,
    self.location.origin
  ).href

  const pipelinesWorkerUrlNoBlob = pipelineWorkerUrl.startsWith('blob:')
    ? pipelineWorkerUrl.substring(5)
    : pipelineWorkerUrl
  itkConfig.pipelineWorkerUrl = new URL(
    pipelinesWorkerUrlNoBlob,
    self.location.origin
  ).href

  const desiredOutputs = [{ type: InterfaceTypes.Image }]

  const numberOfWorkers = navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency
    : 6
  const splits = Math.min(
    parseInt(numberOfWorkers / 2),
    Math.max(image.size[image.size.length - 1], 1),
    4 // avoid out of memory errors with larger images
  )

  const tasks = [...Array(splits).keys()].map(split => {
    const taskArgs = [
      '0',
      '0',
      ...args,
      '--max-total-splits',
      '' + splits,
      '--split',
      '' + split,
      '--number-of-splits',
      '' + splits,
      '--memory-io',
    ]

    const inputs = [
      {
        type: InterfaceTypes.Image,
        data: imageSharedBufferOrCopy(image),
      },
    ]
    return [pipeline, taskArgs, desiredOutputs, inputs]
  })

  const workerPool = new WorkerPool(numberOfWorkers, runPipeline)
  try {
    const results = await workerPool.runTasks(tasks).promise
    workerPool.terminateWorkers()
    const validResults = results.filter(r => r.returnValue === 0)
    const imageSplits = validResults.map(({ outputs }) => outputs[0].data)
    return stackImages(imageSplits)
  } catch (e) {
    console.log(e)
  }
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
