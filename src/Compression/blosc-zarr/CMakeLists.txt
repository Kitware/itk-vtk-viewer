cmake_minimum_required(VERSION 3.16.0)
project(blosc-zarr)

set(BUILD_STATIC ON CACHE BOOL "Build a static version of the blosc library.")
set(BUILD_SHARED OFF CACHE BOOL "Build a shared library version of the blosc library.")
set(BUILD_TESTS OFF CACHE BOOL "Build test programs form the blosc compression library")
set(BUILD_BENCHMARKS OFF CACHE BOOL "Build benchmark programs form the blosc compression library")
if(EMSCRIPTEN OR WASI)
  set(HAVE_THREADS OFF CACHE BOOL "Whether we use threading")
endif()
add_subdirectory(c-blosc)

find_package(ITK REQUIRED
  COMPONENTS WebAssemblyInterface
  )
include(${ITK_USE_FILE})

add_executable(BloscZarr BloscZarr.cxx)
target_link_libraries(BloscZarr PUBLIC blosc_static ${ITK_LIBRARIES})
