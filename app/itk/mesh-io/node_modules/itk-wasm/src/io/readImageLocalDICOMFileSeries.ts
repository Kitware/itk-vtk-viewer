import path from 'path'

import loadEmscriptenModule from '../core/internal/loadEmscriptenModuleNode.js'
import PipelineEmscriptenModule from '../pipeline/PipelineEmscriptenModule.js'
import findLocalImageIOPath from './internal/findLocalImageIOPath.js'

import Image from '../core/Image.js'
import InterfaceTypes from '../core/InterfaceTypes.js'
import runPipelineEmscripten from '../pipeline/internal/runPipelineEmscripten.js'
import PipelineInput from '../pipeline/PipelineInput.js'

/**
 * Read an image from a series of DICOM files on the local filesystem in Node.js.
 *
 * @param: filenames Array of filepaths containing a DICOM study / series on the local filesystem.
 * @param: singleSortedSeries: it is known that the files are from a single
 * sorted series.
 */
async function readImageLocalDICOMFileSeries (fileNames: string[], singleSortedSeries: boolean = false): Promise<Image> {
  if (fileNames.length < 1) {
    throw new Error('No fileNames provided')
  }
  const imageIOsPath = findLocalImageIOPath()
  const seriesReader = 'ReadImageDICOMFileSeries'
  const seriesReaderPath = path.join(imageIOsPath, seriesReader + '.js')
  const seriesReaderModule = await loadEmscriptenModule(seriesReaderPath) as PipelineEmscriptenModule
  const mountedFilePath = seriesReaderModule.mountContainingDir(fileNames[0])
  const mountedDir = path.dirname(mountedFilePath)

  const mountedFileNames = fileNames.map((fileName) => {
    return path.join(mountedDir, path.basename(fileName))
  })
  const args = ['--memory-io', '--output-image', '0', '--input-images']
  mountedFileNames.forEach((fn) => {
    args.push(fn)
  })
  if (singleSortedSeries) {
    args.push('--single-sorted-series')
  }
  const desiredOutputs = [
    { type: InterfaceTypes.Image }
  ]
  const inputs = [
  ] as PipelineInput[]
  const { outputs } = runPipelineEmscripten(seriesReaderModule, args, desiredOutputs, inputs)

  return outputs[0].data as Image
}

export default readImageLocalDICOMFileSeries
