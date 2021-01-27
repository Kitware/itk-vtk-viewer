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
#if defined(__EMSCRIPTEN__)
#include "itkJSONImageIO.h"
#endif
#include "itkBinShrinkImageFilter.h"
#include "itkVectorImage.h"
#include "itkResampleImageFilter.h"
#include "itkLabelImageGaussianInterpolateImageFunction.h"
#include "itkImageRegionSplitterSlowDimension.h"
#include "itkExtractImageFilter.h"
#include <fstream>

template < typename TImage >
int
Downsample( char * argv [] )
{
  using ImageType = TImage;
  unsigned int isLabelImage = atoi( argv[1] );
  const char * inputImageFile = argv[2];
  const char * outputImageFile = argv[3];
  unsigned int factorI = atoi( argv[4] );
  unsigned int factorJ = atoi( argv[5] );
  unsigned int factorK = atoi( argv[6] );
  unsigned int maxTotalSplits = atoi( argv[7] );
  unsigned int split = atoi( argv[8] );
  const char * numberOfSplitsFile = argv[9];

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
  writer->SetFileName( outputImageFile );

  using ResampleFilterType = itk::ResampleImageFilter< ImageType, ImageType >;
  auto resampleFilter = ResampleFilterType::New();
  resampleFilter->SetInput( reader->GetOutput() );

  filter->UpdateOutputInformation();
  using ROIFilterType = itk::ExtractImageFilter< ImageType, ImageType >;
  auto roiFilter = ROIFilterType::New();
  using RegionType = typename ImageType::RegionType;
  const RegionType largestRegion( filter->GetOutput()->GetLargestPossibleRegion() );

  using SplitterType = itk::ImageRegionSplitterSlowDimension;
  auto splitter = SplitterType::New();
  const unsigned int numberOfSplits = splitter->GetNumberOfSplits( largestRegion, maxTotalSplits );

  std::ofstream ostream(numberOfSplitsFile);
  ostream << numberOfSplits;
  ostream.close();

  if (split >= numberOfSplits)
  {
    //std::cerr << "Error: requested split: " << split << " is outside the number of splits: " << numberOfSplits << std::endl;
    split = 0;
    //return EXIT_FAILURE;
  }

  RegionType requestedRegion( largestRegion );
  splitter->GetSplit( split, numberOfSplits, requestedRegion );
  roiFilter->SetExtractionRegion( requestedRegion );
  writer->SetInput( roiFilter->GetOutput() );

  if (isLabelImage) {
    roiFilter->SetInput( resampleFilter->GetOutput() );
    const ImageType * shrunk = filter->GetOutput();
    resampleFilter->SetSize( shrunk->GetLargestPossibleRegion().GetSize() );
    resampleFilter->SetOutputOrigin( shrunk->GetOrigin() );
    auto spacing = shrunk->GetSpacing();
    resampleFilter->SetOutputSpacing( spacing );
    resampleFilter->SetOutputDirection( shrunk->GetDirection() );
    using CoordRepType = double;
    using InterpolatorType = itk::LabelImageGaussianInterpolateImageFunction< ImageType, CoordRepType >;
    auto interpolator = InterpolatorType::New();
    double sigma[ImageType::ImageDimension];
    double sigmaMax = 0.0;
    for (unsigned int dim = 0; dim < ImageType::ImageDimension; ++dim ) {
      sigma[dim] = spacing[dim] * 0.7355;
      if (sigma[dim] > sigmaMax) {
        sigmaMax = sigma[dim];
      }
    }
    interpolator->SetSigma( sigma );
    interpolator->SetAlpha( sigmaMax * 2.5 );
    resampleFilter->SetInterpolator( interpolator );
  }
  else {
    roiFilter->SetInput( filter->GetOutput() );
  }


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
  if( argc < 10 )
    {
    std::cerr << "Usage: " << argv[0] << " <isLabelImage> <inputImage> <outputImage> <factorI> <factorJ> <factorK> <maxTotalSplits> <split> <numberOfSplitsFile>" << std::endl;
    return EXIT_FAILURE;
    }
  const char * inputImageFile = argv[2];

#if defined(__EMSCRIPTEN__)
  itk::JSONImageIO::Pointer imageIO = itk::JSONImageIO::New();
#else
  itk::ImageIOBase::Pointer imageIO = itk::ImageIOFactory::CreateImageIO( inputImageFile, itk::CommonEnums::IOFileMode::ReadMode);
#endif
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
