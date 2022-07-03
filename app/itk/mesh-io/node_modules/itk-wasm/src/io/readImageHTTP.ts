import axios from 'axios'

import bufferToTypedArray from '../core/bufferToTypedArray.js'
import Image from '../core/Image.js'
import FloatTypes from '../core/FloatTypes.js'
import type TypedArray from '../core/TypedArray.js'

async function readImageHTTP (url: string): Promise<Image> {
  const imageResponse = await axios.get(`${url}/index.json`, { responseType: 'json' })
  const image = imageResponse.data as Image
  const dataResponse = await axios.get(`${url}/data/data.raw`, { responseType: 'arraybuffer' })
  image.data = bufferToTypedArray(image.imageType.componentType, dataResponse.data as ArrayBuffer) as TypedArray
  const directionResponse = await axios.get(`${url}/data/direction.raw`, { responseType: 'arraybuffer' })
  image.direction = bufferToTypedArray(FloatTypes.Float64, directionResponse.data as ArrayBuffer) as TypedArray
  return image
}

export default readImageHTTP
