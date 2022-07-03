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

#include "itkWASMMeshIO.h"

#include "itkWASMComponentTypeFromIOComponentEnum.h"
#include "itkIOComponentEnumFromWASMComponentType.h"
#include "itkWASMPixelTypeFromIOPixelEnum.h"
#include "itkIOPixelEnumFromWASMPixelType.h"

#include "itkMetaDataObject.h"
#include "itkIOCommon.h"
#include "itksys/SystemTools.hxx"

#include "rapidjson/document.h"
#include "rapidjson/prettywriter.h"
#include "rapidjson/ostreamwrapper.h"

#include "itksys/SystemTools.hxx"

#include "cbor.h"

namespace itk
{

WASMMeshIO
::WASMMeshIO()
{
  this->AddSupportedWriteExtension(".iwm");
  this->AddSupportedWriteExtension(".iwm.cbor");
  this->AddSupportedReadExtension(".iwm");
  this->AddSupportedReadExtension(".iwm.cbor");
}


WASMMeshIO
::~WASMMeshIO()
{
}


void
WASMMeshIO
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}


void
WASMMeshIO
::OpenFileForReading(std::ifstream & inputStream, const std::string & filename, bool ascii)
{
  // Make sure that we have a file to
  if ( filename.empty() )
    {
    itkExceptionMacro( << "A FileName must be specified." );
    }

  // Close file from any previous image
  if ( inputStream.is_open() )
    {
    inputStream.close();
    }

  // Open the new file for reading
  itkDebugMacro( << "Opening file for reading: " << filename );

  std::ios::openmode mode = std::ios::in;
  if ( !ascii )
    {
    mode |= std::ios::binary;
    }

  inputStream.open( filename.c_str(), mode );

  if ( !inputStream.is_open() || inputStream.fail() )
    {
    itkExceptionMacro( << "Could not open file: "
                       << filename << " for reading."
                       << std::endl
                       << "Reason: "
                       << itksys::SystemTools::GetLastSystemError() );
    }
}


void
WASMMeshIO
::OpenFileForWriting(std::ofstream & outputStream, const std::string & filename, bool truncate, bool ascii)
{
  // Make sure that we have a file to
  if ( filename.empty() )
    {
    itkExceptionMacro( << "A FileName must be specified." );
    }

  // Close file from any previous image
  if ( outputStream.is_open() )
    {
    outputStream.close();
    }

  // Open the new file for writing
  itkDebugMacro( << "Opening file for writing: " << filename );

  std::ios::openmode mode = std::ios::out;
  if ( truncate )
    {
    // typically, ios::out also implies ios::trunc, but being explicit is safer
    mode |= std::ios::trunc;
    }
  else
    {
    mode |= std::ios::in;
    // opening a nonexistent file for reading + writing is not allowed on some platforms
    if ( !itksys::SystemTools::FileExists( filename.c_str() ) )
      {
      itksys::SystemTools::Touch( filename.c_str(), true );
      // don't worry about failure here, errors should be detected later when the file
      // is "actually" opened, unless there is a race condition
      }
    }
  if ( !ascii )
    {
    mode |= std::ios::binary;
    }

  outputStream.open( filename.c_str(), mode );

  if ( !outputStream.is_open() || outputStream.fail() )
    {
    itkExceptionMacro( << "Could not open file: "
                       << filename << " for writing."
                       << std::endl
                       << "Reason: "
                       << itksys::SystemTools::GetLastSystemError() );
    }
}


bool
WASMMeshIO
::ReadBufferAsBinary(std::istream & is, void *buffer, SizeValueType num)
{
  const auto numberOfBytesToBeRead = Math::CastWithRangeCheck< std::streamsize >(num);

  is.read(static_cast< char * >( buffer ), numberOfBytesToBeRead);

  const std::streamsize numberOfBytesRead = is.gcount();

  if ( ( numberOfBytesRead != numberOfBytesToBeRead )  || is.fail() )
    {
    return false; // read failed
    }

  return true;
}


size_t
WASMMeshIO
::ITKComponentSize(const CommonEnums::IOComponent itkComponentType)
{
  switch ( itkComponentType )
    {
    case CommonEnums::IOComponent::CHAR:
      return sizeof( uint8_t );

    case CommonEnums::IOComponent::UCHAR:
      return sizeof( uint8_t );

    case CommonEnums::IOComponent::SHORT:
      return sizeof( int16_t );

    case CommonEnums::IOComponent::USHORT:
      return sizeof( uint16_t );

    case CommonEnums::IOComponent::INT:
      return sizeof( int32_t );

    case CommonEnums::IOComponent::UINT:
      return sizeof( uint32_t );

    case CommonEnums::IOComponent::LONG:
      return sizeof( int64_t );

    case CommonEnums::IOComponent::ULONG:
      return sizeof( uint64_t );

    case CommonEnums::IOComponent::LONGLONG:
      return sizeof( int64_t );

    case CommonEnums::IOComponent::ULONGLONG:
      return sizeof( uint64_t );

    case CommonEnums::IOComponent::FLOAT:
      return sizeof( float );

    case CommonEnums::IOComponent::DOUBLE:
      return sizeof( double );

    default:
      return sizeof( int8_t );
    }
}

