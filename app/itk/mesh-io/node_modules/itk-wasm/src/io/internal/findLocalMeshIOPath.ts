import fs from 'fs'

import localPathRelativeToModule from './localPathRelativeToModule.js'

function findLocalMeshIOPath (): string {
  const buildPath = localPathRelativeToModule(import.meta.url, '../../mesh-io')
  if (fs.existsSync(buildPath)) {
    return buildPath
  }
  const packagePath = localPathRelativeToModule(import.meta.url, '../../../../itk-mesh-io')
  if (fs.existsSync(packagePath)) {
    return packagePath
  }
  throw Error("Cannot find path to itk mesh IO's. Try: npm install --save itk-mesh-io")
}

export default findLocalMeshIOPath
