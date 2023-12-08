import {
  runPipeline,
  InterfaceTypes,
  imageSharedBufferOrCopy,
  WorkerPool,
  stackImages,
} from 'itk-wasm'
import itkConfig from '../itkConfig'

export async function runWasm({
  pipeline,
  args,
  images,
  outputs = [{ type: InterfaceTypes.Image }],
  maxSplits = 4, // avoid out of memory errors with larger images
}) {
  const numberOfWorkers = navigator.hardwareConcurrency || 6

  const aImage = images[0]
  const splits = Math.min(
    parseInt(numberOfWorkers / 2),
    Math.max(aImage.size[aImage.size.length - 1], 1),
    maxSplits
  )

  const options = {
    pipelineWorkerUrl: itkConfig.pipelineWorkerUrl,
    pipelineBaseUrl: itkConfig.pipelinesUrl,
  }
  const tasks = [...Array(splits).keys()].map(split => {
    const taskArgs = [
      ...[...Array(images.length).keys()].map(num => num.toString()),
      '0',
      ...args.map(o => o.toString()),
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

    return [pipeline, taskArgs, outputs, inputs, options]
  })

  const workerPool = new WorkerPool(numberOfWorkers, runPipeline)
  const results = await workerPool.runTasks(tasks).promise
  workerPool.terminateWorkers()
  const validResults = results.filter(r => r.returnValue === 0)
  const imageSplits = validResults.map(({ outputs }) => outputs[0].data)

  return stackImages(imageSplits)
}
