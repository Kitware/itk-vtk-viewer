import axios from 'axios'

import bloscZarrDecompress from './bloscZarrDecompress'

class CoordDecompressor {
  constructor(url, zmetadata, coordPath) {
    this.chunkUrl = `${url}/${coordPath}/0`
    this.zarrayMetadata = zmetadata[`${coordPath}/.zarray`]
  }

  async getCoord() {
    const response = await axios.get(this.chunkUrl, {
      responseType: 'arraybuffer',
    })
    const compressedChunk = response.data
    const chunks = await bloscZarrDecompress(
      [compressedChunk],
      this.zarrayMetadata
    )
    return chunks[0]
  }
}

export default CoordDecompressor
