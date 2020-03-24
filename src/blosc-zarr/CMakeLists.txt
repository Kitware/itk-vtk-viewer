cmake_minimum_required(VERSION 3.12.0)
project(blosc-zarr)

set(BUILD_STATIC ON CACHE BOOL "Build a static version of the blosc library.")
set(BUILD_SHARED OFF CACHE BOOL "Build a shared library version of the blosc library.")
set(BUILD_TESTS OFF CACHE BOOL "Build test programs form the blosc compression library")
set(BUILD_BENCHMARKS OFF CACHE BOOL "Build benchmark programs form the blosc compression library")
if(EMSCRIPTEN)
  set(HAVE_THREADS OFF CACHE BOOL "Whether we use threading")
endif()
add_subdirectory(c-blosc)

add_executable(BloscZarr BloscZarr.c)
target_link_libraries(BloscZarr blosc_static)
