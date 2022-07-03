function getFileExtension (filePath: string): string {
  let extension = filePath.slice((filePath.lastIndexOf('.') - 1 >>> 0) + 2)
  if (extension.toLowerCase() === 'gz') {
    const index = filePath.slice(0, -3).lastIndexOf('.')
    extension = filePath.slice((index - 1 >>> 0) + 2)
  } else if (extension.toLowerCase() === 'cbor') {
    const index = filePath.slice(0, -5).lastIndexOf('.')
    extension = filePath.slice((index - 1 >>> 0) + 2)
  } else if (extension.toLowerCase() === 'zstd') {
    // .iwi.cbor.zstd
    const index = filePath.slice(0, -10).lastIndexOf('.')
    extension = filePath.slice((index - 1 >>> 0) + 2)
  } else if (extension.toLowerCase() === 'zip') {
    const index = filePath.slice(0, -4).lastIndexOf('.')
    extension = filePath.slice((index - 1 >>> 0) + 2)
  }
  return extension
}

export default getFileExtension
