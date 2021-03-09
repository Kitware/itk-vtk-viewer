import axios from 'axios'

import bloscZarrDecompress from './bloscZarrDecompress'

class CoordsDecompressor {
  constructor(store, coordPaths) {
    this.store = store
    this.coordPaths = coordPaths
    this.decoder = new TextDecoder()
  }

  async getCoord(coord) {
    const coordPath = this.coordPaths.get(coord)
    const arrayMetadataBytes = await this.store.getItem(`${coordPath}/.zarray`)
    const arrayMetadata = JSON.parse(this.decoder.decode(arrayMetadataBytes))
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
