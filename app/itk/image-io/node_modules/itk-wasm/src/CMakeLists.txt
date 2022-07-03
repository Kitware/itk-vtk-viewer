include_directories(${WebAssemblyInterface_INCLUDE_DIRS})

set(WebAssemblyInterface_SRCS
  itkPipeline.cxx
  itkWASMExports.cxx
  itkWASMDataObject.cxx
  itkWASMImageIOBase.cxx
  itkWASMImageIOFactory.cxx
  itkWASMImageIO.cxx
  itkWASMMeshIOBase.cxx
  itkWASMMeshIOFactory.cxx
  itkWASMMeshIO.cxx
  itkWASMStringStream.cxx
  itkInputTextStream.cxx
  itkOutputTextStream.cxx
  itkInputBinaryStream.cxx
  itkOutputBinaryStream.cxx
  itkIOComponentEnumFromWASMComponentType.cxx
  itkIOPixelEnumFromWASMPixelType.cxx
  itkWASMComponentTypeFromIOComponentEnum.cxx
  itkWASMPixelTypeFromIOPixelEnum.cxx
  itkSupportInputImageTypes.cxx
  itkSupportInputImageTypesNoVectorImage.cxx
  itkSupportInputMeshTypes.cxx
  itkSupportInputPolyDataTypes.cxx
  )
itk_module_add_library(WebAssemblyInterface ${WebAssemblyInterface_SRCS})

if(BUILD_ITK_WASM_IO_MODULES)

if(EMSCRIPTEN)
# -s WASM_ASYNC_COMPILATION=0
# -flto
  set(common_link_flags " -s ALLOW_MEMORY_GROWTH=1 -s FORCE_FILESYSTEM=1 -s MODULARIZE=1 -s WASM=1 -lnodefs.js -s EXIT_RUNTIME=0 -s INVOKE_RUN=1 --post-js ${CMAKE_CURRENT_SOURCE_DIR}/emscripten-module/itkJSPost.js")
  set(esm_link_flags " -s EXPORT_ES6=1 -s USE_ES6_IMPORT_META=0")
endif()

include(${CMAKE_CURRENT_SOURCE_DIR}/io/internal/pipelines/common/CompressStringify/BuildZstd.cmake)
add_subdirectory(io/internal/pipelines/common/CompressStringify)
add_subdirectory(io/internal/pipelines/image/ConvertImage)
add_subdirectory(io/internal/pipelines/image/ReadDICOM)
add_subdirectory(io/internal/pipelines/mesh/ConvertMesh)
add_subdirectory(io/internal/pipelines/mesh/MeshToPolyData)

endif() # BUILD_ITK_WASM_IO_MODULES
