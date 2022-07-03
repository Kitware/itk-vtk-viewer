import loadEmscriptenModule from '../core/internal/loadEmscriptenModuleWebWorker.js'
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'

// To cache loaded pipeline modules
const pipelineToModule: Map<string,PipelineEmscriptenModule> = new Map()

async function loadPipelineModule (pipelinePath: string | object, baseUrl: string): Promise<PipelineEmscriptenModule> {
  let moduleRelativePathOrURL: string | URL = pipelinePath as string
  let pipeline = pipelinePath as string
  let pipelineModule = null
  if (typeof pipelinePath !== 'string') {
    moduleRelativePathOrURL = new URL((pipelinePath as URL).href)
    pipeline = moduleRelativePathOrURL.href
  }
  if (pipelineToModule.has(pipeline)) {
    pipelineModule = pipelineToModule.get(pipeline) as PipelineEmscriptenModule
  } else {
    pipelineToModule.set(pipeline, await loadEmscriptenModule(moduleRelativePathOrURL, baseUrl) as PipelineEmscriptenModule)
    pipelineModule = pipelineToModule.get(pipeline) as PipelineEmscriptenModule
  }
  return pipelineModule
}

export default loadPipelineModule