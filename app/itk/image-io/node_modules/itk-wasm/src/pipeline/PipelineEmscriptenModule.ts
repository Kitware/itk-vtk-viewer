/// <reference types="emscripten" />
// import { cwrap, ccall } from '@types/emscripten'
import EmscriptenModule from '../core/ITKWASMEmscriptenModule.js'

interface PipelineEmscriptenModule extends EmscriptenModule {
  callMain: (args: string[]) => number
  // var c_javascript_add = Module.cwrap('c_add', // name of C function
  // 'number', // return type
  // ['number', 'number']); // argument types
  cwrap: typeof cwrap
  ccall: typeof ccall
  writeArrayToMemory: typeof writeArrayToMemory
  writeAsciiToMemory: typeof writeAsciiToMemory
  AsciiToString: (ptr: number) => string

  resetModuleStdout: () => void
  resetModuleStderr: () => void
  getModuleStdout: () => string
  getModuleStderr: () => string
  print: (text: string) => void
  printErr: (text: string) => void

  // Note: Only available if the module was built with CMAKE_BUILD_TYPE set to
  // Debug. For example:
  //  itk-wasm-cli build my/project -- -DCMAKE_BUILD_TYPE:STRING=Debug
  getExceptionMessage: (num: number) => string

}

export default PipelineEmscriptenModule
