cmake_minimum_required(VERSION 3.16)
project(ConvertMesh)

set(CMAKE_CXX_STANDARD 17)

if (NOT TARGET libzstd_static)
  include(${CMAKE_CURRENT_SOURCE_DIR}/../../common/CompressStringify/BuildZstd.cmake)
endif()

# This list should be ordered from approximately most commonly to least
# commonly used modules.
set(WebAssemblyInterface_MeshIOModules
  "ITKIOMeshBYU"
  "ITKIOMeshFreeSurfer"
  "ITKIOMeshOBJ"
  "ITKIOMeshOFF"
  "IOMeshSTL"
  "IOMeshSWC"
  "ITKIOMeshVTK"
  CACHE STRING
  "String delimited list of ITK mesh IO modules to support.")

set(meshios_ITKIOMeshBYU itkBYUMeshIO)
set(meshio_id_itkBYUMeshIO 0)

set(meshios_ITKIOMeshFreeSurfer itkFreeSurferAsciiMeshIO itkFreeSurferBinaryMeshIO)
set(meshio_id_itkFreeSurferAsciiMeshIO 1)
set(meshio_id_itkFreeSurferBinaryMeshIO 2)

set(meshios_ITKIOMeshVTK itkVTKPolyDataMeshIO)
set(meshio_id_itkVTKPolyDataMeshIO 3)

set(meshios_ITKIOMeshOBJ itkOBJMeshIO)
set(meshio_id_itkOBJMeshIO 4)

set(meshios_ITKIOMeshOFF itkOFFMeshIO)
set(meshio_id_itkOFFMeshIO 5)

set(meshios_IOMeshSTL itkSTLMeshIO)
set(meshio_id_itkSTLMeshIO 6)

set(meshios_IOMeshSWC itkSWCMeshIO)
set(meshio_id_itkSWCMeshIO 7)

set(meshios_WebAssemblyInterface itkWASMMeshIO itkWASMZstdMeshIO)
set(meshio_id_itkWASMMeshIO 8)
set(meshio_id_itkWASMZstdMeshIO 9)

set(ITK_NO_MESHIO_FACTORY_REGISTER_MANAGER 1)
set(MeshIOIndex_ARRAY "")
foreach(io_module ${WebAssemblyInterface_MeshIOModules} WebAssemblyInterface)
  if (DEFINED WebAssemblyInterface_INCLUDE_DIRS)
    if(${io_module} STREQUAL "WebAssemblyInterface")
      find_package(ITK REQUIRED COMPONENTS ITKIOMeshBase)
      include(${ITK_USE_FILE})
      include_directories(${WebAssemblyInterface_INCLUDE_DIRS})
      include_directories(${CMAKE_CURRENT_SOURCE_DIR})
      list(APPEND ITK_LIBRARIES ${WebAssemblyInterface_LIBRARIES})
    else()
      find_package(ITK REQUIRED COMPONENTS ${io_module} WebAssemblyInterface)
      include(${ITK_USE_FILE})
    endif()
  else()
    find_package(ITK REQUIRED COMPONENTS ${io_module} WebAssemblyInterface)
    include(${ITK_USE_FILE})
  endif()

  if(NOT DEFINED meshios_${io_module})
    message(FATAL_ERROR "Unknown MeshIOBase classes for module ${io_module}")
  endif()
  foreach(meshio ${meshios_${io_module}})
    string(SUBSTRING "${meshio}" 3 -1 ioname)
    set(read_binary "${ioname}ReadMesh")
    set(write_binary "${ioname}WriteMesh")
    set(MeshIOIndex_ARRAY "${MeshIOIndex_ARRAY}'${ioname}', ")
    set(extra_srcs)
    if(${meshio} STREQUAL "itkWASMZstdMeshIO")
      list(APPEND ITK_LIBRARIES libzstd_static)
      list(APPEND extra_srcs itkWASMZstdMeshIO.cxx)
    endif()

    add_executable(${read_binary} ReadMesh.cxx ${extra_srcs})
    target_link_libraries(${read_binary} PUBLIC ${ITK_LIBRARIES})
    target_compile_definitions(${read_binary} PUBLIC -DMESH_IO_CLASS=${meshio_id_${meshio}})
    add_executable(${write_binary} WriteMesh.cxx ${extra_srcs})
    target_link_libraries(${write_binary} PUBLIC ${ITK_LIBRARIES})
    target_compile_definitions(${write_binary} PUBLIC -DMESH_IO_CLASS=${meshio_id_${meshio}})
    if (EMSCRIPTEN AND DEFINED WebAssemblyInterface_BINARY_DIR)
      set(target_esm_read "${read_binary}")
      set(target_umd_read "${read_binary}.umd")
      set(target_esm_write "${write_binary}")
      set(target_umd_write "${write_binary}.umd")
      target_compile_definitions(${target_umd_read} PUBLIC -DMESH_IO_CLASS=${meshio_id_${meshio}})
      target_compile_definitions(${target_umd_write} PUBLIC -DMESH_IO_CLASS=${meshio_id_${meshio}})
      foreach(target ${target_esm_read} ${target_umd_read} ${target_esm_write} ${target_umd_write})
        set(exception_catching )
        set(meshio_common_link_flags " -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s SUPPORT_LONGJMP=1")
        get_property(link_flags TARGET ${target} PROPERTY LINK_FLAGS)
        set_property(TARGET ${target} APPEND_STRING PROPERTY LINK_FLAGS " ${meshio_common_link_flags} ${link_flags}")
        itk_module_target_label(${target})
        itk_module_target_export(${target})
        itk_module_target_install(${target})
        set_property(TARGET ${target}
          PROPERTY RUNTIME_OUTPUT_DIRECTORY
          ${WebAssemblyInterface_BINARY_DIR}/mesh-io
          )
      endforeach()
    elseif (WASI AND DEFINED WebAssemblyInterface_BINARY_DIR)
      foreach(target ${read_binary} ${write_binary})
        itk_module_target_label(${target})
        itk_module_target_export(${target})
        itk_module_target_install(${target})
        set_property(TARGET ${target}
          PROPERTY RUNTIME_OUTPUT_DIRECTORY
          ${WebAssemblyInterface_BINARY_DIR}/wasi-mesh-io
          )
      endforeach()
    endif()
  endforeach()
endforeach()
if(EMSCRIPTEN)
  configure_file(${CMAKE_CURRENT_SOURCE_DIR}/../../../MeshIOIndex.ts.in
    ${CMAKE_CURRENT_SOURCE_DIR}/../../../MeshIOIndex.ts @ONLY)
  configure_file(${CMAKE_CURRENT_SOURCE_DIR}/../../../MeshIOIndex.ts.in
    ${CMAKE_CURRENT_SOURCE_DIR}/../../../../../../dist/mesh-io/index.js @ONLY)
endif()
