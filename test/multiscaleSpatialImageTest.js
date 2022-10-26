import test from 'tape-catch'
import ZarrMultiscaleSpatialImage from '../src/IO/ZarrMultiscaleSpatialImage'
import { takeSnapshot } from './zarrImageBaselines'

const IMAGE_BASELINES = [
  [
    'base/test/data/input/astronaut.zarr',
    [
      Number.MAX_VALUE,
      -Number.MAX_VALUE, // X
      Number.MAX_VALUE,
      -Number.MAX_VALUE, // Y
      Number.MAX_VALUE,
      -Number.MAX_VALUE, // Z
    ],
    '{"imageType":{"dimension":2,"pixelType":"VariableLengthVector","componentType":"float32","components":3},"origin":[0,0],"spacing":[1,1],"direction":{"0":1,"1":0,"2":0,"3":1},"size":[256,256],"ranges":[[0,0.9763471484184265],[0,0.9741398692131042],[0,0.9760480523109436]],"data":[0.6908552050590515,0.6688187122344971,0.674207329750061,0.27221277356147766,0.2442161589860916,0.30864495038986206,0.04838373512029648,0.021947167813777924,0.11139355599880219,0.12586522102355957,0.08368028700351715,0.2073654979467392,0.29955506324768066,0.26995500922203064,0.3033413887023926,0.4970903694629669,0.46638235449790955,0.4774773120880127,0.6510546803474426,0.6293986439704895,0.6291141510009766,0.652686595916748,0.6369064450263977,0.6407243609428406,0.6563014984130859,0.645758330821991,0.6505763530731201,0.6664388179779053,0.6574797630310059,0.6628299951553345,0.6745269298553467,0.6657060384750366,0.6709856390953064,0.702728271484375,0.6728822588920593,0.6759136915206909,0.3145504593849182,0.27835237979888916,0.33366164565086365,0.12892097234725952,0.08835494518280029,0.16398540139198303,0.18125581741333008,0.09787159413099289,0.20692530274391174,0.32659101486206055,0.250407338142395,0.27853235602378845,0.5059590339660645,0.4235151708126068,0.41403526067733765,0.64797443151474,0.5656358003616333,0.5444427728652954,0.650419294834137,0.5713972449302673,0.5587600469589233,0.6266179084777832,0.5702376365661621,0.5665257573127747,0.6173701882362366,0.57239830493927,0.5740906596183777,0.6674000024795532,0.6029467582702637,0.594350278377533,1.0168959424516899e-11,1.3201037485366385e-11,7.667253984489086e-12,6.150961359176199e-13,6.375242673183068e-13,1.862368982988305e-12,2.6472281398209896e-13,2.687519803055982e-13,1.9147365442305497e-13,8.121141834103313e-15,7.599267894640993e-15,1.278036429805526e-14,1.6719174311674578e-7,1.4385383906301286e-7,1.528643451820244e-7,0.0015648636035621166,0.0013919497141614556,0.0013295512180775404,0.10193789750337601,0.09551996737718582,0.08835914731025696,0.20549945533275604,0.19322900474071503,0.15210646390914917,0.15297368168830872,0.13750818371772766,0.10394243896007538,0.22972600162029266,0.21356536448001862,0.18998141586780548,0.17018358409404755,0.15841108560562134,0.15074452757835388]}',
  ],
  [
    'base/test/data/input/astronaut.zarr',
    [
      100,
      -Number.MAX_VALUE, // X
      Number.MAX_VALUE,
      200, // Y
      Number.MAX_VALUE,
      -Number.MAX_VALUE, // Z
    ],
    '{"imageType":{"dimension":2,"pixelType":"VariableLengthVector","componentType":"float32","components":3},"origin":[0,200],"spacing":[1,1],"direction":{"0":1,"1":0,"2":0,"3":1},"size":[101,56],"ranges":[[0,0.9763471484184265],[0,0.9741398692131042],[0,0.9760480523109436]],"data":[0.5016011595726013,0.4671969413757324,0.5480467677116394,0.27854517102241516,0.2330424189567566,0.40714380145072937,0.11011084914207458,0.0650978609919548,0.23212175071239471,0.18975907564163208,0.17122404277324677,0.19189605116844177,0.5471437573432922,0.5311456918716431,0.47267284989356995,0.42682144045829773,0.3941821753978729,0.40931466221809387,0.1527613401412964,0.09946845471858978,0.23552680015563965,0.40910038352012634,0.3691486120223999,0.39819636940956116,0.7094975709915161,0.6713034510612488,0.6293835639953613,0.7285913825035095,0.690284013748169,0.6430860757827759,0.7148895263671875,0.6774184107780457,0.6300198435783386,0.5251865983009338,0.07957068830728531,0.09397105127573013,0.5433887243270874,0.08214080333709717,0.10275855660438538,0.46598824858665466,0.05220697447657585,0.10537232458591461,0.37230610847473145,0.0338042750954628,0.0957319587469101,0.4637247323989868,0.07721222192049026,0.12766103446483612,0.7470609545707703,0.29617592692375183,0.23138900101184845,0.8624355792999268,0.3538185656070709,0.24269413948059082,0.8665141463279724,0.3460829555988312,0.23355978727340698,0.8701037764549255,0.3510902225971222,0.2370539903640747,0.8831984400749207,0.3845422565937042,0.26997461915016174,0.8967529535293579,0.42313244938850403,0.3030296862125397,0.7876704931259155,0.34271809458732605,0.19925148785114288,0.7124385833740234,0.30439329147338867,0.1608637273311615,0.4692698121070862,0.23336555063724518,0.13745246827602386,0.3011755645275116,0.20634236931800842,0.13663046061992645,0.2655503451824188,0.1401781588792801,0.0831591859459877,0.545362651348114,0.25483906269073486,0.16718974709510803,0.7643032670021057,0.6180782914161682,0.551887571811676,0.7794655561447144,0.7233560681343079,0.6787746548652649,0.5883067846298218,0.4205212891101837,0.3530835211277008,0.25462889671325684,0.16059496998786926,0.11732897162437439,0.12175840139389038,0.03914067521691322,0.01602073758840561]}',
  ],
  [
    'base/test/data/input/ome-ngff-prototypes/single_image/v0.4/zyx.ome.zarr',
    [
      1000,
      2000, // X
      1000,
      2000, // Y
      Number.MAX_VALUE,
      -Number.MAX_VALUE, // Z
    ],
    '{"imageType":{"dimension":3,"pixelType":"Scalar","componentType":"uint8","components":1},"name":"zyx","origin":[768,768,0],"spacing":[256,256,256],"direction":{"0":1,"1":0,"2":0,"3":0,"4":1,"5":0,"6":0,"7":0,"8":1},"size":[6,6,151],"ranges":[[0,199]],"data":[0,0,0,0,0,0,4,8,7,13,28,15,15,26,41,38,106,85,49,70,68,60,116,109,78,101,91,102,164,117,123,140,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}',
  ],
]

test('Test ZarrMultiscaleSpatialImage world bounded chunk assembly', async t => {
  for (const [path, bounds, baseline] of IMAGE_BASELINES) {
    const storeURL = new URL(path, document.location.origin)
    const zarrImage = await ZarrMultiscaleSpatialImage.fromUrl(storeURL)
    const itkImage = await zarrImage.getImage(
      zarrImage.scaleInfo.length - 1,
      bounds
    )

    t.deepEqual(
      takeSnapshot(itkImage),
      baseline,
      `${path} image matches baseline`
    )
  }

  t.end()
})