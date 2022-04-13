import axios from 'axios'

const isMetadata = item =>
  ['.zattrs', '.zgroup', '.zarray'].some(knownMetadataFile =>
    item.endsWith(knownMetadataFile)
  )

class ZarrStore {
  /*
   * Zarr HTTP store.
   */

  constructor(url) {
    this.url = url
  }

  async getItem(item) {
    const itemUrl = `${this.url.href}/${item}`
    const { data } = await axios.get(itemUrl, {
      responseType: isMetadata(item) ? 'json' : 'arraybuffer',
    })
    return data
  }
}

export default ZarrStore
