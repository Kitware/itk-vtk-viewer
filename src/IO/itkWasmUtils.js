import {
  runPipeline,
  InterfaceTypes,
  imageSharedBufferOrCopy,
  WorkerPool,
  stackImages,
} from 'itk-wasm'

import itkConfig from '../itkConfig.js'

export async function runWasm({
  pipeline,
  args,
  images,
  outputs = [{ type: InterfaceTypes.Image }],
  maxSplits = 4, // avoid out of memory errors with larger images
}) {
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

  const numberOfWorkers = navigator.hardwareConcurrency || 6

  const aImage = images[0]
  const splits = Math.min(
    parseInt(numberOfWorkers / 2),
    Math.max(aImage.size[aImage.size.length - 1], 1),
    maxSplits
  )

  const tasks = [...Array(splits).keys()].map(split => {
    const taskArgs = [
      ...[...Array(images.length).keys()].map(num => num.toString()),
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

    const inputs = images.map(image => ({
      type: InterfaceTypes.Image,
      data: imageSharedBufferOrCopy(image),
    }))

    return [pipeline, taskArgs, outputs, inputs]
  })

  const workerPool = new WorkerPool(numberOfWorkers, runPipeline)
  const results = await workerPool.runTasks(tasks).promise
  workerPool.terminateWorkers()
  const validResults = results.filter(r => r.returnValue === 0)
  const imageSplits = validResults.map(({ outputs }) => outputs[0].data)

  return stackImages(imageSplits)
}
