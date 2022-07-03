/*=========================================================================
 *
 *  Copyright NumFOCUS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         https://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/
#include "itkCommonEnums.h"
#include "itkImageIOBase.h"
#include "itkImage.h"
#include "itkOutputImageIO.h"

#ifndef IMAGE_IO_CLASS
#error "IMAGE_IO_CLASS definition must be provided"
#endif

#if IMAGE_IO_CLASS == 0
#include "itkPNGImageIO.h"
#elif IMAGE_IO_CLASS == 1
#include "itkMetaImageIO.h"
#elif IMAGE_IO_CLASS == 2
#include "itkTIFFImageIO.h"
#elif IMAGE_IO_CLASS == 3
#include "itkNiftiImageIO.h"
#elif IMAGE_IO_CLASS == 4
#include "itkJPEGImageIO.h"
#elif IMAGE_IO_CLASS == 5
#include "itkNrrdImageIO.h"
#elif IMAGE_IO_CLASS == 6
#include "itkVTKImageIO.h"
#elif IMAGE_IO_CLASS == 7
#include "itkBMPImageIO.h"
#elif IMAGE_IO_CLASS == 8
#include "itkHDF5ImageIO.h"
#elif IMAGE_IO_CLASS == 9
#include "itkMINCImageIO.h"
#elif IMAGE_IO_CLASS == 10
#include "itkMRCImageIO.h"
#elif IMAGE_IO_CLASS == 11
#include "itkLSMImageIO.h"
#elif IMAGE_IO_CLASS == 12
#include "itkMGHImageIO.h"
#elif IMAGE_IO_CLASS == 13
#include "itkBioRadImageIO.h"
#elif IMAGE_IO_CLASS == 14
#include "itkGiplImageIO.h"
#elif IMAGE_IO_CLASS == 15
#include "itkGE4ImageIO.h"
#elif IMAGE_IO_CLASS == 16
#include "itkGE5ImageIO.h"
#elif IMAGE_IO_CLASS == 17
#include "itkGEAdwImageIO.h"
#elif IMAGE_IO_CLASS == 18
#include "itkGDCMImageIO.h"
#elif IMAGE_IO_CLASS == 19
#include "itkScancoImageIO.h"
#elif IMAGE_IO_CLASS == 20
#include "itkFDFImageIO.h"
#elif IMAGE_IO_CLASS == 21
#elif IMAGE_IO_CLASS == 22
#include "itkWASMZstdImageIO.h"
#else
#error "Unsupported IMAGE_IO_CLASS"
#endif
#include "itkWASMImageIO.h"

#include "itkPipeline.h"
#include "itkOutputImage.h"

template <typename TImageIO>
int readImage(const std::string & inputFileName, itk::wasm::OutputImageIO & outputImageIO, bool quiet)
{
  using ImageIOType = TImageIO;

  auto imageIO = ImageIOType::New();

  if(!imageIO->CanReadFile(inputFileName.c_str()))
  {
    if(!quiet)
    {
      std::cerr << "Could not read file: " << inputFileName << std::endl;
    }
    return EXIT_FAILURE;
  }

  imageIO->SetFileName(inputFileName);
  outputImageIO.Set(imageIO);

  return EXIT_SUCCESS;
}

int main (int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Read an image file format and convert it to the itk-wasm file format", argc, argv);

  std::string inputFileName;
  pipeline.add_option("InputImage", inputFileName, "Input image")->required()->check(CLI::ExistingFile);

  itk::wasm::OutputImageIO outputImageIO;
  pipeline.add_option("OutputImage", outputImageIO, "Output image")->required();

  bool quiet = false;
  pipeline.add_flag("-q,--quiet", quiet, "Less verbose output");
  
  ITK_WASM_PARSE(pipeline);

#if IMAGE_IO_CLASS == 0
  return readImage<itk::PNGImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 1
  return readImage<itk::MetaImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 2
  return readImage<itk::TIFFImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 3
  return readImage<itk::NiftiImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 4
  return readImage<itk::JPEGImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 5
  return readImage<itk::NrrdImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 6
  return readImage<itk::VTKImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 7
  return readImage<itk::BMPImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 8
  return readImage<itk::HDF5ImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 9
  return readImage<itk::MINCImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 10
  return readImage<itk::MRCImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 11
  return readImage<itk::LSMImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 12
  return readImage<itk::MGHImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 13
  return readImage<itk::BioRadImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 14
  return readImage<itk::GiplImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 15
  return readImage<itk::GE4ImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 16
  return readImage<itk::GE5ImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 17
  return readImage<itk::GEAdwImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 18
  return readImage<itk::GDCMImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 19
  return readImage<itk::ScancoImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 20
  return readImage<itk::FDFImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 21
  return readImage<itk::WASMImageIO>(inputFileName, outputImageIO, quiet);
#elif IMAGE_IO_CLASS == 22
  return readImage<itk::WASMZstdImageIO>(inputFileName, outputImageIO, quiet);
#else
#error "Unsupported IMAGE_IO_CLASS"
#endif
  return EXIT_SUCCESS;
}