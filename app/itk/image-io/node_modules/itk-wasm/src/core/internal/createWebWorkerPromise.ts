import axios from 'axios'
import WebworkerPromise from 'webworker-promise'

import config from '../../itkConfig.js'

interface createWebWorkerPromiseResult {
  webworkerPromise: typeof WebworkerPromise
  worker: Worker
}

// Internal function to create a web worker promise
async function createWebWorkerPromise (existingWorker: Worker | null): Promise<createWebWorkerPromiseResult> {
  if (existingWorker != null) {
    const webworkerPromise = new WebworkerPromise(existingWorker)
    return await Promise.resolve({ webworkerPromise, worker: existingWorker })
  }

  let worker = null
  const webWorkersUrl = config.webWorkersUrl
  if (typeof webWorkersUrl !== 'undefined') {
    console.warn('itkConfig webWorkersUrl is deprecated. Please use pipelineWorkerUrl with the full path to the pipeline worker.')
    const min = 'min-'
    // debug
    // const min = ''

    const webWorkerString = webWorkersUrl as string
    if (webWorkerString.startsWith('http')) {
      const response = await axios.get(`${webWorkerString}/${min}bundles/pipeline.worker.js`, { responseType: 'blob' })
      worker = new Worker(URL.createObjectURL(response.data as Blob))
    } else {
      worker = new Worker(`${webWorkerString}/${min}bundles/pipeline.worker.js`)
    }
  } else if (config.pipelineWorkerUrl === null) {
    // Use the version built with the bundler
    //
    // Bundlers, e.g. WebPack, see these paths at build time
    //
    // importScripts / UMD is required over dynamic ESM import until Firefox
    // adds worker dynamic import support:
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1540913
    worker = new Worker(new URL('../../web-workers/pipeline.worker.js', import.meta.url))
  } else {
    const pipelineWorkerUrl = config.pipelineWorkerUrl
    if (pipelineWorkerUrl.startsWith('http')) {
      const response = await axios.get(pipelineWorkerUrl, { responseType: 'blob' })
      worker = new Worker(URL.createObjectURL(response.data as Blob))
    } else {
      worker = new Worker(pipelineWorkerUrl)
    }
  }

  const webworkerPromise = new WebworkerPromise(worker)
  return { webworkerPromise, worker }
}

export default createWebWorkerPromise
