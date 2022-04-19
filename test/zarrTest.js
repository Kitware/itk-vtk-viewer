import { IntTypes, PixelTypes } from 'itk-wasm'
import test from 'tape-catch'

const testZarr = 'base/test/data/input/64x64-fake-v0.4.zarr/0'

import ZarrStore from '../src/IO/ZarrStore'
import toMultiscaleChunkedImage from '../src/IO/toMultiscaleChunkedImage'
import ZarrMultiscaleChunkedImage, {
  isZarr,
} from '../src/IO/ZarrMultiscaleChunkedImage'

const verifyImage = (t, image) => {
  const imageTypeBaseline = {
    dimension: 2,
    pixelType: PixelTypes.Scalar,
    componentType: IntTypes.UInt8,
    components: 1,
  }
  t.deepEqual(image.imageType, imageTypeBaseline, 'image type set')
  t.equal(image.name, 'testimage', 'image name set')
  t.deepEqual(image.origin, [0, 0], 'image origin set')
  t.deepEqual(image.spacing, [1, 1], 'image spacing set')
  t.deepEqual(image.size, [64, 64], 'image size set')
  t.equal(image.data.length, 4096, 'image data length set')
}

test('Test isZarr', t => {
  t.true(isZarr('foo.zarr'), 'no suffix')
  t.true(isZarr('foo.zarr/0'), '/0 suffix')
  t.true(isZarr('foo.zarr/asdf'), '/asdf suffix')

  t.false(isZarr('foo.asdf'), 'not when .asdf extension')
  t.false(
    isZarr('foo.zarr.asdf/asdf'),
    'not when .asdf extension and has suffix'
  )

  t.true(isZarr('foo.zarr.asdf'), '.asdf suffix')
  t.false(isZarr('foo.zarr.asdf.baz'), '.baz suffix')
  t.false(isZarr('foo.zarrX.png'), '.zarrX extension, not .zarr')

  // not working, could be trouble
  // t.false(isZarr('foo.zarr.png'), 'known other file type extension')

  t.end()
})

test('Test MetadataStore', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const store = new ZarrStore(storeURL)

  const topZattrsBaseline = {
    multiscales: [
      {
        axes: [
          {
            name: 'y',
            type: 'space',
            units: 'micrometer',
          },
          {
            name: 'x',
            type: 'space',
            units: 'micrometer',
          },
        ],
        datasets: [
          {
            path: '0',
            coordinateTransformations: [
              {
                scale: [1, 1],
                type: 'scale',
              },
            ],
          },
        ],
        name: 'testimage',
        version: '0.4',
      },
    ],
  }

  const topZattrs = await store.getItem('.zattrs')
  t.deepEqual(topZattrs, topZattrsBaseline, 'getItem top .zattrs')

  const arrayBaseline = {
    chunks: [64, 64],
    compressor: {
      clevel: 5,
      blocksize: 0,
      shuffle: 1,
      cname: 'lz4',
      id: 'blosc',
    },
    dtype: '>u1',
    fill_value: 0,
    filters: null,
    order: 'C',
    shape: [64, 64],
    zarr_format: 2,
    dimension_separator: '/',
  }

  const firstArrayPath = topZattrs.multiscales[0].datasets[0].path
  const arrayMetadataPath = `${firstArrayPath}/.zarray`
  const arrayMetadata = await store.getItem(arrayMetadataPath)

  t.deepEqual(arrayMetadata, arrayBaseline, 'getItem .zarray')

  const { dimension_separator: separator } = arrayMetadata
  const firstChunkPath = `${firstArrayPath}${separator}0${separator}0`
  const firstChunk = await store.getItem(firstChunkPath)

  t.equal(firstChunk.byteLength, 128, 'getItem of chunk data has bytes')

  t.end()
})

test('Test ZarrMultiscaleChunkedImage', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const zarrImage = await ZarrMultiscaleChunkedImage.fromUrl(storeURL)

  t.equal(zarrImage.scaleInfo.length, 1, 'number of scales')

  const viewerImage = await zarrImage.scaleLargestImage(0)

  verifyImage(t, viewerImage)

  t.end()
})

test('Test toMultiscaleChunkedImage from store', async t => {
  const storeURL = new URL(testZarr, document.location.origin)
  const zarrImage = await toMultiscaleChunkedImage(new ZarrStore(storeURL))
  const viewerImage = await zarrImage.scaleLargestImage(0)

  verifyImage(t, viewerImage)

  t.end()
})
