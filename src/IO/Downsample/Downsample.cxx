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
#include "itkBinShrinkImageFilter.h"
#include "itkVectorImage.h"
#include "itkResampleImageFilter.h"
#include "itkLabelImageGaussianInterpolateImageFunction.h"
#include "itkImageRegionSplitterSlowDimension.h"
#include "itkExtractImageFilter.h"
#include "itkRGBPixel.h"
#include "itkRGBAPixel.h"
#include "itkVectorImage.h"
#include "itkOffset.h"
#include "itkVector.h"
#include "itkPoint.h"
#include "itkCovariantVector.h"
#include "itkSymmetricSecondRankTensor.h"
#include "itkDiffusionTensor3D.h"
#include <complex>
#include "itkFixedArray.h"
#include "itkArray.h"
#include "itkMatrix.h"
#include "itkVariableLengthVector.h"
#include "itkVariableSizeMatrix.h"
#include <fstream>
#include "itkPipeline.h"
#include "itkInputImage.h"
#include "itkOutputImage.h"
#include "itkSupportInputImageTypes.h"
#include "itkOutputTextStream.h"


template<typename TImage>
int
Downsample(itk::wasm::Pipeline & pipeline, itk::wasm::InputImage<TImage> & inputImage)
{
  using ImageType = TImage;

  pipeline.get_option("InputImage")->required();

  using OutputImageType = itk::wasm::OutputImage<ImageType>;
  OutputImageType outputImage;
  pipeline.add_option("OutputImage", outputImage, "Output image")->required();

  std::vector<unsigned int> factors;
  pipeline.add_option("DownsampleFactors", factors, "Downsampling factors for each direction")->expected(2, 3)->delimiter(',');

  unsigned int maxTotalSplits = 1;
  pipeline.add_option("-m,--max-total-splits", maxTotalSplits, "Maximum total splits when processed in parallel");

  unsigned int split = 0;
  pipeline.add_option("-s,--split", split, "Current processed split");

  itk::wasm::OutputTextStream numberOfSplitsStream;
  auto numberOfSplitsStreamOption = pipeline.add_option("--number-of-splits", numberOfSplitsStream, "Number of splits");

  ITK_WASM_PARSE(pipeline);

  using FilterType = itk::BinShrinkImageFilter< ImageType, ImageType >;
  auto filter = FilterType::New();
  filter->SetInput( inputImage.Get() );
  filter->SetShrinkFactor( 0, factors[0] );
  filter->SetShrinkFactor( 1, factors[1] );
  if (ImageType::ImageDimension > 2) {
    filter->SetShrinkFactor( 2, factors[2] );
  }

  using ResampleFilterType = itk::ResampleImageFilter< ImageType, ImageType >;
  auto resampleFilter = ResampleFilterType::New();
  resampleFilter->SetInput( inputImage.Get() );

  filter->UpdateOutputInformation();
  using ROIFilterType = itk::ExtractImageFilter< ImageType, ImageType >;
  auto roiFilter = ROIFilterType::New();
  using RegionType = typename ImageType::RegionType;
  const RegionType largestRegion( filter->GetOutput()->GetLargestPossibleRegion() );

  using SplitterType = itk::ImageRegionSplitterSlowDimension;
  auto splitter = SplitterType::New();
  const unsigned int numberOfSplits = splitter->GetNumberOfSplits( largestRegion, maxTotalSplits );

  if (split >= numberOfSplits)
  {
    std::cerr << "Error: requested split: " << split << " is outside the number of splits: " << numberOfSplits << std::endl;
    return EXIT_FAILURE;
  }

  if (!numberOfSplitsStreamOption->empty())
    {
    numberOfSplitsStream.Get() << numberOfSplits;
    }

  RegionType requestedRegion( largestRegion );
  splitter->GetSplit( split, numberOfSplits, requestedRegion );
  roiFilter->SetExtractionRegion( requestedRegion );
  roiFilter->SetInput( filter->GetOutput() );
  
  ITK_WASM_CATCH_EXCEPTION(pipeline, roiFilter->Update());

  auto result = roiFilter->GetOutput();
  outputImage.Set(result);

  return EXIT_SUCCESS;
}


template<typename TImage>
class PipelineFunctor
{
public:
  int operator()(itk::wasm::Pipeline & pipeline)
  {
    using ImageType = TImage;

    using InputImageType = itk::wasm::InputImage<ImageType>;
    InputImageType inputImage;
    pipeline.add_option("InputImage", inputImage, "Input image");

    ITK_WASM_PRE_PARSE(pipeline);

    return Downsample<ImageType>(pipeline, inputImage);
  }
};


int main( int argc, char * argv[] )
{
  itk::wasm::Pipeline pipeline("Downsample an image", argc, argv);

  return itk::wasm::SupportInputImageTypes<PipelineFunctor,
   uint8_t,
   int8_t,
   uint16_t,
   int16_t,
   uint32_t,
   int32_t,
   uint64_t,
   int64_t,
   float,
   double,
   itk::RGBPixel<uint8_t>,
   itk::RGBAPixel<uint8_t>,
   itk::VariableLengthVector<uint8_t>,
   itk::VariableLengthVector<int8_t>,
   itk::VariableLengthVector<uint16_t>,
   itk::VariableLengthVector<int16_t>,
   itk::VariableLengthVector<uint32_t>,
   itk::VariableLengthVector<int32_t>,
   itk::VariableLengthVector<uint64_t>,
   itk::VariableLengthVector<int64_t>,
   itk::VariableLengthVector<float>,
   itk::VariableLengthVector<double>,
   itk::Vector<float, 2>,
   itk::Vector<double, 2>,
   itk::Vector<float, 3>,
   itk::Vector<double, 3>,
   itk::Vector<uint8_t, 3>,
   itk::Vector<uint8_t, 3>,
   itk::Vector<uint8_t, 4>,
   itk::Vector<uint8_t, 4>,
   itk::CovariantVector<float, 2>,
   itk::CovariantVector<double, 2>,
   itk::CovariantVector<float, 3>,
   itk::CovariantVector<double, 3>
   >
  ::Dimensions<2U,3U>("InputImage", pipeline);
}
