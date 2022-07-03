import registerWebworker from 'webworker-promise/lib/register.js'

import loadPipelineModule from './loadPipelineModule.js'
import loadImageIOPipelineModule from './loadImageIOPipelineModule.js'
import loadMeshIOPipelineModule from './loadMeshIOPipelineModule.js'
import runPipeline from './runPipeline.js'
import RunPipelineInput from './RunPipelineInput.js'
import IOInput from './IOInput.js'

registerWebworker(async function (input: RunPipelineInput | IOInput) {
  let pipelineModule = null
  if (input.operation === 'runPipeline') {
    pipelineModule = await loadPipelineModule(input.pipelinePath, input.config.pipelinesUrl)
  } else if (input.operation === 'readImage') {
    pipelineModule = await loadImageIOPipelineModule(input as IOInput, 'ReadImage')
  } else if (input.operation === 'writeImage') {
    pipelineModule = await loadImageIOPipelineModule(input as IOInput, 'WriteImage')
  } else if (input.operation === 'readMesh') {
    pipelineModule = await loadMeshIOPipelineModule(input as IOInput, 'ReadMesh')
  } else if (input.operation === 'writeMesh') {
    pipelineModule = await loadMeshIOPipelineModule(input as IOInput, 'WriteMesh')
  } else if (input.operation === 'meshToPolyData') {
    pipelineModule = await loadPipelineModule('MeshToPolyData', input.config.meshIOUrl)
  } else if (input.operation === 'polyDataToMesh') {
    pipelineModule = await loadPipelineModule('PolyDataToMesh', input.config.meshIOUrl)
  } else if (input.operation === 'readDICOMImageSeries') {
    pipelineModule = await loadPipelineModule('ReadImageDICOMFileSeries', input.config.imageIOUrl)
  } else if (input.operation === 'readDICOMTags') {
    pipelineModule = await loadPipelineModule('ReadDICOMTags', input.config.imageIOUrl)
  } else {
    throw new Error('Unknown worker operation')
  }
  return runPipeline(pipelineModule, input.args, input.outputs, input.inputs)
})
