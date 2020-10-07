cmake_minimum_required(VERSION 3.10)
project(Downsample)

set(io_components ITKImageIO)
if(EMSCRIPTEN)
  set(io_components BridgeJavaScript)
endif()
find_package(ITK REQUIRED
  COMPONENTS ${io_components}
    ITKImageGrid
  )
include(${ITK_USE_FILE})

add_executable(Downsample Downsample.cxx)
target_link_libraries(Downsample ${ITK_LIBRARIES})

enable_testing()
add_test(NAME DownsampleTest
  COMMAND Downsample ${CMAKE_CURRENT_SOURCE_DIR}/cthead1.png
  ${CMAKE_CURRENT_BINARY_DIR}/cthead1.shrink.png
  2
  2
  2
  )