bool
WASMMeshIO
::FileNameIsCBOR()
{
  const std::string path(this->GetFileName());
  std::string::size_type cborPos = path.rfind(".cbor");
  if ( cborPos != std::string::npos )
  {
    return true;
  }
  return false;
}


void
WASMMeshIO
::ReadCBORBuffer(const char * dataName, void * buffer, SizeValueType numberOfBytesToBeRead)
{
  cbor_item_t * index = this->m_CBORRoot;
  if (index == nullptr) {
    itkExceptionMacro("Call ReadMeshInformation before reading the data buffer");
  }
  const size_t indexCount = cbor_map_size(index);
  const struct cbor_pair * indexHandle = cbor_map_handle(index);
  for (size_t ii = 0; ii < indexCount; ++ii)
  {
    const std::string_view key(reinterpret_cast<char *>(cbor_string_handle(indexHandle[ii].key)), cbor_string_length(indexHandle[ii].key));
    if (key == dataName)
    {
      const cbor_item_t * dataItem = cbor_tag_item(indexHandle[ii].value);
      const char * dataHandle = reinterpret_cast< char * >( cbor_bytestring_handle(dataItem) );
      std::memcpy(buffer, dataHandle, numberOfBytesToBeRead);
    }
  }
}


void
WASMMeshIO
::WriteCBORBuffer(const char * dataName, void * buffer, SizeValueType numberOfBytesToWrite, IOComponentEnum ioComponent)
{
  cbor_item_t * index = this->m_CBORRoot;
  if (index == nullptr) {
    itkExceptionMacro("Call WriteMeshInformation before writing the data buffer");
  }
  cbor_item_t * dataItem = cbor_build_bytestring(reinterpret_cast< const unsigned char *>(buffer), numberOfBytesToWrite);
  uint64_t tag = 0;
  // Todo: support endianness
  // https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml
  switch (ioComponent) {
    case IOComponentEnum::CHAR:
      tag = 64;
      break;
    case IOComponentEnum::UCHAR:
      tag = 64;
      break;
    case IOComponentEnum::SHORT:
      tag = 73;
      break;
    case IOComponentEnum::USHORT:
      tag = 69;
      break;
    case IOComponentEnum::INT:
      tag = 74;
      break;
    case IOComponentEnum::UINT:
      tag = 70;
      break;
    case IOComponentEnum::LONG:
      tag = 75;
      break;
    case IOComponentEnum::ULONG:
      tag = 71;
      break;
    case IOComponentEnum::LONGLONG:
      tag = 75;
      break;
    case IOComponentEnum::ULONGLONG:
      tag = 71;
      break;
    case IOComponentEnum::FLOAT:
      tag = 85;
      break;
    case IOComponentEnum::DOUBLE:
      tag = 86;
      break;
    default:
      itkExceptionMacro("Unexpected component type");
  }
  cbor_item_t * dataTag = cbor_new_tag(tag);
  cbor_tag_set_item(dataTag, cbor_move(dataItem));
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string(dataName)),
      .value = cbor_move(dataTag)});
}


bool
WASMMeshIO
::CanReadFile(const char *filename)
{
  // Check the extension first to avoid opening files that do not
  // look like JSON.  The file must have an appropriate extension to be
  // recognized.
  std::string fname = filename;

  bool extensionFound = false;
  std::string::size_type extensionPos = fname.rfind(".iwm");
  if ( extensionPos != std::string::npos )
    {
    extensionFound = true;
    }

  if ( !extensionFound )
    {
    itkDebugMacro(<< "The filename extension is not recognized");
    return false;
    }

  return true;
}


