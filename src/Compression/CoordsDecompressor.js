import axios from 'axios'

import bloscZarrDecompress from './bloscZarrDecompress'

class CoordsDecompressor {
  constructor(url, zmetadata, coordPaths) {
    this.url = url
    this.zmetadata = zmetadata
    this.coordPaths = coordPaths
  }

  async getCoords() {
    const compressedChunksPromises = []
    const zarrayMetadata = []
    for (let coordPath of this.coordPaths.values()) {
      const chunkUrl = `${this.url}/${coordPath}/0`
      zarrayMetadata.push(this.zmetadata[`${coordPath}/.zarray`])
      compressedChunksPromises.push(
        axios.get(chunkUrl, {
          responseType: 'arraybuffer',
        })
      )
    }
    const compressedChunksResponses = await Promise.all(
      compressedChunksPromises
    )
    const compressedChunks = compressedChunksResponses.map(
      response => response.data
    )
    const chunkData = []
    for (let index = 0; index < compressedChunks.length; index++) {
      chunkData.push({
        data: compressedChunks[index],
        metadata: zarrayMetadata[index],
      })
    }
    const decompressedChunks = await bloscZarrDecompress(chunkData)
    const coords = new Map()
    let index = 0
    for (let key of this.coordPaths.keys()) {
      coords.set(key, decompressedChunks[index])
      index++
    }
    return coords
  }
}

export default CoordsDecompressor
