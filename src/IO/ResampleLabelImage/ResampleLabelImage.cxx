#include "itkBinShrinkImageFilter.h"
#include "itkVectorImage.h"
#include "itkResampleImageFilter.h"
#include "itkLabelImageGenericInterpolateImageFunction.h"
#include "itkLinearInterpolateImageFunction.h"
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
#include "itkOutputTextStream.h"
#include "itkSupportInputImageTypes.h"

template <typename TImage>
int ResampleLabelImage(itk::wasm::Pipeline &pipeline, itk::wasm::InputImage<TImage> &inputImage)
{
  using ImageType = TImage;

  pipeline.get_option("InputImage")->required();

  using OutputImageType = itk::wasm::OutputImage<ImageType>;
  OutputImageType outputImage;
  pipeline.add_option("OutputImage", outputImage, "Output image")->required();

  std::vector<unsigned int> outSize;
  pipeline.add_option("outSize", outSize, "New image size for each direction")->expected(2, 3)->delimiter(',');

  unsigned int maxTotalSplits = 1;
  pipeline.add_option("-m,--max-total-splits", maxTotalSplits, "Maximum total splits when processed in parallel");

  unsigned int split = 0;
  pipeline.add_option("-s,--split", split, "Current processed split");

  itk::wasm::OutputTextStream numberOfSplitsStream;
  auto numberOfSplitsStreamOption = pipeline.add_option("--number-of-splits", numberOfSplitsStream, "Number of splits");

  ITK_WASM_PARSE(pipeline);

  auto inImage = inputImage.Get();

  using ResampleFilterType = itk::ResampleImageFilter<ImageType, ImageType>;
  auto resampleFilter = ResampleFilterType::New();

  using InterpolatorType = itk::LabelImageGenericInterpolateImageFunction<ImageType, itk::LinearInterpolateImageFunction>;
  auto interpolator = InterpolatorType::New();
  resampleFilter->SetInterpolator(interpolator);

  resampleFilter->SetInput(inImage);
  resampleFilter->SetOutputParametersFromImage(inImage);

  using RegionType = typename ImageType::RegionType;
  const typename ImageType::SizeType &inputSize = inImage->GetLargestPossibleRegion().GetSize();

  const typename TImage::SpacingType &inputSpacing = inImage->GetSpacing();
  typename ImageType::SpacingType outputSpacing;
  // for (int i : outputSpacing)
  for (int i = 0; i < outputSpacing.size(); ++i)
  {
    outputSpacing[i] = inputSpacing[i] * (double)inputSize[i] / (double)outSize[i];
  }
  resampleFilter->SetOutputSpacing(outputSpacing);

  typename ImageType::SizeType outputSize;
  // for (int i : outputSize)
  for (int i = 0; i < outputSize.size(); ++i)
  {
    outputSize[i] = outSize[i];
  }
  resampleFilter->SetSize(outputSize);

  using ROIFilterType = itk::ExtractImageFilter<ImageType, ImageType>;
  resampleFilter->UpdateOutputInformation();
  const RegionType largestRegion(resampleFilter->GetOutput()->GetLargestPossibleRegion());

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
  roiFilter->SetInput(resampleFilter->GetOutput());

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

template <typename TImage>
class PipelineFunctor
{
public:
  int operator()(itk::wasm::Pipeline &pipeline)
  {
    using ImageType = TImage;

    using InputImageType = itk::wasm::InputImage<ImageType>;
    InputImageType inputImage;
    pipeline.add_option("InputImage", inputImage, "Input image");

    ITK_WASM_PRE_PARSE(pipeline);

    return ResampleLabelImage<ImageType>(pipeline, inputImage);
  }
};

int main(int argc, char *argv[])
{
  itk::wasm::Pipeline pipeline("ResampleLabelImage", "Resample a label image", argc, argv);

  return itk::wasm::SupportInputImageTypes<PipelineFunctor,
                                           uint8_t,
                                           int8_t,
                                           uint16_t,
                                           int16_t,
                                           uint32_t,
                                           int32_t,
                                           uint64_t,
                                           int64_t>::Dimensions<2U, 3U>("InputImage", pipeline);
}
