import path from 'path'
import mime from 'mime-types'

import mimeToIO from './internal/MimeToMeshIO.js'
import getFileExtension from './getFileExtension.js'
import extensionToIO from './extensionToMeshIO.js'
import MeshIOIndex from './internal/MeshIOIndex.js'

import Mesh from '../core/Mesh.js'

import loadEmscriptenModule from './../core/internal/loadEmscriptenModuleNode.js'
import runPipelineEmscripten from '../pipeline/internal/runPipelineEmscripten.js'
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'
import findLocalMeshIOPath from './internal/findLocalMeshIOPath.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PipelineInput from '../pipeline/PipelineInput.js'

/**
 * Read a mesh from a file on the local filesystem in Node.js.
 *
 * @param: filePath path to the file on the local filesystem.
 */
async function readMeshLocalFile (filePath: string): Promise<Mesh> {
  const meshIOsPath = findLocalMeshIOPath()
  const absoluteFilePath = path.resolve(filePath)
  const mimeType = mime.lookup(absoluteFilePath)
  const extension = getFileExtension(absoluteFilePath)

  const args = [absoluteFilePath, '0', '--memory-io', '--quiet']
  const desiredOutputs = [
    { type: InterfaceTypes.Mesh }
  ]
  const inputs = [] as PipelineInput[]

  let io = null
  if (mimeToIO.has(mimeType)) {
    io = mimeToIO.get(mimeType)
  } else if (extensionToIO.has(extension)) {
    io = extensionToIO.get(extension)
  } else {
    for (let idx = 0; idx < MeshIOIndex.length; ++idx) {
      const modulePath = path.join(meshIOsPath, MeshIOIndex[idx] + 'ReadMesh.js')
      const readMeshModule = await loadEmscriptenModule(modulePath) as PipelineEmscriptenModule
      const mountedFilePath = readMeshModule.mountContainingDir(absoluteFilePath)
      const { returnValue, outputs } = runPipelineEmscripten(readMeshModule, args, desiredOutputs, inputs)
      readMeshModule.unmountContainingDir(mountedFilePath)
      if (returnValue === 0) {
        return outputs[0].data as Mesh
      }
    }
  }
  if (io === null) {
    throw Error('Could not find IO for: ' + absoluteFilePath)
  }

  const modulePath = path.join(meshIOsPath, io as string + 'ReadMesh.js')
  const readMeshModule = await loadEmscriptenModule(modulePath) as PipelineEmscriptenModule
  const mountedFilePath = readMeshModule.mountContainingDir(absoluteFilePath)
  const { outputs } = runPipelineEmscripten(readMeshModule, args, desiredOutputs, inputs)
  readMeshModule.unmountContainingDir(mountedFilePath)
  return outputs[0].data as Mesh
}

export default readMeshLocalFile
