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
#ifndef itkImportVectorImageFilter_hxx
#define itkImportVectorImageFilter_hxx

#include "itkImportVectorImageFilter.h"
#include "itkObjectFactory.h"
#include "itkMath.h"

namespace itk
{

template <typename TOutputImage>
ImportVectorImageFilter<TOutputImage>::ImportVectorImageFilter()
{
  for (unsigned int idx = 0; idx < OutputImageType::ImageDimension; ++idx)
  {
    m_Spacing[idx] = 1.0;
    m_Origin[idx] = 0.0;
  }
  m_Direction.SetIdentity();
}

template <typename TOutputImage>
ImportVectorImageFilter<TOutputImage>::~ImportVectorImageFilter()
{
}

template <typename TOutputImage>
void
ImportVectorImageFilter<TOutputImage>::PrintSelf(std::ostream & os, Indent indent) const
{
  int i;

  Superclass::PrintSelf(os, indent);

  if (m_ImportImageContainer)
  {
    os << indent << "ImportImageContainer pointer: (" << m_ImportImageContainer << ")" << std::endl;
  }
  else
  {
    os << indent << "ImportImageContainer pointer: (None)" << std::endl;
  }
  os << indent << "Import buffer size: " << m_Size << std::endl;
  os << indent << "Import buffer size: " << m_Size << std::endl;
  if (m_ImportImageContainer)
  {
    os << indent
       << "ImageContainer manages memory: " << (m_ImportImageContainer->GetContainerManageMemory() ? "true" : "false")
       << std::endl;
  }

  os << indent << "Spacing: [";
  for (i = 0; i < static_cast<int>(OutputImageType::ImageDimension) - 1; ++i)
  {
    os << m_Spacing[i] << ", ";
  }
  os << m_Spacing[i] << "]" << std::endl;

  os << indent << "Origin: [";
  for (i = 0; i < static_cast<int>(OutputImageType::ImageDimension) - 1; ++i)
  {
    os << m_Origin[i] << ", ";
  }
  os << m_Origin[i] << "]" << std::endl;
  os << indent << "Direction: " << std::endl << this->GetDirection() << std::endl;
}

template <typename TOutputImage>
void
ImportVectorImageFilter<TOutputImage>::SetImportPointer(OutputImageInternalPixelType *  ptr,
                                                        SizeValueType num,
                                                        bool          letImageContainerManageMemory,
                                                        unsigned int  vectorImageComponents)
{
  if (!m_ImportImageContainer || ptr != m_ImportImageContainer->GetImportPointer() || m_Size != num || m_VectorImageComponentsPerPixel != vectorImageComponents)
  {
    m_Size = num;
    m_VectorImageComponentsPerPixel = vectorImageComponents;
    m_ImportImageContainer = ImportImageContainerType::New();
    m_ImportImageContainer->SetImportPointer(ptr, m_Size*vectorImageComponents, letImageContainerManageMemory);
    this->Modified();
  }
}

template <typename TOutputImage>
auto
ImportVectorImageFilter<TOutputImage>::GetImportPointer() -> OutputImageInternalPixelType *
{
  return m_ImportImageContainer->GetImportPointer();
}

template <typename TOutputImage>
void
ImportVectorImageFilter<TOutputImage>::EnlargeOutputRequestedRegion(DataObject * output)
{
  // call the superclass' implementation of this method
  Superclass::EnlargeOutputRequestedRegion(output);

  // get pointer to the output
  OutputImagePointer outputPtr = this->GetOutput();

  // set the requested region to the largest possible region (in this case
  // the amount of data that we have)
  outputPtr->SetRequestedRegion(outputPtr->GetLargestPossibleRegion());
}

template <typename TOutputImage>
void
ImportVectorImageFilter<TOutputImage>::GenerateOutputInformation()
{
  // call the superclass' implementation of this method
  Superclass::GenerateOutputInformation();

  // get pointer to the output
  OutputImagePointer outputPtr = this->GetOutput();

  // we need to compute the output spacing, the output origin, the
  // output image size, and the output image start index
  outputPtr->SetSpacing(m_Spacing);
  outputPtr->SetOrigin(m_Origin);
  outputPtr->SetDirection(m_Direction);
  outputPtr->SetLargestPossibleRegion(m_Region);

  if (outputPtr->GetNameOfClass() == "VectorImage")
    {
    outputPtr->SetNumberOfComponentsPerPixel(m_VectorImageComponentsPerPixel);
    }
}

template <typename TOutputImage>
void
ImportVectorImageFilter<TOutputImage>::GenerateData()
{
  // Normally, GenerateData() allocates memory.  However, the application
  // provides the memory for this filter via the SetImportPointer() method.
  // Therefore, this filter does not call outputPtr->Allocate().

  // get pointer to the output
  OutputImagePointer outputPtr = this->GetOutput();

  // the output buffer size is set to the size specified by the user via the
  // SetRegion() method.
  outputPtr->SetBufferedRegion(outputPtr->GetLargestPossibleRegion());

  // pass the pointer down to the container during each Update() since
  // a call to Initialize() causes the container to forget the
  // pointer.  Note that we tell the container NOT to manage the
  // memory itself.  This filter will properly manage the memory (as
  // opposed to the container) if the user wants it to.
  outputPtr->SetPixelContainer(m_ImportImageContainer);
}

template <typename TOutputImage>
void
ImportVectorImageFilter<TOutputImage>::SetDirection(const DirectionType & direction)
{
  bool modified = false;

  for (unsigned int r = 0; r < OutputImageType::ImageDimension; ++r)
  {
    for (unsigned int c = 0; c < OutputImageType::ImageDimension; ++c)
    {
      if (Math::NotExactlyEquals(m_Direction[r][c], direction[r][c]))
      {
        m_Direction[r][c] = direction[r][c];
        modified = true;
      }
    }
  }
  if (modified)
  {
    this->Modified();
  }
}
} // end namespace itk

#endif
