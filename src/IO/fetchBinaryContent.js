import axios from 'axios'
import any from 'promise.any'

async function fetchBinaryContent(url, progressCallback) {
  const urlObj = new URL(url)
  if (urlObj.protocol === 'ipfs:') {
    const splitPathname = urlObj.href.split('/')
    const cid = splitPathname[2]
    const path = splitPathname.slice(3).join('/')
    const httpUrls = [`http://${cid}.ipfs.localhost:8080/${path}`]
    const externalGateways = ['cf-ipfs.com', 'dweb.link']
    externalGateways.forEach(g => {
      const target = `https://${cid}.ipfs.${g}/${path}`
      httpUrls.push(target)
    })
    try {
      const responses = httpUrls.map((target, index) => {
        const callback = index === 2 ? progressCallback : null
        return axios.get(target, {
          onDownloadProgress: callback,
          responseType: 'arraybuffer',
        })
      })
      const response = await any(responses)
      return response.data
    } catch (error) {
      // Possibly no local node or network connection
    }
  } else {
    const response = await axios.get(urlObj.href, {
      onDownloadProgress: progressCallback,
      responseType: 'arraybuffer',
    })
    return response.data
  }
}

export default fetchBinaryContent
