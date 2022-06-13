cmake_minimum_required(VERSION 3.16)
project(Downsample)

set(CMAKE_CXX_STANDARD 17)

set(io_components)
if (NOT EMSCRIPTEN AND NOT WASI)
  set(io_components
    ITKIOPNG
    ITKIOMeta
    ITKIONRRD
    )
endif()
find_package(ITK REQUIRED
  COMPONENTS
    ${io_components}
    WebAssemblyInterface
    ITKImageGrid
    ITKImageFunction
  )
include(${ITK_USE_FILE})

add_executable(Downsample Downsample.cxx)
target_link_libraries(Downsample PUBLIC ${ITK_LIBRARIES})

add_executable(DownsampleLabelImage DownsampleLabelImage.cxx)
target_link_libraries(DownsampleLabelImage PUBLIC ${ITK_LIBRARIES})

enable_testing()
add_test(NAME DownsampleTest
  COMMAND Downsample
    ${CMAKE_CURRENT_SOURCE_DIR}/cthead1.png
    ${CMAKE_CURRENT_BINARY_DIR}/cthead1.shrink.png
    2,2
  )

add_test(NAME DownsampleTestLabelImage
  COMMAND DownsampleLabelImage
    ${CMAKE_CURRENT_SOURCE_DIR}/cthead1-bin.png
    ${CMAKE_CURRENT_BINARY_DIR}/cthead1Label.shrink.png
    2,2
  )