void
WASMMeshIO
::ReadCBOR( void *buffer, unsigned char * cborBuffer, size_t cborBufferLength )
{
  bool cborBufferAllocated = false;
  size_t length = cborBufferLength;
  if (cborBuffer == nullptr)
  {
    FILE* file = fopen(this->GetFileName(), "rb");
    if (file == NULL) {
      itkExceptionMacro("Could not read file: " << this->GetFileName());
    }
    fseek(file, 0, SEEK_END);
    length = (size_t)ftell(file);
    fseek(file, 0, SEEK_SET);
    cborBuffer = static_cast< unsigned char *>(malloc(length));
    cborBufferAllocated = true;
    if (!fread(cborBuffer, length, 1, file))
    {
      itkExceptionMacro("Could not successfully read " << this->GetFileName());

    }
    fclose(file);
  }

  if (this->m_CBORRoot != nullptr) {
    cbor_decref(&(this->m_CBORRoot));
  }
  struct cbor_load_result result;
  this->m_CBORRoot = cbor_load(cborBuffer, length, &result);
  if (cborBufferAllocated)
  {
    free(cborBuffer);
  }
  if (result.error.code != CBOR_ERR_NONE) {
    std::string errorDescription;
    switch (result.error.code) {
      case CBOR_ERR_MALFORMATED: {
        errorDescription = "Malformed data\n";
        break;
      }
      case CBOR_ERR_MEMERROR: {
        errorDescription = "Memory error -- perhaps the input is too large?\n";
        break;
      }
      case CBOR_ERR_NODATA: {
        errorDescription = "The input is empty\n";
        break;
      }
      case CBOR_ERR_NOTENOUGHDATA: {
        errorDescription = "Data seem to be missing -- is the input complete?\n";
        break;
      }
      case CBOR_ERR_SYNTAXERROR: {
        errorDescription = 
            "Syntactically malformed data -- see https://tools.ietf.org/html/rfc7049\n";
        break;
      }
      case CBOR_ERR_NONE: {
        break;
      }
    }
    itkExceptionMacro("" << errorDescription << "There was an error while reading the input near byte " << result.error.position << " (read " << result.read << " bytes in total): ");
  }

  cbor_item_t * index = this->m_CBORRoot;
  const size_t indexCount = cbor_map_size(index);
  const struct cbor_pair * indexHandle = cbor_map_handle(index);
  for (size_t ii = 0; ii < indexCount; ++ii)
  {
    const std::string_view key(reinterpret_cast<char *>(cbor_string_handle(indexHandle[ii].key)), cbor_string_length(indexHandle[ii].key));
    if (key == "meshType")
    {
      const cbor_item_t * meshTypeItem = indexHandle[ii].value;
      const size_t meshTypeCount = cbor_map_size(meshTypeItem);
      const struct cbor_pair * meshTypeHandle = cbor_map_handle(meshTypeItem);
      for (size_t jj = 0; jj < meshTypeCount; ++jj)
      {
        const std::string_view meshTypeKey(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].key)), cbor_string_length(meshTypeHandle[jj].key));
        if (meshTypeKey == "dimension")
        {
          const auto dimension = cbor_get_uint32(meshTypeHandle[jj].value);
          this->SetPointDimension( dimension );
        }
        else if (meshTypeKey == "pointComponentType")
        {
          const std::string pointComponentType(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].value)), cbor_string_length(meshTypeHandle[jj].value));
          const CommonEnums::IOComponent pointIOComponentType = IOComponentEnumFromWASMComponentType( pointComponentType );
          this->SetPointComponentType( pointIOComponentType );
        }
        else if (meshTypeKey == "pointPixelType")
        {
          const std::string pointPixelType(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].value)), cbor_string_length(meshTypeHandle[jj].value));
          const CommonEnums::IOPixel pointIOPixelType = IOPixelEnumFromWASMPixelType( pointPixelType );
          this->SetPointPixelType( pointIOPixelType );
        }
        else if (meshTypeKey == "pointPixelComponentType")
        {
          const std::string pointPixelComponentType(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].value)), cbor_string_length(meshTypeHandle[jj].value));
          const CommonEnums::IOComponent pointPixelIOComponentType = IOComponentEnumFromWASMComponentType( pointPixelComponentType );
          this->SetPointPixelComponentType( pointPixelIOComponentType );
        }
        else if (meshTypeKey == "pointPixelComponents")
        {
          const auto components = cbor_get_uint32(meshTypeHandle[jj].value);
          this->SetNumberOfPointPixelComponents( components );
        }
        else if (meshTypeKey == "cellComponentType")
        {
          const std::string cellComponentType(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].value)), cbor_string_length(meshTypeHandle[jj].value));
          const CommonEnums::IOComponent cellIOComponentType = IOComponentEnumFromWASMComponentType( cellComponentType );
          this->SetCellComponentType( cellIOComponentType );
        }
        else if (meshTypeKey == "cellPixelType")
        {
          const std::string cellPixelType(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].value)), cbor_string_length(meshTypeHandle[jj].value));
          const CommonEnums::IOPixel cellIOPixelType = IOPixelEnumFromWASMPixelType( cellPixelType );
          this->SetCellPixelType( cellIOPixelType );
        }
        else if (meshTypeKey == "cellPixelComponentType")
        {
          const std::string cellPixelComponentType(reinterpret_cast<char *>(cbor_string_handle(meshTypeHandle[jj].value)), cbor_string_length(meshTypeHandle[jj].value));
          const CommonEnums::IOComponent cellPixelIOComponentType = IOComponentEnumFromWASMComponentType( cellPixelComponentType );
          this->SetCellPixelComponentType( cellPixelIOComponentType );
        }
        else if (meshTypeKey == "cellPixelComponents")
        {
          const auto components = cbor_get_uint32(meshTypeHandle[jj].value);
          this->SetNumberOfCellPixelComponents( components );
        }
        else
        {
          itkExceptionMacro("Unexpected meshType cbor map key: " << meshTypeKey);
        }
      }
    }
    else if (key == "numberOfPoints")
    {
      const auto components = cbor_get_uint64(indexHandle[ii].value);
      this->SetNumberOfPoints( components );
      if ( components )
        {
        this->m_UpdatePoints = true;
        }
    }
    else if (key == "numberOfPointPixels")
    {
      const auto components = cbor_get_uint64(indexHandle[ii].value);
      this->SetNumberOfPointPixels( components );
      if ( components )
        {
        this->m_UpdatePointData = true;
        }
    }
    else if (key == "numberOfCells")
    {
      const auto components = cbor_get_uint64(indexHandle[ii].value);
      this->SetNumberOfCells( components );
      if ( components )
        {
        this->m_UpdateCells = true;
        }
    }
    else if (key == "numberOfCellPixels")
    {
      const auto components = cbor_get_uint64(indexHandle[ii].value);
      this->SetNumberOfCellPixels( components );
      if ( components )
        {
        this->m_UpdateCellData = true;
        }
    }
    else if (key == "cellBufferSize")
    {
      const auto components = cbor_get_uint64(indexHandle[ii].value);
      this->SetCellBufferSize( components );
    }
 }
}

