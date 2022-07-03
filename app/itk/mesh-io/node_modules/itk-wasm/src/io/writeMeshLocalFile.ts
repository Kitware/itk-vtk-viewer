import path from 'path'
import mime from 'mime-types'

import mimeToIO from './internal/MimeToMeshIO.js'
import getFileExtension from './getFileExtension.js'
import extensionToIO from './extensionToMeshIO.js'
import MeshIOIndex from './internal/MeshIOIndex.js'

import loadEmscriptenModule from '../core/internal/loadEmscriptenModuleNode.js'
import runPipelineEmscripten from '../pipeline/internal/runPipelineEmscripten.js'
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'
import findLocalMeshIOPath from './internal/findLocalMeshIOPath.js'
import WriteMeshOptions from './WriteMeshOptions.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PipelineInput from '../pipeline/PipelineInput.js'
import PipelineOutput from '../pipeline/PipelineOutput.js'
import Mesh from '../core/Mesh.js'

/**
 * Write a mesh to a file on the local filesystem in Node.js.
 *
 * @param: mesh itk.Mesh instance to write
 * @param: filePath path to the file on the local filesystem.
 * @param: options.useCompression compression the pixel data when possible
 * @param: options.binaryFileType write in an binary as opposed to a ascii format, if
 * possible
 *
 * @return empty Promise
 */
async function writeMeshLocalFile (mesh: Mesh, filePath: string, options: WriteMeshOptions): Promise<null> {
  if ('useCompression' in (mesh as any) || 'binaryFileType' in (mesh as any)) {
    throw new Error('options are now in the last argument position in itk-wasm')
  }

  const meshIOsPath = findLocalMeshIOPath()
  const absoluteFilePath = path.resolve(filePath)
  const mimeType = mime.lookup(absoluteFilePath)
  const extension = getFileExtension(absoluteFilePath)

  const args = ['0', absoluteFilePath, '--memory-io', '--quiet']
  if (options?.useCompression === true) {
    args.push('--use-compression')
  }
  if (options?.binaryFileType === true) {
    args.push('--binary-file-type')
  }
  const desiredOutputs = [
  ] as PipelineOutput[]
  const inputs = [
    { type: InterfaceTypes.Mesh, data: mesh }
  ] as PipelineInput[]

  let io = null
  if (mimeType !== false && mimeToIO.has(mimeType)) {
    io = mimeToIO.get(mimeType)
  } else if (extensionToIO.has(extension)) {
    io = extensionToIO.get(extension)
  } else {
    for (let idx = 0; idx < MeshIOIndex.length; ++idx) {
      const modulePath = path.join(meshIOsPath, MeshIOIndex[idx] + 'WriteMesh.js')
      const writeMeshModule = await loadEmscriptenModule(modulePath) as PipelineEmscriptenModule
      const mountedFilePath = writeMeshModule.mountContainingDir(absoluteFilePath)
      const { returnValue } = runPipelineEmscripten(writeMeshModule, args, desiredOutputs, inputs)
      writeMeshModule.unmountContainingDir(mountedFilePath)
      if (returnValue === 0) {
        return null
      }
    }
  }
  if (io === null) {
    throw Error('Could not find IO for: ' + absoluteFilePath)
  }

  const modulePath = path.join(meshIOsPath, io as string + 'WriteMesh.js')
  const writeMeshModule = await loadEmscriptenModule(modulePath) as PipelineEmscriptenModule
  const mountedFilePath = writeMeshModule.mountContainingDir(absoluteFilePath)
  runPipelineEmscripten(writeMeshModule, args, desiredOutputs, inputs)
  writeMeshModule.unmountContainingDir(mountedFilePath)
  return null
}

export default writeMeshLocalFile
