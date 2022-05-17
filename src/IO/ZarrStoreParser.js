const isMetadata = item =>
  ['.zattrs', '.zgroup', '.zarray'].some(knownMetadataFile =>
    item.endsWith(knownMetadataFile)
  )

class ZarrStore {
  constructor(store) {
    this.store = store
    this.decoder = new TextDecoder()
  }

  toJson(data) {
    return JSON.parse(this.decoder.decode(data))
  }

  async getItem(item) {
    const data = await this.store.getItem(item)
    return isMetadata(item) ? this.toJson(data) : data
  }
}

export default ZarrStore
