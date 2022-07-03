cmake_minimum_required(VERSION 3.16)
project(CompressStringify)

set(CMAKE_CXX_STANDARD 17)

include(FetchContent)
if (NOT TARGET libzstd_static)
  include(${CMAKE_CURRENT_SOURCE_DIR}/BuildZstd.cmake)
endif()

set(cpp_base64_GIT_REPOSITORY "https://github.com/thewtex/cpp-base64.git")
set(cpp_base64_GET_TAG 9144cd53be930b37235ae552a92b5d2aa51e9325)
FetchContent_Declare(
  cpp_base64
  GIT_REPOSITORY ${cpp_base64_GIT_REPOSITORY}
  GIT_TAG        ${cpp_base64_GIT_TAG}
)

FetchContent_MakeAvailable(cpp_base64)

find_package(ITK REQUIRED COMPONENTS WebAssemblyInterface)

add_executable(CompressStringify CompressStringify.cxx)
target_include_directories(CompressStringify PUBLIC ${CMAKE_CURRENT_SOURCE_DIR} ${zstd_lib_INCLUDE_DIR})
target_link_libraries(CompressStringify PUBLIC libzstd_static cpp-base64 ${ITK_LIBRARIES})

add_executable(ParseStringDecompress ParseStringDecompress.cxx)
target_include_directories(ParseStringDecompress PUBLIC ${CMAKE_CURRENT_SOURCE_DIR} ${zstd_lib_INCLUDE_DIR})
target_link_libraries(ParseStringDecompress PUBLIC libzstd_static cpp-base64 ${ITK_LIBRARIES})

if (DEFINED WebAssemblyInterface_SOURCE_DIR AND EMSCRIPTEN)
  foreach(target CompressStringify CompressStringify.umd ParseStringDecompress ParseStringDecompress.umd)
    itk_module_target_label(${target})
    itk_module_target_export(${target})
    itk_module_target_install(${target})
    set_property(TARGET ${target}
      PROPERTY RUNTIME_OUTPUT_DIRECTORY
      ${WebAssemblyInterface_BINARY_DIR}/image-io
      )
  endforeach()
endif()
if (DEFINED WebAssemblyInterface_SOURCE_DIR AND WASI)
  foreach(target CompressStringify ParseStringDecompress)
    itk_module_target_label(${target})
    itk_module_target_export(${target})
    itk_module_target_install(${target})
    set_property(TARGET ${target}
      PROPERTY RUNTIME_OUTPUT_DIRECTORY
      ${WebAssemblyInterface_BINARY_DIR}/wasi-image-io
      )
  endforeach()
endif()
