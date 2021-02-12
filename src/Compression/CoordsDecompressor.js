import axios from 'axios'

import bloscZarrDecompress from './bloscZarrDecompress'

class CoordsDecompressor {
  constructor(store, coordPaths) {
    this.store = store
    this.coordPaths = coordPaths
  }

  async getCoord(coord) {
    const coordPath = this.coordPaths.get(coord)
    const arrayMetadata = await this.store.getItem(`${coordPath}/.zarray`)
    const compressedChunk = await this.store.getItem(`${coordPath}/0`)
    const chunkData = [
      {
        data: compressedChunk,
        metadata: arrayMetadata,
      },
    ]
    const decompressedChunks = await bloscZarrDecompress(chunkData)
    return decompressedChunks[0]
  }
}

export default CoordsDecompressor
