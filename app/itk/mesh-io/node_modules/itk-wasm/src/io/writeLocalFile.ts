import path from 'path'

import getFileExtension from './getFileExtension.js'
import extensionToMeshIO from './extensionToMeshIO.js'

import writeImageLocalFile from './writeImageLocalFile.js'
import writeMeshLocalFile from './writeMeshLocalFile.js'

import Mesh from '../core/Mesh.js'
import Image from '../core/Image.js'

/**
 * Write an image or mesh to a file on the local filesystem in Node.js.
 *
 * @param: imageOrMesh itk.Image or itk.Mesh instance to write
 * @param: filePath path to the file on the local filesystem.
 * @param: useCompression compression the pixel data when possible
 *
 * @return empty Promise
 */
async function writeLocalFile (imageOrMesh: Image | Mesh, filePath: string, useCompression: boolean = false): Promise<null> {
  const absoluteFilePath = path.resolve(filePath)
  const extension = getFileExtension(absoluteFilePath)

  const isMesh = extensionToMeshIO.has(extension)
  if (isMesh) {
    try {
      await writeMeshLocalFile(imageOrMesh as Mesh, filePath, { useCompression })
      return null
    } catch (err) {
      // Was a .vtk image file? Continue to write as an image.
      await writeImageLocalFile(imageOrMesh as Image, filePath, useCompression)
      return null
    }
  } else {
    await writeImageLocalFile(imageOrMesh as Image, filePath, useCompression)
    return null
  }
}

export default writeLocalFile
