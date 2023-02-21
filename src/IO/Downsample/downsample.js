#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import path from 'path'

const program = new Command()

import {
  readLocalFile,
  writeLocalFile,
  runPipelineNode,
  InterfaceTypes,
} from 'itk-wasm'

program
  .description('Downsample an image')
  .option(
    '-l, --label-image',
    'Downsample as a label image as opposed to an intensity image'
  )
  .arguments('<inputFile> <outputFile>')
  .parse(process.argv)

if (program.args.length < 2) {
  console.error('Please pass in both the input and output file paths.')
  process.exit(1)
}

const inputFile = program.args[0]
const outputFile = program.args[1]
const pipelinePath = program.options.labelImage
  ? path.resolve('./emscripten-build/DownsampleLabelImage')
  : path.resolve('./emscripten-build/Downsample')
console.log(pipelinePath)

const factors = [2, 2, 2]

try {
  const inputImage = await readLocalFile(inputFile)

  const inputs = [
    {
      type: InterfaceTypes.Image,
      data: inputImage,
    },
  ]
  const desiredOutputs = [
    { type: InterfaceTypes.Image },
    // { type: InterfaceTypes.TextStream },
  ]
  const args = [
    '0',
    '0',
    factors.join(','),
    // '--max-total-splits', '' + maxTotalSplits,
    // '--split', '' + index,
    // '--number-of-splits', '1',
    '--memory-io',
  ]
  const { stdout, stderr, outputs } = await runPipelineNode(
    pipelinePath,
    args,
    desiredOutputs,
    inputs
  )

  const outputImage = outputs[0].data

  await writeLocalFile(outputImage, outputFile)
} catch (error) {
  console.error('Error during processing:\n')
  console.error(error)
}