rapidjson::Document
WASMMeshIO
::GetJSON()
{
  rapidjson::Document document;
  document.SetObject();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  rapidjson::Value meshType;
  meshType.SetObject();

  const unsigned int dimension = this->GetPointDimension();
  meshType.AddMember("dimension", rapidjson::Value(dimension).Move(), allocator );

  const std::string pointComponentString = WASMComponentTypeFromIOComponentEnum( this->GetPointComponentType() );
  rapidjson::Value pointComponentType;
  pointComponentType.SetString( pointComponentString.c_str(), allocator );
  meshType.AddMember("pointComponentType", pointComponentType.Move(), allocator );

  const std::string pointPixelComponentString = WASMComponentTypeFromIOComponentEnum( this->GetPointPixelComponentType() );
  rapidjson::Value pointPixelComponentType;
  pointPixelComponentType.SetString( pointPixelComponentString.c_str(), allocator );
  meshType.AddMember("pointPixelComponentType", pointPixelComponentType.Move(), allocator );

  rapidjson::Value pointPixelType;
  pointPixelType.SetString( WASMPixelTypeFromIOPixelEnum( this->GetPointPixelType()).c_str(), allocator );
  meshType.AddMember("pointPixelType", pointPixelType.Move(), allocator );

  meshType.AddMember("pointPixelComponents", rapidjson::Value( this->GetNumberOfPointPixelComponents() ).Move(), allocator );

  const std::string cellComponentString = WASMComponentTypeFromIOComponentEnum( this->GetCellComponentType() );
  rapidjson::Value cellComponentType;
  cellComponentType.SetString( cellComponentString.c_str(), allocator );
  meshType.AddMember("cellComponentType", cellComponentType.Move(), allocator );

  const std::string cellPixelComponentString = WASMComponentTypeFromIOComponentEnum( this->GetCellPixelComponentType() );
  rapidjson::Value cellPixelComponentType;
  cellPixelComponentType.SetString( cellPixelComponentString.c_str(), allocator );
  meshType.AddMember("cellPixelComponentType", cellPixelComponentType.Move(), allocator );

  rapidjson::Value cellPixelType;
  cellPixelType.SetString(WASMPixelTypeFromIOPixelEnum( this->GetCellPixelType() ).c_str(), allocator);
  meshType.AddMember("cellPixelType", cellPixelType, allocator );

  meshType.AddMember("cellPixelComponents", rapidjson::Value( this->GetNumberOfCellPixelComponents() ).Move(), allocator );

  document.AddMember( "meshType", meshType.Move(), allocator );

  rapidjson::Value numberOfPoints;
  numberOfPoints.SetInt( this->GetNumberOfPoints() );
  document.AddMember( "numberOfPoints", numberOfPoints.Move(), allocator );

  rapidjson::Value numberOfPointPixels;
  numberOfPointPixels.SetInt( this->GetNumberOfPointPixels() );
  document.AddMember( "numberOfPointPixels", numberOfPointPixels.Move(), allocator );

  rapidjson::Value numberOfCells;
  numberOfCells.SetInt( this->GetNumberOfCells() );
  document.AddMember( "numberOfCells", numberOfCells.Move(), allocator );

  rapidjson::Value numberOfCellPixels;
  numberOfCellPixels.SetInt( this->GetNumberOfCellPixels() );
  document.AddMember( "numberOfCellPixels", numberOfCellPixels.Move(), allocator );

  rapidjson::Value cellBufferSize;
  cellBufferSize.SetInt( this->GetCellBufferSize() );
  document.AddMember( "cellBufferSize", cellBufferSize.Move(), allocator );

  std::string pointsDataFileString( "data:application/vnd.itk.path,data/points.raw" );
  rapidjson::Value pointsDataFile;
  pointsDataFile.SetString( pointsDataFileString.c_str(), allocator );
  document.AddMember( "points", pointsDataFile, allocator );

  std::string cellsDataFileString( "data:application/vnd.itk.path,data/cells.raw" );
  rapidjson::Value cellsDataFile;
  cellsDataFile.SetString( cellsDataFileString.c_str(), allocator );
  document.AddMember( "cells", cellsDataFile, allocator );

  std::string pointDataDataFileString( "data:application/vnd.itk.path,data/pointData.raw" );
  rapidjson::Value pointDataDataFile;
  pointDataDataFile.SetString( pointDataDataFileString.c_str(), allocator );
  document.AddMember( "pointData", pointDataDataFile, allocator );

  std::string cellDataDataFileString( "data:application/vnd.itk.path,data/cellData.raw" );
  rapidjson::Value cellDataDataFile;
  cellDataDataFile.SetString( cellDataDataFileString.c_str(), allocator );
  document.AddMember( "cellData", cellDataDataFile, allocator );

  return document;
}


