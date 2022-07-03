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
#include "itkInputImageIO.h"

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
#include "itkWASMImageIOBase.h"
#include "itkImageIOBase.h"

template <typename TImageIO>
int writeImage(itk::wasm::InputImageIO & inputImageIO, const std::string & outputFileName, bool quiet, bool useCompression)
{
  using ImageIOType = TImageIO;

  auto imageIO = ImageIOType::New();

  if(!imageIO->CanWriteFile(outputFileName.c_str()))
  {
    if(!quiet)
    {
      std::cerr << "Could not write file: " << outputFileName << std::endl;
    }
    return EXIT_FAILURE;
  }

  imageIO->SetFileName(outputFileName);
  imageIO->SetUseCompression(useCompression);

  const itk::WASMImageIOBase * inputWASMImageIOBase = inputImageIO.Get();
  const itk::ImageIOBase * inputImageIOBase = inputWASMImageIOBase->GetImageIO();

  const unsigned int dimension = inputImageIOBase->GetNumberOfDimensions();
  imageIO->SetNumberOfDimensions(dimension);
  imageIO->SetComponentType(inputImageIOBase->GetComponentType());
  imageIO->SetNumberOfComponents(inputImageIOBase->GetNumberOfComponents());
  imageIO->SetPixelType(inputImageIOBase->GetPixelType());
  std::vector<double> direction(dimension);
  const auto directionContainer = inputWASMImageIOBase->GetDirectionContainer();
  for (unsigned int dim = 0; dim < dimension; ++dim)
  {
    for (unsigned int dd = 0; dd < dimension; ++dd)
    {
      direction[dd] = directionContainer->GetElement(dim*dimension + dd);
    }
    imageIO->SetDirection(dim, direction);
    imageIO->SetOrigin(dim, inputImageIOBase->GetOrigin(dim));
    imageIO->SetSpacing(dim, inputImageIOBase->GetSpacing(dim));
    imageIO->SetDimensions(dim, inputImageIOBase->GetDimensions(dim));
  };
  itk::ImageIORegion ioRegion( dimension );
  for(unsigned int dim = 0; dim < dimension; ++dim)
    {
    ioRegion.SetSize(dim, inputImageIOBase->GetDimensions( dim ));
    }
  imageIO->SetIORegion( ioRegion );

  imageIO->WriteImageInformation();
  imageIO->Write( reinterpret_cast< const void * >( &(inputWASMImageIOBase->GetPixelDataContainer()->at(0)) ));

  return EXIT_SUCCESS;
}

int main (int argc, char * argv[])
{
  itk::wasm::Pipeline pipeline("Read an image file format and convert it to the itk-wasm file format", argc, argv);

  itk::wasm::InputImageIO inputImageIO;
  pipeline.add_option("InputImage", inputImageIO, "Input image")->required();

  std::string outputFileName;
  pipeline.add_option("OutputImage", outputFileName, "Output image")->required();

  bool quiet = false;
  pipeline.add_flag("-q,--quiet", quiet, "Less verbose output");
  
  bool useCompression = false;
  pipeline.add_flag("-c,--use-compression", quiet, "Use compression in the written file");
  
  ITK_WASM_PARSE(pipeline);

#if IMAGE_IO_CLASS == 0
  return writeImage<itk::PNGImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 1
  return writeImage<itk::MetaImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 2
  return writeImage<itk::TIFFImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 3
  return writeImage<itk::NiftiImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 4
  return writeImage<itk::JPEGImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 5
  return writeImage<itk::NrrdImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 6
  return writeImage<itk::VTKImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 7
  return writeImage<itk::BMPImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 8
  return writeImage<itk::HDF5ImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 9
  return writeImage<itk::MINCImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 10
  return writeImage<itk::MRCImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 11
  return writeImage<itk::LSMImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 12
  return writeImage<itk::MGHImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 13
  return writeImage<itk::BioRadImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 14
  return writeImage<itk::GiplImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 15
  return writeImage<itk::GE4ImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 16
  return writeImage<itk::GE5ImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 17
  return writeImage<itk::GEAdwImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 18
  return writeImage<itk::GDCMImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 19
  return writeImage<itk::ScancoImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 20
  return writeImage<itk::FDFImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 21
  return writeImage<itk::WASMImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#elif IMAGE_IO_CLASS == 22
  return writeImage<itk::WASMZstdImageIO>(inputImageIO, outputFileName, quiet, useCompression);
#else
#error "Unsupported IMAGE_IO_CLASS"
#endif
  return EXIT_SUCCESS;
}