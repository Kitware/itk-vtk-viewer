import path from 'path'

import loadEmscriptenModule from '../core/internal/loadEmscriptenModuleNode.js'
import runPipelineEmscripten from '../pipeline/internal/runPipelineEmscripten.js'
import findLocalImageIOPath from './internal/findLocalImageIOPath.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import PipelineInput from '../pipeline/PipelineInput.js'
import TextStream from '../core/TextStream.js'

import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'

/**
 * Reads DICOM tags from a series of DICOM files on the local filesystem in Node.js.
 * @param: filename DICOM object filepath on the local filesystem.
 * @param: tags Array of tags to extract.
 */
async function readDICOMTagsLocalFile (fileName: string, tags: string[] | null = null): Promise<Map<string, string>> {
  const imageIOsPath = findLocalImageIOPath()
  const tagReader = 'ReadDICOMTags'
  const tagReaderPath = path.join(imageIOsPath, tagReader + '.js')
  const tagReaderModule = await loadEmscriptenModule(tagReaderPath) as PipelineEmscriptenModule
  const mountedFilePath = tagReaderModule.mountContainingDir(fileName)
  const mountedDir = path.dirname(mountedFilePath)
  const mountedFileName = path.join(mountedDir, path.basename(fileName))

  const args = [mountedFileName, '0', '--memory-io']
  const inputs = [
  ] as PipelineInput[]
  if (tags != null) {
    args.push('--tags-to-read')
    args.push('0')
    inputs.push({ type: InterfaceTypes.TextStream, data: { data: JSON.stringify({ tags: tags }) } })
  }
  const desiredOutputs = [
    { type: InterfaceTypes.TextStream }
  ]
  const { outputs } = runPipelineEmscripten(tagReaderModule, args, desiredOutputs, inputs)

  tagReaderModule.unmountContainingDir(mountedFilePath)

  const tagsJSON = (outputs[0].data as TextStream).data
  const tagsResult = JSON.parse(tagsJSON)
  const tagsMap: Map<string, string> = new Map(tagsResult.tags)
  return tagsMap
}

export default readDICOMTagsLocalFile
