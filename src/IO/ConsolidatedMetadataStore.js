import axios from 'axios'

class ConsolidatedMetadataStore {
  /*
   * Retrieve the consolidated metadata associated with a Zarr HTTP store.
   *
   * Constructor cannot be async -- call this and pass the result to the
   * constructor.
   */
  static async parseMetadata(url) {
    const metadataUrl = url + '/.zmetadata'
    const response = await axios.get(metadataUrl, { responseType: 'json' })
    return response.data.metadata
  }

  constructor(metadata) {
    this.zmetadata = metadata
  }

  async getItem(item) {
    if (
      item.includes('.zattrs') ||
      item.includes('.zgroup') ||
      item.includes('.zarray')
    ) {
      return this.zmetadata[item]
    } else {
      // todo
    }
  }

  containsItem(item) {}
}

export default ConsolidatedMetadataStore
