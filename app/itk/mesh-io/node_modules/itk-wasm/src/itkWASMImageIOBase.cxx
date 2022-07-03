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
#include "itkWASMImageIOBase.h"

#include "itkWASMImageIO.h"

#include <sstream>
#include "rapidjson/prettywriter.h"

namespace itk
{

WASMImageIOBase::WASMImageIOBase()
{
  this->m_DirectionContainer = DirectionContainerType::New();
  this->m_PixelDataContainer = PixelDataContainerType::New();
}

void
WASMImageIOBase::SetImageIO(ImageIOBase * imageIO, bool readImage)
{
  this->m_ImageIOBase = imageIO;
  if (!readImage)
  {
    return;
  }

  imageIO->ReadImageInformation();
  auto wasmImageIO = itk::WASMImageIO::New();

  const unsigned int dimension = imageIO->GetNumberOfDimensions();
  wasmImageIO->SetNumberOfDimensions(dimension);
  wasmImageIO->SetComponentType(imageIO->GetComponentType());
  wasmImageIO->SetNumberOfComponents(imageIO->GetNumberOfComponents());
  wasmImageIO->SetPixelType(imageIO->GetPixelType());
  for (unsigned int dim = 0; dim < dimension; ++dim)
  {
    wasmImageIO->SetDirection(dim, imageIO->GetDirection(dim));
    wasmImageIO->SetOrigin(dim, imageIO->GetOrigin(dim));
    wasmImageIO->SetSpacing(dim, imageIO->GetSpacing(dim));
    wasmImageIO->SetDimensions(dim, imageIO->GetDimensions(dim));
  }

  rapidjson::Document document = wasmImageIO->GetJSON();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  this->m_DirectionContainer->resize(dimension*dimension);
  for( unsigned int ii = 0; ii < dimension; ++ii )
  {
    const std::vector< double > dimensionDirection = imageIO->GetDirection( ii );
    for( unsigned int jj = 0; jj < dimension; ++jj )
    {
      this->m_DirectionContainer->SetElement(ii+dimension*jj, dimensionDirection[jj]);
    }
  }
  const auto directionAddress = reinterpret_cast< size_t >( &(this->m_DirectionContainer->at(0)) );
  std::ostringstream directionStream;
  directionStream << "data:application/vnd.itk.address,0:";
  directionStream << directionAddress;
  rapidjson::Value directionString;
  directionString.SetString( directionStream.str().c_str(), allocator );
  document.RemoveMember( "direction" );
  document.AddMember( "direction", directionString.Move(), allocator );

  ImageIORegion ioRegion( dimension );
  for(unsigned int dim = 0; dim < dimension; ++dim)
    {
    ioRegion.SetSize(dim, imageIO->GetDimensions( dim ));
    }
  imageIO->SetIORegion( ioRegion );
  this->m_PixelDataContainer->resize( imageIO->GetImageSizeInBytes() );
  imageIO->Read( reinterpret_cast< void * >( &(this->m_PixelDataContainer->at(0)) ));

  const auto pixelDataAddress = reinterpret_cast< size_t >( &(this->m_PixelDataContainer->at(0)) );
  std::ostringstream dataStream;
  dataStream << "data:application/vnd.itk.address,0:";
  dataStream << pixelDataAddress;
  rapidjson::Value dataString;
  dataString.SetString( dataStream.str().c_str(), allocator );
  document.RemoveMember( "data" );
  document.AddMember( "data", dataString.Move(), allocator );

  rapidjson::StringBuffer stringBuffer;
  rapidjson::Writer< rapidjson::StringBuffer > writer( stringBuffer );
  document.Accept( writer );
  this->SetJSON(stringBuffer.GetString());
}

void
WASMImageIOBase::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);

  os << indent << "DirectionContainer";
  this->m_DirectionContainer->Print(os, indent);
  os << indent << "PixelDataContainer";
  this->m_PixelDataContainer->Print(os, indent);
}

} // end namespace itk