void
WASMMeshIO
::SetJSON(rapidjson::Document & document)
{
  const rapidjson::Value & meshType = document["meshType"];
  const int dimension = meshType["dimension"].GetInt();
  this->SetPointDimension( dimension );

  const std::string pointComponentType( meshType["pointComponentType"].GetString() );
  const CommonEnums::IOComponent pointIOComponentType = IOComponentEnumFromWASMComponentType( pointComponentType );
  this->SetPointComponentType( pointIOComponentType );

  const std::string pointPixelComponentType( meshType["pointPixelComponentType"].GetString() );
  const CommonEnums::IOComponent pointPixelIOComponentType = IOComponentEnumFromWASMComponentType( pointPixelComponentType );
  this->SetPointPixelComponentType( pointPixelIOComponentType );

  const std::string pointPixelType( meshType["pointPixelType"].GetString() );
  const CommonEnums::IOPixel pointIOPixelType = IOPixelEnumFromWASMPixelType( pointPixelType );
  this->SetPointPixelType( pointIOPixelType );

  this->SetNumberOfPointPixelComponents( meshType["pointPixelComponents"].GetInt() );

  const std::string cellComponentType( meshType["cellComponentType"].GetString() );
  const CommonEnums::IOComponent cellIOComponentType = IOComponentEnumFromWASMComponentType( cellComponentType );
  this->SetCellComponentType( cellIOComponentType );

  const std::string cellPixelComponentType( meshType["cellPixelComponentType"].GetString() );
  const CommonEnums::IOComponent cellPixelIOComponentType = IOComponentEnumFromWASMComponentType( cellPixelComponentType );
  this->SetCellPixelComponentType( cellPixelIOComponentType );

  const std::string cellPixelType( meshType["cellPixelType"].GetString() );
  const CommonEnums::IOPixel cellIOPixelType = IOPixelEnumFromWASMPixelType( cellPixelType );
  this->SetCellPixelType( cellIOPixelType );

  this->SetNumberOfCellPixelComponents( meshType["cellPixelComponents"].GetInt() );

  const rapidjson::Value & numberOfPoints = document["numberOfPoints"];
  this->SetNumberOfPoints( numberOfPoints.GetInt() );

  const rapidjson::Value & numberOfPointPixels = document["numberOfPointPixels"];
  this->SetNumberOfPointPixels( numberOfPointPixels.GetInt() );

  const rapidjson::Value & numberOfCells = document["numberOfCells"];
  this->SetNumberOfCells( numberOfCells.GetInt() );

  const rapidjson::Value & numberOfCellPixels = document["numberOfCellPixels"];
  this->SetNumberOfCellPixels( numberOfCellPixels.GetInt() );

  const rapidjson::Value & cellBufferSize = document["cellBufferSize"];
  this->SetCellBufferSize( cellBufferSize.GetInt() );
}


