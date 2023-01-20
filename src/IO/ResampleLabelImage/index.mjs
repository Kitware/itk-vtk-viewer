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
  .description('Resample an image')
  .option('-l, --label-image', 'Label image as opposed to an intensity image')
  .arguments('<inputFile> <outputFile>')
  .parse(process.argv)

if (program.args.length < 2) {
  console.error('Please pass in both the input and output file paths.')
  process.exit(1)
}

const inputFile = program.args[0]
const outputFile = program.args[1]
const pipelinePath = path.resolve('./web-build/ResampleLabelImage')

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
  const size = [100, 100]
  const spacing = [2, 2]
  const origin = [1, 3]
  const direction = [0, 1, 1, 0]
  const args = [
    '0',
    '0',
    '--size',
    size.join(','),
    '--spacing',
    spacing.join(','),
    '--origin',
    origin.join(','),
    '--direction',
    direction.join(','),
    // '--max-total-splits',
    // '10',
    // '--split',
    // '5',
    '--memory-io',
  ]
  const { outputs } = await runPipelineNode(
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
