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
#include "itkVectorImage.h"
#include "itkResampleImageFilter.h"
#include "itkLinearInterpolateImageFunction.h"
#include "itkImageRegionSplitterSlowDimension.h"
#include "itkExtractImageFilter.h"
#include "itkRGBPixel.h"
#include "itkRGBAPixel.h"
#include "itkVectorImage.h"
#include "itkVector.h"
#include "itkPoint.h"
#include "itkCovariantVector.h"
#include "itkFixedArray.h"
#include "itkArray.h"
#include "itkVariableLengthVector.h"
#include <fstream>
#include "itkPipeline.h"
#include "itkInputImage.h"
#include "itkOutputImage.h"
#include "itkOutputTextStream.h"
#include "itkSupportInputImageTypes.h"
#include "itkCheckerBoardImageFilter.h"
#include "itkIntensityWindowingImageFilter.h"
#include "itkCastImageFilter.h"
#include "itkVectorMagnitudeImageFilter.h"
#include "itkRGBToLuminanceImageFilter.h"
#include "itkComposeImageFilter.h"

template <typename TMovingImage, typename TFixedImage>
int Compare(itk::wasm::Pipeline &pipeline, const TMovingImage *movingImage, const TFixedImage *fixedImage)
{
  using ImageType = TMovingImage;
  using FixedImageType = TFixedImage;

  pipeline.get_option("input-image")->required()->type_name("INPUT_IMAGE");
  pipeline.get_option("fixed-image")->required()->type_name("INPUT_IMAGE");

  std::string method;
  pipeline.add_option("-e,--method", method, "Compare method")->required();

  std::vector<float> range;
  pipeline.add_option("-r,--range", range, "Min and max intensity values of output image")->expected(2)->delimiter(',');

  std::vector<unsigned int> pattern;
  pipeline.add_option("-p,--pattern", pattern, "Number of boxes for each dimension")->expected(2, 3)->delimiter(',');

  bool swapImageOrder;
  pipeline.add_option("-o,--swap-image-order", swapImageOrder, "Change which image goes first in pattern");

  // split args
  unsigned int maxTotalSplits = 1;
  pipeline.add_option("-m,--max-total-splits", maxTotalSplits, "Maximum total splits when processed in parallel");

  unsigned int split = 0;
  pipeline.add_option("-s,--split", split, "Current processed split");

  itk::wasm::OutputTextStream numberOfSplitsStream;
  auto numberOfSplitsStreamOption = pipeline.add_option("--number-of-splits", numberOfSplitsStream, "Number of splits");

  ITK_WASM_PRE_PARSE(pipeline);

  // Resample moving to fixed image
  using ResampleFilterType = itk::ResampleImageFilter<ImageType, ImageType>;
  auto resampleFilter = ResampleFilterType::New();
  resampleFilter->SetInput(movingImage);
  resampleFilter->SetReferenceImage(fixedImage);
  resampleFilter->UseReferenceImageOn();

  // rescale intensity and cast PixelType of moving to fixed
  using RescaleFilterType = itk::IntensityWindowingImageFilter<ImageType, FixedImageType>;
  auto rescaleFilter = RescaleFilterType::New();
  rescaleFilter->SetInput(resampleFilter->GetOutput());
  rescaleFilter->SetWindowMinimum(range[0]);
  rescaleFilter->SetWindowMaximum(range[1]);
  rescaleFilter->SetOutputMinimum(range[0]);
  rescaleFilter->SetOutputMaximum(range[1]);

  if (method.compare("checkerboard") == 0)
  {
    // Checkerboard images
    using FilterType = itk::CheckerBoardImageFilter<FixedImageType>;
    auto filter = FilterType::New();

    if (swapImageOrder)
    {
      filter->SetInput1(fixedImage);
      filter->SetInput2(rescaleFilter->GetOutput());
    }
    else
    {
      filter->SetInput1(rescaleFilter->GetOutput());
      filter->SetInput2(fixedImage);
    }

    const int dims = pattern.size();
    if (dims > 0)
    {
      typename FilterType::PatternArrayType checkerPattern;
      for (int i = 0; i < dims; ++i)
      {
        checkerPattern[i] = pattern[i];
      }
      filter->SetCheckerPattern(checkerPattern);
    }

    // Split handling
    using ROIFilterType = itk::ExtractImageFilter<FixedImageType, FixedImageType>;
    filter->UpdateOutputInformation();
    using RegionType = typename FixedImageType::RegionType;
    const RegionType largestRegion(filter->GetOutput()->GetLargestPossibleRegion());

    using SplitterType = itk::ImageRegionSplitterSlowDimension;
    auto splitter = SplitterType::New();
    const unsigned int numberOfSplits = splitter->GetNumberOfSplits(largestRegion, maxTotalSplits);

    if (split >= numberOfSplits)
    {
      std::cerr << "Error: requested split: " << split << " is outside the number of splits: " << numberOfSplits << std::endl;
      return EXIT_FAILURE;
    }

    if (!numberOfSplitsStreamOption->empty())
    {
      numberOfSplitsStream.Get() << numberOfSplits;
    }

    RegionType requestedRegion(largestRegion);
    splitter->GetSplit(split, numberOfSplits, requestedRegion);
    auto roiFilter = ROIFilterType::New();
    roiFilter->SetExtractionRegion(requestedRegion);
    roiFilter->SetInput(filter->GetOutput());

    try
    {
      roiFilter->Update();
    }
    catch (std::exception &error)
    {
      std::cerr << "Error: " << error.what() << std::endl;
      return EXIT_FAILURE;
    }

    using OutputImageType = itk::wasm::OutputImage<FixedImageType>;
    OutputImageType outputImage;
    pipeline.add_option("output-image", outputImage, "Output image")->required()->type_name("OUTPUT_IMAGE");

    ITK_WASM_PARSE(pipeline);

    outputImage.Set(roiFilter->GetOutput());

    return EXIT_SUCCESS;
  }
  else
  {
    // cyan-magenta or blend

    // using FilterType = itk::ComposeImageFilter<FixedImageType>;
    // auto filter = FilterType::New();
    // filter->SetInput(0, fixedImage);
    // filter->SetInput(1, rescaleFilter->GetOutput());

    // using PipelineOutputType = typename itk::VectorImage<typename FixedImageType::PixelType, FixedImageType::ImageDimension>;

    auto filter = rescaleFilter;
    using PipelineOutputType = FixedImageType;

    using OutputImageType = itk::wasm::OutputImage<PipelineOutputType>;
    OutputImageType outputImage;
    pipeline.add_option("output-image", outputImage, "Output image")->required()->type_name("OUTPUT_IMAGE");

    ITK_WASM_PARSE(pipeline);

    // Split handling
    using ROIFilterType = itk::ExtractImageFilter<PipelineOutputType, PipelineOutputType>;
    filter->UpdateOutputInformation();
    using RegionType = typename PipelineOutputType::RegionType;
    const RegionType largestRegion(filter->GetOutput()->GetLargestPossibleRegion());

    using SplitterType = itk::ImageRegionSplitterSlowDimension;
    auto splitter = SplitterType::New();
    const unsigned int numberOfSplits = splitter->GetNumberOfSplits(largestRegion, maxTotalSplits);

    if (split >= numberOfSplits)
    {
      std::cerr << "Error: requested split: " << split << " is outside the number of splits: " << numberOfSplits << std::endl;
      return EXIT_FAILURE;
    }

    if (!numberOfSplitsStreamOption->empty())
    {
      numberOfSplitsStream.Get() << numberOfSplits;
    }

    RegionType requestedRegion(largestRegion);
    splitter->GetSplit(split, numberOfSplits, requestedRegion);
    auto roiFilter = ROIFilterType::New();
    roiFilter->SetExtractionRegion(requestedRegion);
    roiFilter->SetInput(filter->GetOutput());

    try
    {
      roiFilter->Update();
    }
    catch (std::exception &error)
    {
      std::cerr << "Error: " << error.what() << std::endl;
      return EXIT_FAILURE;
    }

    outputImage.Set(roiFilter->GetOutput());

    return EXIT_SUCCESS;
  }
}