void
WASMMeshIO
::WriteCBOR()
{
  if (this->m_CBORRoot != nullptr) {
    cbor_decref(&(this->m_CBORRoot));
  }
  this->m_CBORRoot = cbor_new_definite_map(10);

  cbor_item_t * index = this->m_CBORRoot;
  cbor_item_t * meshTypeItem = cbor_new_definite_map(9);
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("dimension")),
      .value = cbor_move(cbor_build_uint32(this->GetPointDimension()))});
  std::string componentString = WASMComponentTypeFromIOComponentEnum( this->GetPointComponentType() );
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("pointComponentType")),
      .value = cbor_move(cbor_build_string(componentString.c_str()))});
  std::string pixelString = WASMPixelTypeFromIOPixelEnum( this->GetPointPixelType() );
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("pointPixelType")),
      .value = cbor_move(cbor_build_string(pixelString.c_str()))});
  componentString = WASMComponentTypeFromIOComponentEnum( this->GetPointPixelComponentType() );
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("pointPixelComponentType")),
      .value = cbor_move(cbor_build_string(componentString.c_str()))});
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("pointPixelComponents")),
      .value = cbor_move(cbor_build_uint32(this->GetNumberOfPointPixelComponents()))});
  componentString = WASMComponentTypeFromIOComponentEnum( this->GetCellComponentType() );
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("cellComponentType")),
      .value = cbor_move(cbor_build_string(componentString.c_str()))});
  pixelString = WASMPixelTypeFromIOPixelEnum( this->GetCellPixelType() );
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("cellPixelType")),
      .value = cbor_move(cbor_build_string(pixelString.c_str()))});
  componentString = WASMComponentTypeFromIOComponentEnum( this->GetCellPixelComponentType() );
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("cellPixelComponentType")),
      .value = cbor_move(cbor_build_string(componentString.c_str()))});
  cbor_map_add(meshTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("cellPixelComponents")),
      .value = cbor_move(cbor_build_uint32(this->GetNumberOfCellPixelComponents()))});
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("meshType")),
      .value = cbor_move(meshTypeItem)});

  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("numberOfPoints")),
      .value = cbor_move(cbor_build_uint64(this->GetNumberOfPoints()))});
  if ( this->GetNumberOfPoints() )
    {
    this->m_UpdatePoints = true;
    }

  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("numberOfPointPixels")),
      .value = cbor_move(cbor_build_uint64(this->GetNumberOfPointPixels()))});
  if ( this->GetNumberOfPointPixels() )
    {
    this->m_UpdatePointData = true;
    }

  cbor_map_add(index,
      (struct cbor_pair){
        .key = cbor_move(cbor_build_string("numberOfCells")),
        .value = cbor_move(cbor_build_uint64(this->GetNumberOfCells()))});
  if ( this->GetNumberOfCells() )
    {
    this->m_UpdateCells = true;
    }

  cbor_map_add(index,
      (struct cbor_pair){
        .key = cbor_move(cbor_build_string("numberOfCellPixels")),
        .value = cbor_move(cbor_build_uint64(this->GetNumberOfCellPixels()))});
  if ( this->GetNumberOfCellPixels() )
    {
    this->m_UpdateCellData = true;
    }

  cbor_map_add(index,
      (struct cbor_pair){
        .key = cbor_move(cbor_build_string("cellBufferSize")),
        .value = cbor_move(cbor_build_uint64(this->GetCellBufferSize()))});
}

void
WASMMeshIO
::ReadMeshInformation()
{
  this->SetByteOrderToLittleEndian();

  if ( this->FileNameIsCBOR() )
  {
    this->ReadCBOR();
    return;
  }

  rapidjson::Document document;
  const std::string path = this->GetFileName();
  const auto indexPath = path + "/index.json";
  const auto dataPath = path + "/data";

  std::ifstream inputStream;
  this->OpenFileForReading( inputStream, indexPath.c_str(), true );
  std::string str((std::istreambuf_iterator<char>(inputStream)),
                    std::istreambuf_iterator<char>());
  if (document.Parse(str.c_str()).HasParseError())
    {
    itkExceptionMacro("Could not parse JSON");
    return;
    }

  this->SetJSON(document);

  if ( this->GetNumberOfPoints() )
    {
    this->m_UpdatePoints = true;
    }

  if ( this->GetNumberOfPointPixels() )
    {
    this->m_UpdatePointData = true;
    }

  if ( this->GetNumberOfCells() )
    {
    this->m_UpdateCells = true;
    }

  if ( this->GetNumberOfCellPixels() )
    {
    this->m_UpdateCellData = true;
    }
}


void
WASMMeshIO
::ReadPoints( void *buffer )
{
  const SizeValueType numberOfBytesToBeRead =
    static_cast< SizeValueType >( this->GetNumberOfPoints() * this->GetPointDimension() * ITKComponentSize( this->GetPointComponentType() ) );

  if ( this->FileNameIsCBOR() )
  {
    this->ReadCBORBuffer("points", buffer, numberOfBytesToBeRead);
    return;
  }

  std::ifstream dataStream;
  const std::string path(this->GetFileName());
  const std::string dataFile = path + "/data/points.raw";
  this->OpenFileForReading( dataStream, dataFile.c_str() );

  if ( !this->ReadBufferAsBinary( dataStream, buffer, numberOfBytesToBeRead ) )
    {
    itkExceptionMacro(<< "Read failed: Wanted "
                      << numberOfBytesToBeRead
                      << " bytes, but read "
                      << dataStream.gcount() << " bytes.");
    }
}


