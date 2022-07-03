import axios from 'axios'

import ITKWASMEmscriptenModule from '../ITKWASMEmscriptenModule.js'

// Load the Emscripten module in the browser in a WebWorker.
//
// baseUrl is usually taken from '../itkConfig.js', but a different value
// could be passed.
async function loadEmscriptenModuleWebWorker(moduleRelativePathOrURL: string | URL, baseUrl: string): Promise<ITKWASMEmscriptenModule> {
  let modulePrefix = null
  if (typeof moduleRelativePathOrURL !== 'string') {
    modulePrefix = moduleRelativePathOrURL.href
  } else if (moduleRelativePathOrURL.startsWith('http')) {
    modulePrefix = moduleRelativePathOrURL
  } else {
    modulePrefix = `${baseUrl}/${moduleRelativePathOrURL}`
  }
  if (modulePrefix.endsWith('.js')) {
    modulePrefix = modulePrefix.substring(0, modulePrefix.length - 3)
  }
  if (modulePrefix.endsWith('.wasm')) {
    modulePrefix = modulePrefix.substring(0, modulePrefix.length - 5)
  }
  // importScripts / UMD is required over dynamic ESM import until Firefox
  // adds worker dynamic import support:
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1540913
  const wasmBinaryPath = `${modulePrefix}.wasm`
  const response = await axios.get(wasmBinaryPath, { responseType: 'arraybuffer' })
  const wasmBinary = response.data
  const modulePath = `${modulePrefix}.umd.js`
  importScripts(modulePath)
  const moduleBaseName: string = modulePrefix.replace(/.*\//, '')
  // @ts-ignore: error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'WorkerGlobalScope & typeof globalThis'.
  const wrapperModule = self[moduleBaseName] as (moduleParams: object) => object
  const emscriptenModule = wrapperModule({ wasmBinary }) as ITKWASMEmscriptenModule
  return emscriptenModule
}

export default loadEmscriptenModuleWebWorker
