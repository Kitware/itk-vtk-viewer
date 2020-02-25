import axios from 'axios'

import PyramidManager from './PyramidManager';
import bloscZarrDecompress from './bloscZarrDecompress';

async function decompressCoordPromise(url, zmetadata, coord) {
  const chunkUrl = `${url}/${coord}/0`;
  const response = await axios.get(chunkUrl, {responseType: 'arraybuffer'});
  const compressedChunk = response.data;
  const zarrayMetadata = zmetadata[`${coord}/.zarray`];
  const chunk = bloscZarrDecompress(compressedChunk, zarrayMetadata);
  return chunk;
}

class ZarrPyramidManager extends PyramidManager {
  url;

  // Call parseMetadata to retrieve metadata
  constructor(url, metadata) {
    super(metadata);
    this.url = url;
    // utilitiy
    this.CXYZT = ['c', 'x', 'y', 'z', 't'];
  }

  // Constructor cannot be async
  static async parseMetadata(url) {
    const metadataUrl = url + '/.zmetadata';
    const response = await axios.get(metadataUrl, {responseType: 'json'});
    const zmetadata = response.data.metadata;
    let metadata = {
      dims: [],
      coords: new Map(),
      numberOfCXYZTChunks: [1, 1, 1, 1, 1],
      sizeCXYZTChunks: [1, 1, 1, 1, 1],
      sizeCXYZTElements: [1, 1, 1, 1, 1]
    };
    for(let obj in zmetadata) {
      // Assume the pixel buffer array will have the most dimensions
      const arrayDims = zmetadata[obj]._ARRAY_DIMENSIONS || [];
      if (arrayDims.length > metadata.dims.length) {
        metadata.dims = arrayDims;
        if (!!zmetadata[obj].direction) {
          metadata.direction = zmetadata[obj].direction;
        }
        const pixelArrayName = obj.replace(".zattrs", ".zarray");
        metadata.pixelArrayMetadata = zmetadata[pixelArrayName];
        metadata.pixelArrayName = pixelArrayName.replace("/.zarray", "");
        metadata.pixelArrayUrl = `${url}/${metadata.pixelArrayName}/`;
      }

      // Todo: parallelize in web workers
      if (obj.match(/[xyzct]\/.zarray/) !== null) {
        const coord = obj[0];
        metadata.coords.set(coord, null);
      }
    }
    const decompressCoordsPromises = new Array(metadata.coords.size);
    let index = 0;
    metadata.coords.forEach((value, key) => {
      decompressCoordsPromises[index] = decompressCoordPromise(url, zmetadata, key);
      index++;
    })
    const coordChunks = await Promise.all(decompressCoordsPromises);
    index = 0;
    metadata.coords.forEach((value, key) => {
      metadata.coords.set(key, coordChunks[index]);
      index++;
    })
    if (metadata.dims.length === 0) {
      const dimension = metadata.pixelArrayMetadata.shape.length;
      metadata.dims = ['z', 'y', 'x'].slice(3-dimension);
    }
    return [metadata];
  }

  async getChunkImpl(level, cxyzt) {
    const meta = this.metadata[level];
    let chunkUrl = meta.pixelArrayUrl;

    meta.dims.forEach((dim) => {
      chunkUrl = `${chunkUrl}${cxyzt[this.CXYZT.indexOf(dim)]}.`;
    })
    chunkUrl = chunkUrl.slice(0, -1);
    console.log(chunkUrl)
    const response = await axios.get(chunkUrl, {responseType: 'arraybuffer'});
    const compressedChunk = response.data;
    return bloscZarrDecompress(compressedChunk, meta.pixelArrayMetadata);
  }
}

export default ZarrPyramidManager;
