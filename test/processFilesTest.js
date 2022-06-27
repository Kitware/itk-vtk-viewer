import test from 'tape-catch'
import axios from 'axios'

import { FloatTypes, PixelTypes } from 'itk-wasm'

const testVtiPath = 'base/test/data/input/test.vti'

import { readFiles } from '../src/IO/processFiles'

const verifyImage = (t, image) => {
  t.is(image.imageType.dimension, 3, 'dimension')
  t.is(image.imageType.componentType, FloatTypes.Float32, 'componentType')
  t.is(image.imageType.pixelType, PixelTypes.Scalar, 'pixelType')
  t.is(image.imageType.components, 1, 'components')
  t.is(image.origin[0], 0.0, 'origin[0]')
  t.is(image.origin[1], 0.0, 'origin[1]')
  t.is(image.origin[2], 0.0, 'origin[2]')
  t.is(image.spacing[0], 1.0, 'spacing[0]')
  t.is(image.spacing[1], 1.0, 'spacing[1]')
  t.is(image.spacing[2], 1.0, 'spacing[2]')
  t.is(image.size[0], 10, 'size[0]')
  t.is(image.size[1], 10, 'size[1]')
  t.is(image.size[2], 10, 'size[2]')
  t.is(image.data.length, 1000, 'data.length')
  t.is(image.data[512], 0.9276729822158813, 'data[512]')
  t.end()
}

test('Test reading a vti image file', async t => {
  const response = await axios.get(testVtiPath, {
    responseType: 'blob',
  })
  const vtiFile = new File([response.data], 'test.vti')
  const result = await readFiles({ files: [vtiFile] })
  verifyImage(t, result.image)
})
