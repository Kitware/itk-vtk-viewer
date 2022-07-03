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
#ifndef itkImportVectorImageFilter_h
#define itkImportVectorImageFilter_h

#include "itkImageSource.h"

namespace itk
{
/** \class ImportVectorImageFilter
 * \brief Import data from a standard C array into an itk::Image or itk::VectorImage
 *
 * ImportVectorImageFilter provides a mechanism for importing data into an itk::Image or itk::VectorImage.
 * ImportVectorImageFilter is an image source, so it behaves like any other pipeline
 * object.
 *
 * This class is templated over the type of the output image.
 *
 * This class differs from ImportImageFilter in the following ways:
 *
 * - It can be used on a itk::VectorImage in addition to itk::Image
 * - It is templated over the output image type
 * - The NumberOfComponentsPerPixel can be set
 *
 * \ingroup IOFilters
 * \ingroup WebAssemblyInterface
 *
 */
template <typename TOutputImage>
class ITK_TEMPLATE_EXPORT ImportVectorImageFilter : public ImageSource<TOutputImage>
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(ImportVectorImageFilter);

  /** Typedef for the output image.   */
  using OutputImageType = TOutputImage;
  using OutputImagePointer = typename OutputImageType::Pointer;
  using SpacingType = typename OutputImageType::SpacingType;
  using OriginType = typename OutputImageType::PointType;
  using ImportImageContainerType = ImportImageContainer<SizeValueType, typename OutputImageType::InternalPixelType>;

  /** Standard class type aliases. */
  using Self = ImportVectorImageFilter;
  using Superclass = ImageSource<OutputImageType>;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  /** Method for creation through the object factory. */
  itkNewMacro(Self);

  /** Run-time type information (and related methods). */
  itkTypeMacro(ImportVectorImageFilter, ImageSource);

  /** Index type alias support An index is used to access pixel values. */
  using IndexType = Index<OutputImageType::ImageDimension>;

  /** Size type alias support A size is used to define region bounds. */
  using SizeType = Size<OutputImageType::ImageDimension>;

  /** Region type alias support A region is used to specify a
   * subset of an image. */
  using RegionType = ImageRegion<OutputImageType::ImageDimension>;

  /** Type of the output image pixel type. */
  using OutputImagePixelType = typename OutputImageType::PixelType;
  using OutputImageInternalPixelType = typename OutputImageType::InternalPixelType;

  /** Get the pointer from which the image data is imported. */
  OutputImageInternalPixelType *
  GetImportPointer();

  /** Set the pointer from which the image data is imported.  "num" is
   * the number of pixel in the block of memory. If
   * "LetImageContainerManageMemory" is false, then the this filter will
   * not free the memory in its destructor and the application providing the
   * buffer retains the responsibility of freeing the memory for this image
   * data.  If "LetImageContainerManageMemory" is true, then the ImageContainer
   * will free the memory when it is destroyed. If it is a VectorImage, set the 
   * vectorImageComponents to the NumberOfComponentsPerPixel. */
  void
  SetImportPointer(OutputImageInternalPixelType * ptr,
   SizeValueType num,
   bool letImageContainerManageMemory,
   unsigned int vectorImageComponents = 1);

  /** Set the region object that defines the size and starting index
   * for the imported image. This will serve as the LargestPossibleRegion,
   * the BufferedRegion, and the RequestedRegion.
   * \sa ImageRegion */
  void
  SetRegion(const RegionType & region)
  {
    if (m_Region != region)
    {
      m_Region = region;
      this->Modified();
    }
  }

  /** Get the region object that defines the size and starting index
   * for the imported image. This will serve as the LargestPossibleRegion,
   * the BufferedRegion, and the RequestedRegion.
   * \sa ImageRegion */
  const RegionType &
  GetRegion() const
  {
    return m_Region;
  }

  /** Set the spacing (size of a pixel) of the image.
   * \sa GetSpacing() */
  itkSetMacro(Spacing, SpacingType);
  itkGetConstReferenceMacro(Spacing, SpacingType);
  itkSetVectorMacro(Spacing, const float, OutputImageType::ImageDimension);

  /** Set the origin of the image.
   * \sa GetOrigin() */
  itkSetMacro(Origin, OriginType);
  itkGetConstReferenceMacro(Origin, OriginType);
  itkSetVectorMacro(Origin, const float, OutputImageType::ImageDimension);

  using DirectionType = Matrix<SpacePrecisionType, OutputImageType::ImageDimension, OutputImageType::ImageDimension>;

  /** Set the direction of the image
   * \sa GetDirection() */
  virtual void
  SetDirection(const DirectionType & direction);

  /**  Get the direction of the image
   * \sa SetDirection */
  itkGetConstReferenceMacro(Direction, DirectionType);

protected:
  ImportVectorImageFilter();
  ~ImportVectorImageFilter() override;
  void
  PrintSelf(std::ostream & os, Indent indent) const override;

  /** This filter does not actually "produce" any data, rather it "wraps"
   * the user supplied data into an itk::Image.  */
  void
  GenerateData() override;

  /** This is a source, so it must set the spacing, size, and largest possible
   * region for the output image that it will produce.
   * \sa ProcessObject::GenerateOutputInformation() */
  void
  GenerateOutputInformation() override;

  /** This filter can only produce the amount of data that it is given,
   * so we must override ProcessObject::EnlargeOutputRequestedRegion()
   * (The default implementation of a source produces the amount of
   * data requested.  This source, however, can only produce what it is
   * given.)
   *
   * \sa ProcessObject::EnlargeOutputRequestedRegion() */
  void
  EnlargeOutputRequestedRegion(DataObject * output) override;

private:
  RegionType    m_Region;
  SpacingType   m_Spacing;
  OriginType    m_Origin;
  DirectionType m_Direction;

  typename ImportImageContainerType::Pointer m_ImportImageContainer;
  SizeValueType                              m_Size{0};
  unsigned int                               m_VectorImageComponentsPerPixel{1};
};

} // end namespace itk

#ifndef ITK_MANUAL_INSTANTIATION
#  include "itkImportVectorImageFilter.hxx"
#endif

#endif
