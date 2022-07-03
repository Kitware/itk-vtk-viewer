import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

function localPathRelativeToModule (moduleUrl: string, relativePath: string): string {
  const modulePath = fileURLToPath(moduleUrl)
  return resolve(dirname(modulePath), relativePath)
}

export default localPathRelativeToModule