using MagnitudePixelType = float;

template <typename TImage>
using OneComponentImage = typename itk::Image<MagnitudePixelType, TImage::ImageDimension>::ConstPointer;

template <typename TImage>
using IsRGB = std::disjunction<
    std::is_same<typename TImage::PixelType, typename itk::RGBPixel<unsigned char>>,
    std::is_same<typename TImage::PixelType, typename itk::RGBAPixel<unsigned char>>>;

template <typename TImage>
using IsOneComponent = std::is_same<typename TImage::PixelType, typename itk::NumericTraits<typename TImage::PixelType>::ValueType>;

// Vector PixelType, use magnitude filter
template <typename TImage>
typename std::enable_if<!IsRGB<TImage>::value && !IsOneComponent<TImage>::value, OneComponentImage<TImage>>::type
EnsureOneComponent(const TImage *image)
{
  using MagnitudeImageType = itk::Image<MagnitudePixelType, TImage::ImageDimension>;
  using VectorMagnitudeFilterType = itk::VectorMagnitudeImageFilter<TImage, MagnitudeImageType>;
  auto magnitudeFilter = VectorMagnitudeFilterType::New();
  magnitudeFilter->SetInput(image);
  magnitudeFilter->Update();
  return magnitudeFilter->GetOutput();
}

