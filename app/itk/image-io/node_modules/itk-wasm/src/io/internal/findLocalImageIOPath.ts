import fs from 'fs'

import localPathRelativeToModule from './localPathRelativeToModule.js'

function findLocalImageIOPath (): string {
  const buildPath = localPathRelativeToModule(import.meta.url, '../../image-io')
  if (fs.existsSync(buildPath)) {
    return buildPath
  }
  const packagePath = localPathRelativeToModule(import.meta.url, '../../../../itk-image-io')
  if (fs.existsSync(packagePath)) {
    return packagePath
  }
  throw Error("Cannot find path to itk image IO's. Try: npm install --save itk-image-io")
}

export default findLocalImageIOPath
