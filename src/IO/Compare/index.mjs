#!/usr/bin/env node
/* eslint-env node */

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
  .description('Create checkerboard from 2 images')
  .arguments('<inputFile1> <inputFile2> <outputFile> <boxes>')
  .parse(process.argv)

if (program.args.length < 3) {
  console.error('Please pass in 2 input file paths and output file path.')
  process.exit(1)
}

const pipelinePath = path.resolve('./emscripten-build/Compare')
const inputFile1 = program.args[0]
const inputFile2 = program.args[1]
const outputFile = program.args[2]
const boxes = program.args[3]

try {
  const inputImage1 = await readLocalFile(inputFile1)
  const inputImage2 = await readLocalFile(inputFile2)

  const inputs = [
    {
      type: InterfaceTypes.Image,
      data: inputImage1,
    },
    {
      type: InterfaceTypes.Image,
      data: inputImage2,
    },
  ]
  const desiredOutputs = [{ type: InterfaceTypes.Image }]

  const args = [
    '0',
    '1',
    '0',
    '--boxes',
    boxes,
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
