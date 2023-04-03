cmake_minimum_required(VERSION 3.16)
project(compare)

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
    GenericLabelInterpolator
    ITKImageCompare
  )
include(${ITK_USE_FILE})

add_executable(compare compare.cxx)
target_link_libraries(compare PUBLIC ${ITK_LIBRARIES})