// RGB PixelType, use luminance filter
template <typename TImage>
typename std::enable_if<IsRGB<TImage>::value && !IsOneComponent<TImage>::value, OneComponentImage<TImage>>::type
EnsureOneComponent(const TImage *image)
{
  using MagnitudeImageType = itk::Image<MagnitudePixelType, TImage::ImageDimension>;
  using LuminanceFilter = itk::RGBToLuminanceImageFilter<TImage, MagnitudeImageType>;
  auto filter = LuminanceFilter::New();
  filter->SetInput(image);
  filter->Update();
  return filter->GetOutput();
}

// Scalar type, passthrough image
template <typename TImage>
typename std::enable_if<IsOneComponent<TImage>::value, typename TImage::ConstPointer>::type
EnsureOneComponent(const TImage *image)
{
  return typename TImage::ConstPointer(image);
}

template <typename TImage>
class InputImagePipelineFunctor
{

public:
  int operator()(itk::wasm::Pipeline &pipeline)
  {
    using ImageType = TImage;
    using InputImageType = itk::wasm::InputImage<ImageType>;
    InputImageType inputImage;
    pipeline.add_option("input-image", inputImage, "Input image");

    ITK_WASM_PRE_PARSE(pipeline);

    typename TImage::ConstPointer image = inputImage.Get();
    parsedImage = image;

    return itk::wasm::SupportInputImageTypes<FixedImagePipelineFunctor,
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
                                             itk::Vector<uint8_t, 2>,
                                             itk::Vector<uint8_t, 3>,
                                             itk::Vector<uint8_t, 3>,
                                             itk::Vector<uint8_t, 4>,
                                             itk::Vector<uint8_t, 4>,
                                             itk::CovariantVector<float, 2>,
                                             itk::CovariantVector<double, 2>,
                                             itk::CovariantVector<float, 3>,
                                             itk::CovariantVector<double, 3>>::template Dimensions<ImageType::ImageDimension>("fixed-image", pipeline);
  }

private:
  template <typename TFixedImage>
  class FixedImagePipelineFunctor
  {
  public:
    int operator()(itk::wasm::Pipeline &pipeline)
    {
      using FixedImageType = itk::wasm::InputImage<TFixedImage>;
      FixedImageType fixedImage;
      pipeline.add_option("fixed-image", fixedImage, "Fixed image");

      ITK_WASM_PRE_PARSE(pipeline);

      const TFixedImage *fixed = fixedImage.Get();

      auto movingScalarImage = EnsureOneComponent<TImage>(parsedImage);
      auto fixedScalarImage = EnsureOneComponent<TFixedImage>(fixed);

      // The images as SmartPointers may be important to avoid silent failure of Compare() (due to cleanup of image memory?)
      return Compare(pipeline, movingScalarImage.GetPointer(), fixedScalarImage.GetPointer());
    }
  };

  static inline const TImage *parsedImage;
};

int main(int argc, char *argv[])
{
  itk::wasm::Pipeline pipeline("compare", "Combine two images by method", argc, argv);

  return itk::wasm::SupportInputImageTypes<InputImagePipelineFunctor,
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
                                           itk::Vector<uint8_t, 2>,
                                           itk::Vector<uint8_t, 3>,
                                           itk::Vector<uint8_t, 3>,
                                           itk::Vector<uint8_t, 4>,
                                           itk::CovariantVector<float, 2>,
                                           itk::CovariantVector<double, 2>,
                                           itk::CovariantVector<float, 3>,
                                           itk::CovariantVector<double, 3>>::Dimensions<2U, 3U>("input-image", pipeline);
}
