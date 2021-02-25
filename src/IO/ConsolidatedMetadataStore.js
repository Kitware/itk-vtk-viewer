import axios from 'axios'

class ConsolidatedMetadataStore {
  /*
   * Retrieve the consolidated metadata associated with a Zarr HTTP store.
   *
   * Constructor cannot be async -- call this and pass the result to the
   * constructor.
   */
  static async retrieveMetadata(url) {
    const metadataUrl = `${url.href}/.zmetadata`
    const response = await axios.get(metadataUrl, { responseType: 'json' })
    return response.data.metadata
  }

  constructor(url, metadata) {
    this.url = url
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
      // Assume chunks
      const groupIndex = item.lastIndexOf('/')
      const zarray = this.zmetadata[`${item.substring(0, groupIndex)}/.zarray`]
      const chunkUrl = `${this.url.href}/${item}`
      const response = await axios.get(chunkUrl, {
        responseType: 'arraybuffer',
      })
      const data = response.data
      return data
    }
  }

  async containsItem(item) {
    if (
      item.includes('.zattrs') ||
      item.includes('.zgroup') ||
      item.includes('.zarray')
    ) {
      return this.zmetadata[item] !== undefined
    } else {
      // Assume chunks
      const groupIndex = item.lastIndexOf('/')
      const zarray = this.zmetadata[`${item.substring(0, groupIndex)}/.zarray`]
      const chunkUrl = `${this.url.href}/${item}`
      try {
        const response = await axios.head(chunkUrl)
        return true
      } catch (err) {
        return false
      }
    }
  }
}

export default ConsolidatedMetadataStore
