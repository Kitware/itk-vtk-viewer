import registerWebworker from 'webworker-promise/lib/register'

registerWebworker().operation(
  'chunk',
  (
    {
      //data,
      //componentType,
      //chunkElements,
      //cxElements,
      //sizeCXYZTChunks,
      //dataStride,
      //kOffset,
      //jOffset,
      //iOffset,
    }
  ) => {
    //const chunkType = componentTypeToTypedArray.get(componentType)
    //const chunk = new chunkType(chunkElements)
    //let cxOffset = 0
    //for (let kk = 0; kk < sizeCXYZTChunks[3]; kk++) {
    //const kaOffset = dataStride[3] * (kOffset + kk)
    //for (let jj = 0; jj < sizeCXYZTChunks[2]; jj++) {
    //const jaOffset = kaOffset + dataStride[2] * (jOffset + jj)
    //const iaOffset = jaOffset + dataStride[1] * iOffset
    //const dataSlice = data.subarray(iaOffset, iaOffset + cxElements)
    //chunk.set(dataSlice, cxOffset)
    //cxOffset += cxElements
    //}
    //}
    //const response = new registerWebworker.TransferableResponse(chunk, [
    //chunk.buffer,
    //])
    //return response
  }
)
