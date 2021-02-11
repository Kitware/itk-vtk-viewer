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

  async getItem(item) {}

  async containsItem(item) {}
}

export default ConsolidatedMetadataStore