void
WASMMeshIO
::ReadCells( void *buffer )
{
  const SizeValueType numberOfBytesToBeRead =
    static_cast< SizeValueType >( this->GetCellBufferSize() * ITKComponentSize( this->GetCellComponentType() ));

  if ( this->FileNameIsCBOR() )
  {
    this->ReadCBORBuffer("cells", buffer, numberOfBytesToBeRead);
    return;
  }

  const std::string path(this->GetFileName());
  const std::string dataPath = "data/cells.raw";
  std::ifstream dataStream;
  const std::string dataFile = path + "/" + dataPath;
  this->OpenFileForReading( dataStream, dataFile.c_str() );

  if ( !this->ReadBufferAsBinary( dataStream, buffer, numberOfBytesToBeRead ) )
    {
    itkExceptionMacro(<< "Read failed: Wanted "
                      << numberOfBytesToBeRead
                      << " bytes, but read "
                      << dataStream.gcount() << " bytes.");
    }
}


void
WASMMeshIO
::ReadPointData( void *buffer )
{
  const SizeValueType numberOfBytesToBeRead =
    static_cast< SizeValueType >( this->GetNumberOfPointPixels() * this->GetNumberOfPointPixelComponents() * ITKComponentSize( this->GetPointPixelComponentType() ));

  if ( this->FileNameIsCBOR() )
  {
    this->ReadCBORBuffer("pointData", buffer, numberOfBytesToBeRead);
    return;
  }

  const std::string path(this->GetFileName());
  const std::string dataPath = "data/pointData.raw";
  std::ifstream dataStream;
  const std::string dataFile = path + "/" + dataPath;
  this->OpenFileForReading( dataStream, dataFile.c_str() );

  if ( !this->ReadBufferAsBinary( dataStream, buffer, numberOfBytesToBeRead ) )
    {
    itkExceptionMacro(<< "Read failed: Wanted "
                      << numberOfBytesToBeRead
                      << " bytes, but read "
                      << dataStream.gcount() << " bytes.");
    }
}


void
WASMMeshIO
::ReadCellData( void *buffer )
{
  const SizeValueType numberOfBytesToBeRead =
    static_cast< SizeValueType >( this->GetNumberOfCellPixels() * this->GetNumberOfCellPixelComponents() * ITKComponentSize( this->GetCellPixelComponentType() ));

  if ( this->FileNameIsCBOR() )
  {
    this->ReadCBORBuffer("cellData", buffer, numberOfBytesToBeRead);
    return;
  }

  const std::string path(this->GetFileName());
  const std::string dataPath = "data/cellData.raw";
  std::ifstream dataStream;
  const std::string dataFile = path + "/" + dataPath;
  this->OpenFileForReading( dataStream, dataFile.c_str() );

  if ( !this->ReadBufferAsBinary( dataStream, buffer, numberOfBytesToBeRead ) )
    {
    itkExceptionMacro(<< "Read failed: Wanted "
                      << numberOfBytesToBeRead
                      << " bytes, but read "
                      << dataStream.gcount() << " bytes.");
    }
}


bool
WASMMeshIO
::CanWriteFile(const char *name)
{
  std::string filename = name;

  if( filename == "" )
    {
    return false;
    }

  bool extensionFound = false;
  std::string::size_type extensionPos = filename.rfind(".iwm");
  if ( extensionPos != std::string::npos )
    {
    extensionFound = true;
    }

  if ( !extensionFound )
    {
    itkDebugMacro(<< "The filename extension is not recognized");
    return false;
    }

  return true;
}


void
WASMMeshIO
::WriteMeshInformation()
{
  if ( this->FileNameIsCBOR() )
  {
    this->WriteCBOR();
    return;
  }

  const std::string path = this->GetFileName();
  const auto indexPath = path + "/index.json";
  const auto dataPath = path + "/data";
  if ( !itksys::SystemTools::FileExists(path, false) )
    {
      itksys::SystemTools::MakeDirectory(path);
    }
  if ( !itksys::SystemTools::FileExists(dataPath, false) )
    {
      itksys::SystemTools::MakeDirectory(dataPath);
    }

  rapidjson::Document document = this->GetJSON();

  if ( this->GetNumberOfPoints() )
    {
    this->m_UpdatePoints = true;
    }

  if ( this->GetNumberOfPointPixels() )
    {
    this->m_UpdatePointData = true;
    }

  if ( this->GetNumberOfCells() )
    {
    this->m_UpdateCells = true;
    }

  if ( this->GetNumberOfCellPixels() )
    {
    this->m_UpdateCellData = true;
    }

  std::ofstream outputStream;
  this->OpenFileForWriting( outputStream, indexPath.c_str(), true, true );
  rapidjson::OStreamWrapper ostreamWrapper( outputStream );
  rapidjson::PrettyWriter< rapidjson::OStreamWrapper > writer( ostreamWrapper );
  document.Accept( writer );
  outputStream.close();
}


