import axios from 'axios'

class HttpStore {
  constructor(url) {
    this.href = url.href
  }

  async getItem(item) {
    const url = `${this.href}/${item}`
    return (await axios.get(url, { responseType: 'arraybuffer' })).data
  }
}

export default HttpStore
