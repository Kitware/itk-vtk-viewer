if(!self.define){let e,i={};const a=(a,r)=>(a=new URL(a+".js",r).href,i[a]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=i,document.head.appendChild(e)}else e=a,importScripts(a),i()})).then((()=>{let e=i[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(r,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let m={};const o=e=>a(e,d),b={module:{uri:d},exports:m,require:o};i[d]=Promise.all(r.map((e=>b[e]||o(e)))).then((e=>(s(...e),m)))}}define(["./workbox-8ebd3307"],(function(e){"use strict";e.setCacheNameDetails({prefix:"itk-vtk-viewer-"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"124.itkVtkViewer.js",revision:"99038064588643947ff3e4f4a91e1c02"},{url:"e70d53d395877c115376.js",revision:null},{url:"itk/image-io/BMPImageIO-read-image.js",revision:"b92b9905ce2318709939bf6748efe915"},{url:"itk/image-io/BMPImageIO-read-image.umd.js",revision:"09902fa51e362aeea37fff6bd393227b"},{url:"itk/image-io/BMPImageIO-write-image.js",revision:"a0d46e6226df368f410b7e24c43fa1e7"},{url:"itk/image-io/BMPImageIO-write-image.umd.js",revision:"767a383f362fc47edef034e6c1b804f5"},{url:"itk/image-io/BioRadImageIO-read-image.js",revision:"e11645312cfc7f3325b87e497e30c807"},{url:"itk/image-io/BioRadImageIO-read-image.umd.js",revision:"72557006c98ffadd9ebfdfe5a69e81a7"},{url:"itk/image-io/BioRadImageIO-write-image.js",revision:"d0b810c251320b9cf961c1d84fafbbb9"},{url:"itk/image-io/BioRadImageIO-write-image.umd.js",revision:"41f1685c0e6519bc431fa6e078022293"},{url:"itk/image-io/FDFImageIO-read-image.js",revision:"e13801eaad8bd21705059c72da0cadfc"},{url:"itk/image-io/FDFImageIO-read-image.umd.js",revision:"f3c6f25d38792839d7da3f5b07b6d4d8"},{url:"itk/image-io/FDFImageIO-write-image.js",revision:"7928983896621c58e525a67835f101da"},{url:"itk/image-io/FDFImageIO-write-image.umd.js",revision:"b8de36ba6338054c5486a954dd67b6f8"},{url:"itk/image-io/GDCMImageIO-read-image.js",revision:"468892b9baabeb6e7d4ff433b9b627c4"},{url:"itk/image-io/GDCMImageIO-read-image.umd.js",revision:"226b67912131de395debc0002556ea62"},{url:"itk/image-io/GDCMImageIO-write-image.js",revision:"40189ff0f987f0f2eb4a04186b8b56ff"},{url:"itk/image-io/GDCMImageIO-write-image.umd.js",revision:"4c62bc9b5bb5ca20b9e86011f162da1a"},{url:"itk/image-io/GE4ImageIO-read-image.js",revision:"6d733050ec1a3ae2868e3d8a254bf17e"},{url:"itk/image-io/GE4ImageIO-read-image.umd.js",revision:"6959349803b276f8925f9f6cc211d784"},{url:"itk/image-io/GE4ImageIO-write-image.js",revision:"21a9036865cdfce6738be8b06a964569"},{url:"itk/image-io/GE4ImageIO-write-image.umd.js",revision:"183dbda4d8cbc49749d92ed6e6c87d34"},{url:"itk/image-io/GE5ImageIO-read-image.js",revision:"55303ea83d806be72d71bf5f711e31a9"},{url:"itk/image-io/GE5ImageIO-read-image.umd.js",revision:"266a2f69d9edd8551b1cc23c7456cc84"},{url:"itk/image-io/GE5ImageIO-write-image.js",revision:"5ae0e621c4d87dad9dfbe5667db937fb"},{url:"itk/image-io/GE5ImageIO-write-image.umd.js",revision:"abec5ed89d79b2b385bd3b8a5e514101"},{url:"itk/image-io/GEAdwImageIO-read-image.js",revision:"67bb0e3713cf75770bea07b97f966989"},{url:"itk/image-io/GEAdwImageIO-read-image.umd.js",revision:"5e0ed9450aadaf6896a0be0d93df4ca3"},{url:"itk/image-io/GEAdwImageIO-write-image.js",revision:"e5052b77faf334630c979a29365d2742"},{url:"itk/image-io/GEAdwImageIO-write-image.umd.js",revision:"089966c3a974e22dca2ccf2f5f8e6261"},{url:"itk/image-io/GiplImageIO-read-image.js",revision:"7de87427023508da8007f03d130eaab8"},{url:"itk/image-io/GiplImageIO-read-image.umd.js",revision:"0f6766bc7205931f5c1abb7d4883bd36"},{url:"itk/image-io/GiplImageIO-write-image.js",revision:"a6b748f15556dfbf486765504d58ed4a"},{url:"itk/image-io/GiplImageIO-write-image.umd.js",revision:"dfd93375fb992946a050e5ff18ff96a8"},{url:"itk/image-io/HDF5ImageIO-read-image.js",revision:"02bcaa4f0fef3a80ffb8735f143ee46a"},{url:"itk/image-io/HDF5ImageIO-read-image.umd.js",revision:"7b197e9f65b6c0eb0c22077403ce6f9a"},{url:"itk/image-io/HDF5ImageIO-write-image.js",revision:"081c5d45cf449a9195cc6ccacfa5b478"},{url:"itk/image-io/HDF5ImageIO-write-image.umd.js",revision:"e9afc244fe980aeec902a57c00fa9e46"},{url:"itk/image-io/JPEGImageIO-read-image.js",revision:"335d6fb84345f32ac78022ff04bf9790"},{url:"itk/image-io/JPEGImageIO-read-image.umd.js",revision:"11333e8b7ac93f36d229b2cc0a723690"},{url:"itk/image-io/JPEGImageIO-write-image.js",revision:"d3dc3d02d745b44b255ca50450e5fde5"},{url:"itk/image-io/JPEGImageIO-write-image.umd.js",revision:"9fd8aacdf79872f3e3cb4b9fb16b8faf"},{url:"itk/image-io/LSMImageIO-read-image.js",revision:"6a8c89e08a97acdf03fcc35e6a52125a"},{url:"itk/image-io/LSMImageIO-read-image.umd.js",revision:"a1e588c08db89b860542642b058c6306"},{url:"itk/image-io/LSMImageIO-write-image.js",revision:"b1287037b57b76f443a5e4ff733bb875"},{url:"itk/image-io/LSMImageIO-write-image.umd.js",revision:"f82533f3c903d4890a7f9e84f11ee217"},{url:"itk/image-io/MGHImageIO-read-image.js",revision:"111ca71638d04bc847c8d971b7d4882f"},{url:"itk/image-io/MGHImageIO-read-image.umd.js",revision:"4816438900559d14f770052fb4af32b5"},{url:"itk/image-io/MGHImageIO-write-image.js",revision:"5f444e01f65cb98e279b9ba6f1008bc5"},{url:"itk/image-io/MGHImageIO-write-image.umd.js",revision:"2d4920106bd0e5379b490a6ef2de23d6"},{url:"itk/image-io/MINCImageIO-read-image.js",revision:"fd93c70407cd49fcaaa4a7598feb3ef4"},{url:"itk/image-io/MINCImageIO-read-image.umd.js",revision:"c835dda5a045cb3387ba70cd9b85f7a7"},{url:"itk/image-io/MINCImageIO-write-image.js",revision:"7498d4ce9a3687c598ca1905bd220100"},{url:"itk/image-io/MINCImageIO-write-image.umd.js",revision:"1a6c028a2298a640f1b257428d130404"},{url:"itk/image-io/MRCImageIO-read-image.js",revision:"41453e86240491d688834c1188e9b819"},{url:"itk/image-io/MRCImageIO-read-image.umd.js",revision:"0de01901391feb6dbbbe8eded9b67641"},{url:"itk/image-io/MRCImageIO-write-image.js",revision:"b27eec38c060dfe4f9c96c4996cd874c"},{url:"itk/image-io/MRCImageIO-write-image.umd.js",revision:"1198b7b89ed616080a559ed7f7b92583"},{url:"itk/image-io/MetaImageIO-read-image.js",revision:"425731361e0316fa2e1d235b8ae6912e"},{url:"itk/image-io/MetaImageIO-read-image.umd.js",revision:"4d92bb9afe860a44a26ad2b44a97a42d"},{url:"itk/image-io/MetaImageIO-write-image.js",revision:"e342603d5363a010c116112876beba7f"},{url:"itk/image-io/MetaImageIO-write-image.umd.js",revision:"2ab06ab5e18992dfe21857b5ce6633f0"},{url:"itk/image-io/NiftiImageIO-read-image.js",revision:"edc776c5dc67bcb8d50a2a7b8d31e9e9"},{url:"itk/image-io/NiftiImageIO-read-image.umd.js",revision:"19667a4e2559cf4bc0c12f80dda70364"},{url:"itk/image-io/NiftiImageIO-write-image.js",revision:"abb954ea953bf951d5d86217084c48e2"},{url:"itk/image-io/NiftiImageIO-write-image.umd.js",revision:"66c36577c8f775f9c102d0dee8da08f6"},{url:"itk/image-io/NrrdImageIO-read-image.js",revision:"d5582d9ea47fe97e27d6b86bc5501a4d"},{url:"itk/image-io/NrrdImageIO-read-image.umd.js",revision:"06e3e0d67476d90e3d0c326c0b3fb6f8"},{url:"itk/image-io/NrrdImageIO-write-image.js",revision:"068176c851d35dc26cd9e9e1880e88e6"},{url:"itk/image-io/NrrdImageIO-write-image.umd.js",revision:"600c894e25558b51acbb45c61d2fe801"},{url:"itk/image-io/PNGImageIO-read-image.js",revision:"10af486d5f32c48beb453565cdef1e0b"},{url:"itk/image-io/PNGImageIO-read-image.umd.js",revision:"451d84a7ab54a3ff5b314c3c2caf9b89"},{url:"itk/image-io/PNGImageIO-write-image.js",revision:"853beb9dbbbde3293d448f97e14473bb"},{url:"itk/image-io/PNGImageIO-write-image.umd.js",revision:"90fc2a02f5981aea2a6c8d134f765056"},{url:"itk/image-io/ScancoImageIO-read-image.js",revision:"f9432fc1fb2d8a4c2cdfb712c9cbbb95"},{url:"itk/image-io/ScancoImageIO-read-image.umd.js",revision:"9ec0b882431c04fcd2890fa66465c81c"},{url:"itk/image-io/ScancoImageIO-write-image.js",revision:"907175b40780c36a4b781e1b38ed7014"},{url:"itk/image-io/ScancoImageIO-write-image.umd.js",revision:"c0c45dd595185444ce9f083b76168a4c"},{url:"itk/image-io/TIFFImageIO-read-image.js",revision:"3aaec7759349fcdbb50a29b1a99fdcc3"},{url:"itk/image-io/TIFFImageIO-read-image.umd.js",revision:"6811cee9f844246551c6356efec1a289"},{url:"itk/image-io/TIFFImageIO-write-image.js",revision:"59b212719af18949285422d9868b81fe"},{url:"itk/image-io/TIFFImageIO-write-image.umd.js",revision:"b8edbc1b35764abab6b55e879cfcb123"},{url:"itk/image-io/VTKImageIO-read-image.js",revision:"db172efef967535ed6903fc3fbf8fe6c"},{url:"itk/image-io/VTKImageIO-read-image.umd.js",revision:"2da398c426d07843d6fe0a10ce3b4189"},{url:"itk/image-io/VTKImageIO-write-image.js",revision:"d546c652281fe15f237e1915f50a6d07"},{url:"itk/image-io/VTKImageIO-write-image.umd.js",revision:"55acf2d138ae3fcacc11f7a1dc5b6351"},{url:"itk/image-io/WasmImageIO-read-image.js",revision:"30247ee89e8936025de32bd4ab63f415"},{url:"itk/image-io/WasmImageIO-read-image.umd.js",revision:"2a86bb61b1a843516162ddab4bd141fd"},{url:"itk/image-io/WasmImageIO-write-image.js",revision:"c6a9a97a132745e2580993cec69af906"},{url:"itk/image-io/WasmImageIO-write-image.umd.js",revision:"8cf92e840bbbcbba2e2809988167813a"},{url:"itk/image-io/WasmZstdImageIO-read-image.js",revision:"7aa227b151e08a80478e2d2ec777bcf1"},{url:"itk/image-io/WasmZstdImageIO-read-image.umd.js",revision:"5f8987a552946d14283537e55850ebfb"},{url:"itk/image-io/WasmZstdImageIO-write-image.js",revision:"33ef9e3c302ad6168a78e80e4221d804"},{url:"itk/image-io/WasmZstdImageIO-write-image.umd.js",revision:"3ce41823699eba36aeb5bc57db18b2f6"},{url:"itk/image-io/index.js",revision:"87c66f0ba6142d2171e3a0b28846ebcd"},{url:"itk/image-io/read-dicom-tags.js",revision:"d52663b4b9548e6dabc9b7ef5e39135d"},{url:"itk/image-io/read-dicom-tags.umd.js",revision:"8468c081ec2980ff4b812df382586665"},{url:"itk/image-io/read-image-dicom-file-series.js",revision:"91fe0036163d4f15ec1d1900ce9f2ad7"},{url:"itk/image-io/read-image-dicom-file-series.umd.js",revision:"ff40ff2fa5c2258ba8afa8019ec746b4"},{url:"itk/mesh-io/BYUMeshIO-read-mesh.js",revision:"0beb28c66b5555013a3670f9bd5433aa"},{url:"itk/mesh-io/BYUMeshIO-read-mesh.umd.js",revision:"052a7cae271c7bd6fb42aa65a9bffbab"},{url:"itk/mesh-io/BYUMeshIO-write-mesh.js",revision:"c4ed70af2e6ed10022428f26036d2d10"},{url:"itk/mesh-io/BYUMeshIO-write-mesh.umd.js",revision:"eb6dbb3bb3c944981f7c57a481f2ca7e"},{url:"itk/mesh-io/FreeSurferAsciiMeshIO-read-mesh.js",revision:"93324f12061d66cf05cd4221e3a430ef"},{url:"itk/mesh-io/FreeSurferAsciiMeshIO-read-mesh.umd.js",revision:"0d08ff0639c44d4513864a839808c8d0"},{url:"itk/mesh-io/FreeSurferAsciiMeshIO-write-mesh.js",revision:"3fbce6c2b7821fa6adf9b9e7755c22ea"},{url:"itk/mesh-io/FreeSurferAsciiMeshIO-write-mesh.umd.js",revision:"3a6f9c116fca61c747f8c7412a278322"},{url:"itk/mesh-io/FreeSurferBinaryMeshIO-read-mesh.js",revision:"e7ccae627b87956dafc31afe431c3126"},{url:"itk/mesh-io/FreeSurferBinaryMeshIO-read-mesh.umd.js",revision:"556c1332a354a3540b24e6c1711e3bea"},{url:"itk/mesh-io/FreeSurferBinaryMeshIO-write-mesh.js",revision:"80f327d0e38bfc56375c8eb296787fc2"},{url:"itk/mesh-io/FreeSurferBinaryMeshIO-write-mesh.umd.js",revision:"80e50afc868463b63a6f6fb5e9022ba8"},{url:"itk/mesh-io/OBJMeshIO-read-mesh.js",revision:"1c07b7bfcd9113a9a9aeabbb6299aeea"},{url:"itk/mesh-io/OBJMeshIO-read-mesh.umd.js",revision:"d39e44265bbdd7727ef5c280a7c31cb7"},{url:"itk/mesh-io/OBJMeshIO-write-mesh.js",revision:"e3085047797d2fdffc449b95c954e0e0"},{url:"itk/mesh-io/OBJMeshIO-write-mesh.umd.js",revision:"adf4e4ee2c6c5efe26a406e4b68f75c1"},{url:"itk/mesh-io/OFFMeshIO-read-mesh.js",revision:"b2271cca2263aa255869f36f27585e5e"},{url:"itk/mesh-io/OFFMeshIO-read-mesh.umd.js",revision:"2839f664c94f916889f9c2156fb8aeb7"},{url:"itk/mesh-io/OFFMeshIO-write-mesh.js",revision:"fa38cfb1d0b78f27aef46a62030d1783"},{url:"itk/mesh-io/OFFMeshIO-write-mesh.umd.js",revision:"15eb00b32a88295bbeaa2799255ec38a"},{url:"itk/mesh-io/STLMeshIO-read-mesh.js",revision:"895fbbf4d269adb14e45ce4a64816820"},{url:"itk/mesh-io/STLMeshIO-read-mesh.umd.js",revision:"41e0261ddcf229e9e189197156c904ec"},{url:"itk/mesh-io/STLMeshIO-write-mesh.js",revision:"ec5b6734c1e552d325e472abe7986dc3"},{url:"itk/mesh-io/STLMeshIO-write-mesh.umd.js",revision:"971d5edcb4a55b9acbe4cf08f9cb12c2"},{url:"itk/mesh-io/SWCMeshIO-read-mesh.js",revision:"983c2380171bd95b43b6dbfd9960d983"},{url:"itk/mesh-io/SWCMeshIO-read-mesh.umd.js",revision:"cf9955ac33d49bbb148e9f7ea3d47da6"},{url:"itk/mesh-io/SWCMeshIO-write-mesh.js",revision:"dc2042034408410c2cd75cd486154f7e"},{url:"itk/mesh-io/SWCMeshIO-write-mesh.umd.js",revision:"c1f73664adc93b10bc2ec2c82f558807"},{url:"itk/mesh-io/VTKPolyDataMeshIO-read-mesh.js",revision:"f7f0d74fc48acef4f410f9077d1033a3"},{url:"itk/mesh-io/VTKPolyDataMeshIO-read-mesh.umd.js",revision:"b755ffe9b906e11156a3cddeb50e2c19"},{url:"itk/mesh-io/VTKPolyDataMeshIO-write-mesh.js",revision:"44446b3b33a7922788c725c3ae2ae072"},{url:"itk/mesh-io/VTKPolyDataMeshIO-write-mesh.umd.js",revision:"1c53baa6fb55ffaf60afe1de81ec6022"},{url:"itk/mesh-io/WasmMeshIO-read-mesh.js",revision:"dc64f2a564434e4823ebcc09eb0a345b"},{url:"itk/mesh-io/WasmMeshIO-read-mesh.umd.js",revision:"dec0c7758bedd8334190a74ce744cb66"},{url:"itk/mesh-io/WasmMeshIO-write-mesh.js",revision:"b5dcc39cff808565fd905e6436e9d2a9"},{url:"itk/mesh-io/WasmMeshIO-write-mesh.umd.js",revision:"ceb226147c0141c0cf66797115488366"},{url:"itk/mesh-io/WasmZstdMeshIO-read-mesh.js",revision:"ec603be12c796be4673f153fdb357eb6"},{url:"itk/mesh-io/WasmZstdMeshIO-read-mesh.umd.js",revision:"cb18d02499065374f635b9a9374d765d"},{url:"itk/mesh-io/WasmZstdMeshIO-write-mesh.js",revision:"df48aaaf8f7c751b8565d87c4aaadde2"},{url:"itk/mesh-io/WasmZstdMeshIO-write-mesh.umd.js",revision:"9194d370fe32414de61f83d3aad32083"},{url:"itk/mesh-io/index.js",revision:"675a8942cac5d8301a8846b6068a9d70"},{url:"itk/mesh-io/mesh-to-polydata.js",revision:"4622cb66d803db6c52c41bc0efeea611"},{url:"itk/mesh-io/mesh-to-polydata.umd.js",revision:"04be2f8083ef137ff841fc730efb1c25"},{url:"itk/mesh-io/polydata-to-mesh.js",revision:"bf5cedf9618e86b289c4c8130862caca"},{url:"itk/mesh-io/polydata-to-mesh.umd.js",revision:"83cc904c61971fd33392d64783e58dd1"},{url:"itk/pipeline/BloscZarr.js",revision:"b977fdc9a3e1dc2449fa74b5edd6ab1b"},{url:"itk/pipeline/BloscZarr.umd.js",revision:"609f4d40fe1ec5dd56c958b64d0888cc"},{url:"itk/pipeline/Compare.js",revision:"d41a9c82ac575f1a5b476ef689d7822b"},{url:"itk/pipeline/Compare.umd.js",revision:"d8c7381005a6cb1266c8f85382c5944b"},{url:"itk/pipeline/Downsample.js",revision:"9276eded716d2d939a14bfda5dfec63e"},{url:"itk/pipeline/Downsample.umd.js",revision:"067d1895af3dcee8c40e453e2d8f0531"},{url:"itk/pipeline/DownsampleLabelImage.js",revision:"b472ecf908be74fef184e705723f2da9"},{url:"itk/pipeline/DownsampleLabelImage.umd.js",revision:"04683eb2971ea2edd956462adc3cda15"},{url:"itk/pipeline/ResampleLabelImage.js",revision:"b0103d020bd474ff0c88dde4cd7df4e5"},{url:"itk/pipeline/ResampleLabelImage.umd.js",revision:"dd9ea8ac22c09a46671f53067a02887d"},{url:"itk/web-workers/IOInput.js",revision:"99ba9a1b47bfa8e89f5f59423e160557"},{url:"itk/web-workers/ITKConfig.js",revision:"99ba9a1b47bfa8e89f5f59423e160557"},{url:"itk/web-workers/RunPipelineInput.js",revision:"99ba9a1b47bfa8e89f5f59423e160557"},{url:"itk/web-workers/WebWorkerInput.js",revision:"99ba9a1b47bfa8e89f5f59423e160557"},{url:"itk/web-workers/bundles/pipeline.min.worker.js",revision:"205b81fa014bf25a00925815378f532e"},{url:"itk/web-workers/bundles/pipeline.worker.js",revision:"0fa3353bb2070a1205ecb32de70659f5"},{url:"itk/web-workers/loadImageIOPipelineModule.js",revision:"083b7f359cb4a80010f2f030ff512805"},{url:"itk/web-workers/loadMeshIOPipelineModule.js",revision:"d58b1bfbc28c29390aad0cd53d20d659"},{url:"itk/web-workers/loadPipelineModule.js",revision:"6fe0cc1fb1e78a669383684c3a59be6e"},{url:"itk/web-workers/min-bundles/pipeline.worker.js",revision:"553266e305bcbe0a28c0ea1a92066c8c"},{url:"itk/web-workers/pipeline.worker.js",revision:"ced706a079e9f2126ea3c32ebe709c62"},{url:"itk/web-workers/runPipeline.js",revision:"01b4ef63574db0600aa6f38718a0de5d"},{url:"itkVtkViewer.js",revision:"bf91698b77707a492cbb6300c135d8e7"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(/(\.js|\.png|\.wasm)$/,new e.StaleWhileRevalidate({cacheName:"itk-vtk-viewer-StaleWhileRevalidate",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:1209600})]}),"GET")}));
//# sourceMappingURL=serviceWorker.js.map