void
WASMMeshIO
::WritePoints( void *buffer )
{
  const SizeValueType numberOfBytes = this->GetNumberOfPoints() * this->GetPointDimension() * ITKComponentSize( this->GetPointComponentType() );

  if (this->FileNameIsCBOR())
  {
    this->WriteCBORBuffer( "points", buffer, numberOfBytes, this->GetPointComponentType() );
    return;
  }

  const std::string path(this->GetFileName());
  const std::string filePath = "data/points.raw";
  const std::string fileName = path + "/" + filePath;
  std::ofstream outputStream;
  this->OpenFileForWriting( outputStream, fileName, true, false );
  outputStream.write(static_cast< const char * >( buffer ), numberOfBytes);
  if (outputStream.tellp() != numberOfBytes )
    {
    itkExceptionMacro(<< "Write failed: Wanted to write "
                      << numberOfBytes
                      << " bytes, but wrote "
                      << outputStream.tellp() << " bytes.");
    }
}


void
WASMMeshIO
::WriteCells( void *buffer )
{
  const SizeValueType numberOfBytes = this->GetCellBufferSize() * ITKComponentSize( this->GetCellComponentType() );

  if (this->FileNameIsCBOR())
  {
    this->WriteCBORBuffer( "cells", buffer, numberOfBytes, this->GetCellComponentType() );
    return;
  }

  const std::string path(this->GetFileName());
  const std::string filePath = "data/cells.raw";
  const std::string fileName = path + "/" + filePath;
  std::ofstream outputStream;
  this->OpenFileForWriting( outputStream, fileName, true, false );
  outputStream.write(static_cast< const char * >( buffer ), numberOfBytes); \
  if (outputStream.tellp() != numberOfBytes )
    {
    itkExceptionMacro(<< "Write failed: Wanted to write "
                      << numberOfBytes
                      << " bytes, but wrote "
                      << outputStream.tellp() << " bytes.");
    }
}


void
WASMMeshIO
::WritePointData( void *buffer )
{
  const SizeValueType numberOfBytes = this->GetNumberOfPointPixels() * this->GetNumberOfPointPixelComponents() * ITKComponentSize( this->GetPointPixelComponentType() );

  if (this->FileNameIsCBOR())
  {
    this->WriteCBORBuffer( "pointData", buffer, numberOfBytes, this->GetPointPixelComponentType() );
    return;
  }

  const std::string path(this->GetFileName());
  const std::string filePath = "data/pointData.raw";
  const std::string fileName = path + "/" + filePath;
  std::ofstream outputStream;
  this->OpenFileForWriting( outputStream, fileName, true, false );
  outputStream.write(static_cast< const char * >( buffer ), numberOfBytes); \
  if (outputStream.tellp() != numberOfBytes )
    {
    itkExceptionMacro(<< "Write failed: Wanted to write "
                      << numberOfBytes
                      << " bytes, but wrote "
                      << outputStream.tellp() << " bytes.");
    }
}


void
WASMMeshIO
::WriteCellData( void *buffer )
{
  const SizeValueType numberOfBytes = this->GetNumberOfPointPixels() * this->GetNumberOfPointPixelComponents() * ITKComponentSize( this->GetCellPixelComponentType() );

  if (this->FileNameIsCBOR())
  {
    this->WriteCBORBuffer( "cellData", buffer, numberOfBytes, this->GetCellPixelComponentType() );
    return;
  }

  const std::string path(this->GetFileName());
  const std::string filePath = "data/cellData.raw";
  const std::string fileName = path + "/" + filePath;
  std::ofstream outputStream;
  this->OpenFileForWriting( outputStream, fileName, true, false );
  outputStream.write(static_cast< const char * >( buffer ), numberOfBytes); \
  if (outputStream.tellp() != numberOfBytes )
    {
    itkExceptionMacro(<< "Write failed: Wanted to write "
                      << numberOfBytes
                      << " bytes, but wrote "
                      << outputStream.tellp() << " bytes.");
    }
}

void
WASMMeshIO
::Write()
{
  if (this->FileNameIsCBOR())
    {
    unsigned char* cborBuffer;
    size_t cborBufferSize;
    size_t length = cbor_serialize_alloc(this->m_CBORRoot, &cborBuffer, &cborBufferSize);

    FILE* file = fopen(this->GetFileName(), "wb");
    fwrite(cborBuffer, 1, length, file);
    free(cborBuffer);
    fclose(file);

    cbor_decref(&(this->m_CBORRoot));
    }
}

} // end namespace itk
