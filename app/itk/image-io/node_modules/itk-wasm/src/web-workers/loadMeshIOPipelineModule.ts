import loadPipelineModule from './loadPipelineModule.js'
import IOInput from './IOInput.js'
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'
import mimeToIO from '../io/internal/MimeToMeshIO.js'
import extensionToIO from '../io/extensionToMeshIO.js'
import getFileExtension from '../io/getFileExtension.js'
import MeshIOIndex from '../io/internal/MeshIOIndex.js'
import runPipelineEmscripten from '../pipeline/internal/runPipelineEmscripten.js'

async function * availableIOModules (input: IOInput) {
  for (let idx = 0; idx < MeshIOIndex.length; idx++) {
    const trialIO = MeshIOIndex[idx] + 'ReadMesh'
    const ioModule = await loadPipelineModule(trialIO, input.config.meshIOUrl) as PipelineEmscriptenModule
    yield ioModule
  }
}

async function loadMeshIOPipelineModule(input: IOInput, postfix: string): Promise<PipelineEmscriptenModule> {
  if (input.mimeType && mimeToIO.has(input.mimeType)) {
    const io = mimeToIO.get(input.mimeType) + postfix
    const ioModule = await loadPipelineModule(io, input.config.meshIOUrl)
    return ioModule
  }

  const extension = getFileExtension(input.fileName)
  if (extensionToIO.has(extension)) {
    const io = extensionToIO.get(extension) + postfix
    const ioModule = await loadPipelineModule(io, input.config.meshIOUrl)
    return ioModule
  }

  for (let idx = 0; idx < MeshIOIndex.length; ++idx) {
    let idx = 0
    for await (const pipelineModule of availableIOModules(input)) {
      try {
        const { returnValue, outputs } = await runPipelineEmscripten(pipelineModule, input.args, input.outputs, input.inputs)
        if (returnValue === 0) {
          return pipelineModule
        }
      } catch (error) {
        // continue
      }
      idx++
    }
  }

  throw Error(`Could not find IO for: ${input.fileName}`)
}

export default loadMeshIOPipelineModule
