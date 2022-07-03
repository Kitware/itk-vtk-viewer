include(FetchContent)
option(ZSTD_BUILD_CONTRIB "BUILD_CONTRIB" OFF)
option(ZSTD_BUILD_PROGRAMS "BUILD_PROGRAMS" OFF)
option(ZSTD_BUILD_SHARED "BUILD_SHARED" OFF)
option(ZSTD_BUILD_STATIC "BUILD_STATIC" ON)
option(ZSTD_BUILD_TESTS "BUILD_TESTS" OFF)
option(ZSTD_BUILD_LEGACY_SUPPORT "BUILD_LEGACY_SUPPORT" OFF)
option(ZSTD_MULTITHREAD_SUPPORT "BUILD_MULTITHREAD_SUPPORT" OFF)
option(ZSTD_BUILD_PROGRAMS_LINK_SHARED "BUILD_PROGRAMS_LINK_SHARED" OFF)
option(ZSTD_BUILD_LZ4 "BUILD_LZ4" OFF)
option(ZSTD_BUILD_LZMA "BUILD_LZMA" OFF)
option(ZSTD_BUILD_ZLIB "BUILD_ZLIB" OFF)
set(zstd_GIT_REPOSITORY "https://github.com/facebook/zstd.git")
# v1.5.2
set(zstd_GIT_TAG c9c7be85f49f45a581ec00c309afda5c62ba9ef2)
FetchContent_Declare(
  zstd_lib
  GIT_REPOSITORY ${zstd_GIT_REPOSITORY}
  GIT_TAG        ${zstd_GIT_TAG}
)

FetchContent_MakeAvailable(zstd_lib)
set(zstd_lib_INCLUDE_DIR "${zstd_lib_SOURCE_DIR}/lib")
include_directories(${zstd_lib_INCLUDE_DIR})
add_subdirectory("${zstd_lib_SOURCE_DIR}/build/cmake" "${zstd_lib_BINARY_DIR}")