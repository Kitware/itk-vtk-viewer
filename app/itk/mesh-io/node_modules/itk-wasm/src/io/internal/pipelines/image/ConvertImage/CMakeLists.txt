cmake_minimum_required(VERSION 3.16)
project(ConvertImage)

set(CMAKE_CXX_STANDARD 17)

if (NOT TARGET libzstd_static)
  include(${CMAKE_CURRENT_SOURCE_DIR}/../../common/CompressStringify/BuildZstd.cmake)
endif()

if(WASI)
  set(WebAssemblyInterface_ImageIOModules
    "ITKIOPNG"
    "ITKIOMeta"
    "ITKIOTIFF"
    "ITKIONIFTI"
    "ITKIOJPEG"
    "ITKIONRRD"
    "ITKIOVTK"
    "ITKIOBMP"
    "ITKIOMRC"
    "ITKIOLSM"
    "MGHIO"
    "ITKIOBioRad"
    "ITKIOGIPL"
    "ITKIOGE"
    "ITKIOGDCM"
    "IOScanco"
    "IOFDF"
    CACHE STRING
    "String delimited list of ITK image IO modules to support.")
else()
  # This list should be ordered from approximately most commonly to least
  # commonly used modules.
  set(WebAssemblyInterface_ImageIOModules
    "ITKIOPNG"
    "ITKIOMeta"
    "ITKIOTIFF"
    "ITKIONIFTI"
    "ITKIOJPEG"
    "ITKIONRRD"
    "ITKIOVTK"
    "ITKIOBMP"
    "ITKIOHDF5"
    "ITKIOMINC"
    "ITKIOMRC"
    "ITKIOLSM"
    "MGHIO"
    "ITKIOBioRad"
    "ITKIOGIPL"
    "ITKIOGE"
    "ITKIOGDCM"
    "IOScanco"
    "IOFDF"
    CACHE STRING
    "String delimited list of ITK image IO modules to support.")
endif()
set(imageios_ITKIOPNG itkPNGImageIO)
set(imageio_id_itkPNGImageIO 0)

set(imageios_ITKIOMeta itkMetaImageIO)
set(imageio_id_itkMetaImageIO 1)

set(imageios_ITKIOTIFF itkTIFFImageIO)
set(imageio_id_itkTIFFImageIO 2)

set(imageios_ITKIONIFTI itkNiftiImageIO)
set(imageio_id_itkNiftiImageIO 3)

set(imageios_ITKIOJPEG itkJPEGImageIO)
set(imageio_id_itkJPEGImageIO 4)

set(imageios_ITKIONRRD itkNrrdImageIO)
set(imageio_id_itkNrrdImageIO 5)

set(imageios_ITKIOVTK itkVTKImageIO)
set(imageio_id_itkVTKImageIO 6)

set(imageios_ITKIOBMP itkBMPImageIO)
set(imageio_id_itkBMPImageIO 7)

set(imageios_ITKIOHDF5 itkHDF5ImageIO)
set(imageio_id_itkHDF5ImageIO 8)

set(imageios_ITKIOMINC itkMINCImageIO)
set(imageio_id_itkMINCImageIO 9)

set(imageios_ITKIOMRC itkMRCImageIO)
set(imageio_id_itkMRCImageIO 10)

set(imageios_ITKIOLSM itkLSMImageIO)
set(imageio_id_itkLSMImageIO 11)

set(imageios_MGHIO itkMGHImageIO)
set(imageio_id_itkMGHImageIO 12)

set(imageios_ITKIOBioRad itkBioRadImageIO)
set(imageio_id_itkBioRadImageIO 13)

set(imageios_ITKIOGIPL itkGiplImageIO)
set(imageio_id_itkGiplImageIO 14)

set(imageios_ITKIOGE itkGEAdwImageIO itkGE4ImageIO itkGE5ImageIO)
set(imageio_id_itkGE4ImageIO 15)
set(imageio_id_itkGE5ImageIO 16)
set(imageio_id_itkGEAdwImageIO 17)

set(imageios_ITKIOGDCM itkGDCMImageIO)
set(imageio_id_itkGDCMImageIO 18)

set(imageios_IOScanco itkScancoImageIO)
set(imageio_id_itkScancoImageIO 19)

set(imageios_IOFDF itkFDFImageIO)
set(imageio_id_itkFDFImageIO 20)

set(imageios_WebAssemblyInterface itkWASMImageIO itkWASMZstdImageIO)
set(imageio_id_itkWASMImageIO 21)
set(imageio_id_itkWASMZstdImageIO 22)

