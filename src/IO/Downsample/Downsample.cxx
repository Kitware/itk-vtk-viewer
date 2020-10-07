/*=========================================================================
 *
 *  Copyright NumFOCUS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0.txt
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *=========================================================================*/
#include "itkImageFileReader.h"
#include "itkImageFileWriter.h"
#include "itkJSONImageIO.h"
#include "itkBinShrinkImageFilter.h"
#include "itkVectorImage.h"

template < typename TImage >
int
Downsample( char * argv [] )
{
  using ImageType = TImage;
  const char * inputImageFile = argv[1];
  const char * outputImageFile = argv[2];
  unsigned int factorI = atoi( argv[3] );
  unsigned int factorJ = atoi( argv[4] );
  unsigned int factorK = atoi( argv[5] );

  using ReaderType = itk::ImageFileReader< ImageType >;
  auto reader = ReaderType::New();
  reader->SetFileName( inputImageFile );

  using FilterType = itk::BinShrinkImageFilter< ImageType, ImageType >;
  auto filter = FilterType::New();
  filter->SetInput( reader->GetOutput() );
  filter->SetShrinkFactor( 0, factorI );
  filter->SetShrinkFactor( 1, factorJ );
  if (ImageType::ImageDimension > 2) {
    filter->SetShrinkFactor( 2, factorK );
  }

  using WriterType = itk::ImageFileWriter< ImageType >;
  auto writer = WriterType::New();
  writer->SetInput( filter->GetOutput() );
  writer->SetFileName( outputImageFile );

  try
  {
    writer->Update();
  }
  catch( std::exception & error )
  {
    std::cerr << "Error: " << error.what() << std::endl;
    return EXIT_FAILURE;
  }

  return EXIT_SUCCESS;
}


template <unsigned int VDimension>
int
ComponentDownsample( const itk::IOComponentEnum componentType, char * argv[] )
{
  switch (componentType)
  {
    case itk::IOComponentEnum::UCHAR:
    {
      using PixelType = unsigned char;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::CHAR:
    {
      using PixelType = char;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::USHORT:
    {
      using PixelType = unsigned short;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::SHORT:
    {
      using PixelType = short;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::UINT:
    {
      using PixelType = unsigned int;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::INT:
    {
      using PixelType = int;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    //case itk::IOComponentEnum::ULONG:
    //{
      //using PixelType = unsigned long;
      //using ImageType = itk::Image<PixelType, VDimension>;
      //return Downsample<ImageType>( argv );
    //}

    //case itk::IOComponentEnum::LONG:
    //{
      //using PixelType = long;
      //using ImageType = itk::Image<PixelType, VDimension>;
      //return Downsample<ImageType>( argv );
    //}

    case itk::IOComponentEnum::FLOAT:
    {
      using PixelType = float;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::DOUBLE:
    {
      using PixelType = double;
      using ImageType = itk::Image<PixelType, VDimension>;
      return Downsample<ImageType>( argv );
    }

    case itk::IOComponentEnum::UNKNOWNCOMPONENTTYPE:
    default:
      std::cerr << "Unknown and unsupported component type: " << componentType << std::endl;
      return EXIT_FAILURE;

  }
  return EXIT_SUCCESS;
}


int main( int argc, char * argv[] )
{
  if( argc < 6 )
    {
    std::cerr << "Usage: " << argv[0] << " <inputImage> <outputImage> <factorI> <factorJ> <factorK>" << std::endl;
    return EXIT_FAILURE;
    }
  const char * inputImageFile = argv[1];

  itk::JSONImageIO::Pointer imageIO = itk::JSONImageIO::New();
  imageIO->SetFileName( inputImageFile );
  imageIO->ReadImageInformation();

  using IOComponentType = itk::IOComponentEnum;
  const IOComponentType componentType = imageIO->GetComponentType();

  const unsigned int imageDimension = imageIO->GetNumberOfDimensions();

  switch (imageDimension)
  {
  case 2:
    {
    return ComponentDownsample<2>( componentType,  argv );
    }
  case 3:
    {
    return ComponentDownsample<3>( componentType,  argv );
    }
  default:
    std::cerr << "Dimension not implemented!" << std::endl;
    return EXIT_FAILURE;
  }

  return EXIT_SUCCESS;
}
