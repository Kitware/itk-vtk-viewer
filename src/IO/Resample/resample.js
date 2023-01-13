import {
  //   WorkerPool,
  runPipeline,
  InterfaceTypes,
  imageSharedBufferOrCopy,
  //   stackImages,
} from 'itk-wasm'

import itkConfig from '../itkConfig.js'

async function runWasm(pipeline, args, image) {
  // remove blob:http://... added to __webpack_public_path__ in webworker
  const pipelinesUrlWithoutBlob = itkConfig.pipelinesUrl.startsWith('blob:')
    ? itkConfig.pipelinesUrl.substring(5)
    : itkConfig.pipelinesUrl
  // If itkConfig is not full URL, prepend origin
  const origin = pipelinesUrlWithoutBlob.startsWith('http')
    ? ''
    : self.location.origin
  const pipelinePath = `${origin}${pipelinesUrlWithoutBlob}/${pipeline}.wasm`

  // const numberOfWorkers = navigator.hardwareConcurrency
  //   ? navigator.hardwareConcurrency
  //   : 6
  //   const splits = Math.min(
  //     parseInt(numberOfWorkers / 2),
  //     Math.max(image.size[image.size.length - 1], 1)
  //   )

  //   const tasks = [...Array(splits).keys()].map(split => {
  //     const taskArgs = [
  //       '0',
  //       '0',
  //       args.join(','),
  //       '--max-total-splits',
  //       '' + splits,
  //       '--split',
  //       '' + split,
  //       '--memory-io',
  //     ]

  //     const inputs = [
  //       {
  //         type: InterfaceTypes.Image,
  //         data: imageSharedBufferOrCopy(image),
  //       },
  //     ]

  //     const desiredOutputs = [{ type: InterfaceTypes.Image }]

  //     return [pipelinePath, taskArgs, desiredOutputs, inputs]
  //   })

  //   const workerPool = new WorkerPool(numberOfWorkers, runPipeline)
  //   const results = await workerPool.runTasks(tasks).promise
  //   console.log(results)
  //   workerPool.terminateWorkers()
  //   const validResults = results.filter(r => r.returnValue === 0)
  //   const imageSplits = validResults.map(({ outputs }) => outputs[0].data)
  //   return stackImages(imageSplits)

  const taskArgs = ['0', '0', args.join(','), '--memory-io']
  const inputs = [
    {
      type: InterfaceTypes.Image,
      data: imageSharedBufferOrCopy(image),
    },
  ]

  const desiredOutputs = [{ type: InterfaceTypes.Image }]

  const { outputs } = await runPipeline(
    false,
    pipelinePath,
    taskArgs,
    desiredOutputs,
    inputs
  )

  return outputs[0].data
}

export async function resample(size, image) {
  return runWasm('Resample', size, image)
}