set(ITK_NO_IMAGEIO_FACTORY_REGISTER_MANAGER 1)
set(ImageIOIndex_ARRAY "")
foreach(io_module ${WebAssemblyInterface_ImageIOModules} WebAssemblyInterface)
  if (DEFINED WebAssemblyInterface_INCLUDE_DIRS)
    if(${io_module} STREQUAL "WebAssemblyInterface")
      find_package(ITK REQUIRED COMPONENTS ITKIOImageBase)
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

  if(NOT DEFINED imageios_${io_module})
    message(FATAL_ERROR "Unknown ImageIOBase classes for module ${io_module}")
  endif()
  foreach(imageio ${imageios_${io_module}})
    string(SUBSTRING "${imageio}" 3 -1 ioname)
    set(read_binary "${ioname}ReadImage")
    set(write_binary "${ioname}WriteImage")
    set(ImageIOIndex_ARRAY "${ImageIOIndex_ARRAY}'${ioname}', ")
    set(extra_srcs)
    if(${imageio} STREQUAL "itkWASMZstdImageIO")
      list(APPEND ITK_LIBRARIES libzstd_static)
      list(APPEND extra_srcs itkWASMZstdImageIO.cxx)
    endif()

    add_executable(${read_binary} ReadImage.cxx ${extra_srcs})
    target_link_libraries(${read_binary} PUBLIC ${ITK_LIBRARIES})
    target_compile_definitions(${read_binary} PUBLIC -DIMAGE_IO_CLASS=${imageio_id_${imageio}})
    add_executable(${write_binary} WriteImage.cxx ${extra_srcs})
    target_link_libraries(${write_binary} PUBLIC ${ITK_LIBRARIES})
    target_compile_definitions(${write_binary} PUBLIC -DIMAGE_IO_CLASS=${imageio_id_${imageio}})
    if (EMSCRIPTEN AND DEFINED WebAssemblyInterface_BINARY_DIR)
      set(target_esm_read "${read_binary}")
      set(target_umd_read "${read_binary}.umd")
      set(target_esm_write "${write_binary}")
      set(target_umd_write "${write_binary}.umd")
      target_compile_definitions(${target_umd_read} PUBLIC -DIMAGE_IO_CLASS=${imageio_id_${imageio}})
      target_compile_definitions(${target_umd_write} PUBLIC -DIMAGE_IO_CLASS=${imageio_id_${imageio}})
      foreach(target ${target_esm_read} ${target_umd_read} ${target_esm_write} ${target_umd_write})
        set(exception_catching )
        if(${io_module} STREQUAL "ITKIOGE")
          set(exception_catching " -s DISABLE_EXCEPTION_CATCHING=0") 
        endif()
        set(imageio_common_link_flags " -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s SUPPORT_LONGJMP=1")
        get_property(link_flags TARGET ${target} PROPERTY LINK_FLAGS)
        set_property(TARGET ${target} APPEND_STRING PROPERTY LINK_FLAGS " ${imageio_common_link_flags} ${link_flags}")
        itk_module_target_label(${target})
        itk_module_target_export(${target})
        itk_module_target_install(${target})
        set_property(TARGET ${target}
          PROPERTY RUNTIME_OUTPUT_DIRECTORY
          ${WebAssemblyInterface_BINARY_DIR}/image-io
          )
      endforeach()
    elseif (WASI AND DEFINED WebAssemblyInterface_BINARY_DIR)
      foreach(target ${read_binary} ${write_binary})
        set(exception_catching )
        itk_module_target_label(${target})
        itk_module_target_export(${target})
        itk_module_target_install(${target})
        set_property(TARGET ${target}
          PROPERTY RUNTIME_OUTPUT_DIRECTORY
          ${WebAssemblyInterface_BINARY_DIR}/wasi-image-io
          )
      endforeach()
    endif()
  endforeach()
endforeach()
if(EMSCRIPTEN)
  configure_file(${CMAKE_CURRENT_SOURCE_DIR}/../../../ImageIOIndex.ts.in
    ${CMAKE_CURRENT_SOURCE_DIR}/../../../ImageIOIndex.ts @ONLY)
  configure_file(${CMAKE_CURRENT_SOURCE_DIR}/../../../ImageIOIndex.ts.in
    ${CMAKE_CURRENT_SOURCE_DIR}/../../../../../../dist/image-io/index.js @ONLY)
endif()
