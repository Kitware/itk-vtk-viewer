cmake_minimum_required(VERSION 3.16)
project(MeshToPolyData)

set(CMAKE_CXX_STANDARD 17)

find_package(ITK REQUIRED
  COMPONENTS
    WebAssemblyInterface
    MeshToPolyData
    )
include(${ITK_USE_FILE})

add_executable(MeshToPolyData MeshToPolyData.cxx)
target_link_libraries(MeshToPolyData PUBLIC ${ITK_LIBRARIES})

add_executable(PolyDataToMesh PolyDataToMesh.cxx)
target_link_libraries(PolyDataToMesh PUBLIC ${ITK_LIBRARIES})

if (EMSCRIPTEN AND DEFINED WebAssemblyInterface_BINARY_DIR)
  foreach(target MeshToPolyData MeshToPolyData.umd PolyDataToMesh PolyDataToMesh.umd)
    itk_module_target_label(${target})
    itk_module_target_export(${target})
    itk_module_target_install(${target})
    set_property(TARGET ${target}
      PROPERTY RUNTIME_OUTPUT_DIRECTORY
      ${WebAssemblyInterface_BINARY_DIR}/mesh-io
      )
  endforeach()
endif()
if (WASI AND DEFINED WebAssemblyInterface_BINARY_DIR)
  foreach(target MeshToPolyData PolyDataToMesh)
    itk_module_target_label(${target})
    itk_module_target_export(${target})
    itk_module_target_install(${target})
    set_property(TARGET ${target}
      PROPERTY RUNTIME_OUTPUT_DIRECTORY
      ${WebAssemblyInterface_BINARY_DIR}/wasi-mesh-io
      )
  endforeach()
endif()
