import test from 'tape-catch'
import { ConglomerateMultiscaleSpatialImage } from '../src/IO/ConglomerateMultiscaleSpatialImage'
import { toMultiscaleSpatialImage } from '../src/utils'

const takeSnapshot = ({ scaleInfo, imageType }) => {
  return JSON.stringify({ scaleInfo, imageType })
}

const IMAGE_BASELINES = [
  {
    paths: [
      'base/test/data/input/astronaut.zarr',
      'base/test/data/input/astronaut.zarr',
    ],
    baseline:
      '{"scaleInfo":[{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,1,1,512,512],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dtype":"<f4","fill_value":0,"filters":null,"order":"C","shape":[1,3,1,2048,2048],"zarr_format":2},"pixelArrayPath":"0","coords":{},"chunkCount":[["t",1],["c",3],["z",1],["y",4],["x",4]],"chunkSize":[["t",1],["c",1],["z",1],["y",512],["x",512]],"arrayShape":[["t",1],["c",3],["z",1],["y",2048],["x",2048]]},{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,1,1,256,512],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dtype":"<f4","fill_value":0,"filters":null,"order":"C","shape":[1,3,1,1024,1024],"zarr_format":2},"pixelArrayPath":"1","coords":{},"chunkCount":[["t",1],["c",3],["z",1],["y",4],["x",2]],"chunkSize":[["t",1],["c",1],["z",1],["y",256],["x",512]],"arrayShape":[["t",1],["c",3],["z",1],["y",1024],["x",1024]]},{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,2,1,256,256],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dtype":"<f4","fill_value":0,"filters":null,"order":"C","shape":[1,3,1,512,512],"zarr_format":2},"pixelArrayPath":"2","coords":{},"chunkCount":[["t",1],["c",2],["z",1],["y",2],["x",2]],"chunkSize":[["t",1],["c",2],["z",1],["y",256],["x",256]],"arrayShape":[["t",1],["c",3],["z",1],["y",512],["x",512]]},{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,2,1,128,256],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dtype":"<f4","fill_value":0,"filters":null,"order":"C","shape":[1,3,1,256,256],"zarr_format":2},"pixelArrayPath":"3","coords":{},"chunkCount":[["t",1],["c",2],["z",1],["y",2],["x",1]],"chunkSize":[["t",1],["c",2],["z",1],["y",128],["x",256]],"arrayShape":[["t",1],["c",3],["z",1],["y",256],["x",256]]}],"imageType":{"dimension":2,"pixelType":"VariableLengthVector","componentType":"float32","components":6}}',
  },
  {
    paths: [
      'base/test/data/input/ome-ngff-prototypes/single_image/v0.4/tczyx.ome.zarr',
      'base/test/data/input/ome-ngff-prototypes/single_image/v0.4/tczyx.ome.zarr',
    ],
    baseline:
      '{"scaleInfo":[{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,1,64,64,64],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dimension_separator":"/","dtype":"<i2","fill_value":0,"filters":null,"order":"C","shape":[3,2,486,262,512],"zarr_format":2},"name":"tczyx","pixelArrayPath":"s0","coords":{},"chunkCount":[["t",3],["c",2],["z",8],["y",5],["x",8]],"chunkSize":[["t",1],["c",1],["z",64],["y",64],["x",64]],"arrayShape":[["t",3],["c",2],["z",486],["y",262],["x",512]]},{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,1,64,64,64],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dimension_separator":"/","dtype":"<i2","fill_value":0,"filters":null,"order":"C","shape":[3,2,243,131,256],"zarr_format":2},"name":"tczyx","pixelArrayPath":"s1","coords":{},"chunkCount":[["t",3],["c",2],["z",4],["y",3],["x",4]],"chunkSize":[["t",1],["c",1],["z",64],["y",64],["x",64]],"arrayShape":[["t",3],["c",2],["z",243],["y",131],["x",256]]},{"dims":["t","c","z","y","x"],"pixelArrayMetadata":{"chunks":[1,1,64,64,64],"compressor":{"blocksize":0,"clevel":5,"cname":"lz4","id":"blosc","shuffle":1},"dimension_separator":"/","dtype":"<i2","fill_value":0,"filters":null,"order":"C","shape":[3,2,122,66,128],"zarr_format":2},"name":"tczyx","pixelArrayPath":"s2","coords":{},"chunkCount":[["t",3],["c",2],["z",2],["y",2],["x",2]],"chunkSize":[["t",1],["c",1],["z",64],["y",64],["x",64]],"arrayShape":[["t",3],["c",2],["z",122],["y",66],["x",128]]}],"imageType":{"dimension":3,"pixelType":"VariableLengthVector","componentType":"int16","components":4}}',
  },
  {
    paths: [
      'base/test/data/input/HeadMRVolume.nrrd',
      'base/test/data/input/HeadMRVolumeLabels.nrrd',
    ],
    baseline:
      '{"scaleInfo":[{"dims":["z","y","x"],"coords":{"coords":[["x",{"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"7":28,"8":32,"9":36,"10":40,"11":44,"12":48,"13":52,"14":56,"15":60,"16":64,"17":68,"18":72,"19":76,"20":80,"21":84,"22":88,"23":92,"24":96,"25":100,"26":104,"27":108,"28":112,"29":116,"30":120,"31":124,"32":128,"33":132,"34":136,"35":140,"36":144,"37":148,"38":152,"39":156,"40":160,"41":164,"42":168,"43":172,"44":176,"45":180,"46":184,"47":188}],["y",{"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"7":28,"8":32,"9":36,"10":40,"11":44,"12":48,"13":52,"14":56,"15":60,"16":64,"17":68,"18":72,"19":76,"20":80,"21":84,"22":88,"23":92,"24":96,"25":100,"26":104,"27":108,"28":112,"29":116,"30":120,"31":124,"32":128,"33":132,"34":136,"35":140,"36":144,"37":148,"38":152,"39":156,"40":160,"41":164,"42":168,"43":172,"44":176,"45":180,"46":184,"47":188,"48":192,"49":196,"50":200,"51":204,"52":208,"53":212,"54":216,"55":220,"56":224,"57":228,"58":232,"59":236,"60":240,"61":244}],["z",{"0":0,"1":4,"2":8,"3":12,"4":16,"5":20,"6":24,"7":28,"8":32,"9":36,"10":40,"11":44,"12":48,"13":52,"14":56,"15":60,"16":64,"17":68,"18":72,"19":76,"20":80,"21":84,"22":88,"23":92,"24":96,"25":100,"26":104,"27":108,"28":112,"29":116,"30":120,"31":124,"32":128,"33":132,"34":136,"35":140,"36":144,"37":148,"38":152,"39":156,"40":160,"41":164}]]},"chunkCount":[["z",1],["y",1],["x",1]],"chunkSize":[["z",42],["y",62],["x",48]],"arrayShape":[["z",42],["y",62],["x",48]],"ranges":[[0,255],[0,2]],"direction":[[1,0,0],[0,1,0],[0,0,1]]}],"imageType":{"dimension":3,"componentType":"uint16","pixelType":"Scalar","components":2}}',
  },
]

test('Test ConglomerateMultiscaleSpatialImage construction', async t => {
  for (const { paths, baseline } of IMAGE_BASELINES) {
    const multiscaleImages = await Promise.all(
      paths
        .map(path => new URL(path, document.location.origin))
        .map(image => toMultiscaleSpatialImage(image))
    )
    const image = new ConglomerateMultiscaleSpatialImage(multiscaleImages)

    t.deepEqual(
      takeSnapshot(image),
      baseline,
      `conglomerate ${paths} image matches baseline`
    )
  }

  t.end()
})
