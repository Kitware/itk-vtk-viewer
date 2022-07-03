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

#include "itkWASMImageIO.h"

#include "itkWASMComponentTypeFromIOComponentEnum.h"
#include "itkIOComponentEnumFromWASMComponentType.h"
#include "itkWASMPixelTypeFromIOPixelEnum.h"
#include "itkIOPixelEnumFromWASMPixelType.h"

#include "itkMetaDataObject.h"
#include "itkIOCommon.h"
#include "itksys/SystemTools.hxx"

#include "itksys/SystemTools.hxx"

#include "rapidjson/prettywriter.h"
#include "rapidjson/ostreamwrapper.h"

#include "cbor.h"

namespace itk
{

WASMImageIO
::WASMImageIO()
{
  this->SetNumberOfDimensions(3);
  this->AddSupportedWriteExtension(".iwi");
  this->AddSupportedWriteExtension(".iwi.cbor");
  this->AddSupportedReadExtension(".iwi");
  this->AddSupportedReadExtension(".iwi.cbor");
}


WASMImageIO
::~WASMImageIO()
{
}


bool
WASMImageIO
::SupportsDimension(unsigned long itkNotUsed(dimension))
{
  return true;
}


void
WASMImageIO
::PrintSelf(std::ostream & os, Indent indent) const
{
  Superclass::PrintSelf(os, indent);
}


bool
WASMImageIO
::CanReadFile(const char *filename)
{
  std::string fname = filename;

  bool extensionFound = false;
  std::string::size_type extensionPos = fname.rfind(".iwi");
  if ( extensionPos != std::string::npos )
    {
    extensionFound = true;
    }

  if ( !extensionFound )
    {
    itkDebugMacro(<< "The filename extension is not recognized");
    return false;
    }

  std::string::size_type zstdPos = fname.rfind(".zstd");
  // WASMZstdImageIO is required
  if ( zstdPos != std::string::npos )
    {
    return false;
    }

  return true;
}


void
WASMImageIO
::SetJSON(rapidjson::Document & document)
{
  const rapidjson::Value & imageType = document["imageType"];
  const unsigned int dimension = imageType["dimension"].GetInt();
  this->SetNumberOfDimensions( dimension );

  const std::string componentType( imageType["componentType"].GetString() );
  const ImageIOBase::IOComponentEnum ioComponentType = IOComponentEnumFromWASMComponentType( componentType );
  this->SetComponentType( ioComponentType );

  const std::string pixelType( imageType["pixelType"].GetString() );
  const IOPixelEnum ioPixelType = IOPixelEnumFromWASMPixelType( pixelType );
  this->SetPixelType( ioPixelType );

  this->SetNumberOfComponents( imageType["components"].GetInt() );

  const rapidjson::Value & origin = document["origin"];
  int count = 0;
  for( rapidjson::Value::ConstValueIterator itr = origin.Begin(); itr != origin.End(); ++itr )
    {
    this->SetOrigin( count, itr->GetDouble() );
    ++count;
    }

  const rapidjson::Value & spacing = document["spacing"];
  count = 0;
  for( rapidjson::Value::ConstValueIterator itr = spacing.Begin(); itr != spacing.End(); ++itr )
    {
    this->SetSpacing( count, itr->GetDouble() );
    ++count;
    }

  const rapidjson::Value & size = document["size"];
  count = 0;
  for( rapidjson::Value::ConstValueIterator itr = size.Begin(); itr != size.End(); ++itr )
    {
    this->SetDimensions( count, itr->GetInt() );
    ++count;
    }
}


void
WASMImageIO
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

  struct cbor_load_result result;
  cbor_item_t* index = cbor_load(cborBuffer, length, &result);
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

  const size_t indexCount = cbor_map_size(index);
  const struct cbor_pair * indexHandle = cbor_map_handle(index);
  for (size_t ii = 0; ii < indexCount; ++ii)
  {
    const std::string_view key(reinterpret_cast<char *>(cbor_string_handle(indexHandle[ii].key)), cbor_string_length(indexHandle[ii].key));
    if (key == "imageType")
    {
      const cbor_item_t * imageTypeItem = indexHandle[ii].value;
      const size_t imageTypeCount = cbor_map_size(imageTypeItem);
      const struct cbor_pair * imageTypeHandle = cbor_map_handle(imageTypeItem);
      for (size_t jj = 0; jj < imageTypeCount; ++jj)
      {
        const std::string_view imageTypeKey(reinterpret_cast<char *>(cbor_string_handle(imageTypeHandle[jj].key)), cbor_string_length(imageTypeHandle[jj].key));
        if (imageTypeKey == "dimension")
        {
          const auto dimension = cbor_get_uint32(imageTypeHandle[jj].value);
          this->SetNumberOfDimensions( dimension );
        }
        else if (imageTypeKey == "componentType")
        {
          const std::string componentType(reinterpret_cast<char *>(cbor_string_handle(imageTypeHandle[jj].value)), cbor_string_length(imageTypeHandle[jj].value));
          const ImageIOBase::IOComponentEnum ioComponentType = IOComponentEnumFromWASMComponentType( componentType );
          this->SetComponentType( ioComponentType );
        }
        else if (imageTypeKey == "pixelType")
        {
          const std::string pixelType(reinterpret_cast<char *>(cbor_string_handle(imageTypeHandle[jj].value)), cbor_string_length(imageTypeHandle[jj].value));
          const IOPixelEnum ioPixelType = IOPixelEnumFromWASMPixelType( pixelType );
          this->SetPixelType( ioPixelType );
        }
        else if (imageTypeKey == "components")
        {
          const auto components = cbor_get_uint32(imageTypeHandle[jj].value);
          this->SetNumberOfComponents( components );
        }
        else
        {
          itkExceptionMacro("Unexpected imageType cbor map key: " << imageTypeKey);
        }
      }
    }
    else if (key == "origin")
    {
      const auto originHandle = cbor_array_handle(indexHandle[ii].value);
      const size_t originSize = cbor_array_size(indexHandle[ii].value);
      for( int dim = 0; dim < originSize; ++dim )
        {
        const auto item = originHandle[dim];
        this->SetOrigin( dim, cbor_float_get_float(item) );
        }
    }
    else if (key == "spacing")
    {
      const auto spacingHandle = cbor_array_handle(indexHandle[ii].value);
      const size_t spacingSize = cbor_array_size(indexHandle[ii].value);
      for( int dim = 0; dim < spacingSize; ++dim )
        {
        const auto item = spacingHandle[dim];
        this->SetSpacing( dim, cbor_float_get_float(item) );
        }
    }
    else if (key == "size")
    {
      const auto sizeHandle = cbor_array_handle(indexHandle[ii].value);
      const size_t sizeSize = cbor_array_size(indexHandle[ii].value);
      for( int dim = 0; dim < sizeSize; ++dim )
        {
        const auto item = sizeHandle[dim];
        this->SetDimensions( dim, cbor_get_uint64(item) );
        }
    }
    else if (key == "direction")
    {
      cbor_item_t * directionItem = cbor_tag_item(indexHandle[ii].value);
      const double * directionHandle = reinterpret_cast< double * >( cbor_bytestring_handle(directionItem) );
      const size_t directionSize = cbor_bytestring_length(directionItem);
      const unsigned int dimension = std::sqrt( directionSize / sizeof(double) );
      for( unsigned int jj = 0; jj < dimension; ++jj )
        {
        std::vector< double > direction( dimension );
        for( unsigned int kk = 0; kk < dimension; ++kk )
          {
          direction[kk] = directionHandle[kk + jj*dimension];
          }
        this->SetDirection( jj, direction );
        }
    }
    else if (key == "data")
    {
      if( buffer != nullptr )
      {
        const SizeValueType numberOfBytesToBeRead =
          static_cast< SizeValueType >( this->GetImageSizeInBytes() );
        const cbor_item_t * dataItem = cbor_tag_item(indexHandle[ii].value);
        const char * dataHandle = reinterpret_cast< char * >( cbor_bytestring_handle(dataItem) );
        std::memcpy(buffer, dataHandle, numberOfBytesToBeRead);
      }
    }
    else if (key == "metadata")
    {
      // todo
    }
    else
    {
      itkExceptionMacro("Unexpected cbor map key: " << key);
    }
  }

  cbor_decref(&index);
}

size_t
WASMImageIO
::WriteCBOR(const void *buffer, unsigned char ** cborBufferPtr, bool allocateCBORBuffer )
{
  cbor_item_t * index  = cbor_new_definite_map(7);

  cbor_item_t * imageTypeItem = cbor_new_definite_map(4);
  cbor_map_add(imageTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("dimension")),
      .value = cbor_move(cbor_build_uint32(this->GetNumberOfDimensions()))});
  const std::string componentString = WASMComponentTypeFromIOComponentEnum( this->GetComponentType() );
  cbor_map_add(imageTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("componentType")),
      .value = cbor_move(cbor_build_string(componentString.c_str()))});
  const std::string pixelString = WASMPixelTypeFromIOPixelEnum( this->GetPixelType() );
  cbor_map_add(imageTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("pixelType")),
      .value = cbor_move(cbor_build_string(pixelString.c_str()))});
  cbor_map_add(imageTypeItem,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("components")),
      .value = cbor_move(cbor_build_uint32(this->GetNumberOfComponents()))});
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("imageType")),
      .value = cbor_move(imageTypeItem)});

  const unsigned int dimension = this->GetNumberOfDimensions();

  cbor_item_t * originItem = cbor_new_definite_array(dimension);
  for( unsigned int ii = 0; ii < dimension; ++ii )
  {
    cbor_array_set(originItem, ii, cbor_move(cbor_build_float8(this->GetOrigin(ii))));
  }
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("origin")),
      .value = cbor_move(originItem)});

  cbor_item_t * spacingItem = cbor_new_definite_array(dimension);
  for( unsigned int ii = 0; ii < dimension; ++ii )
  {
    cbor_array_set(spacingItem, ii, cbor_move(cbor_build_float8(this->GetSpacing(ii))));
  }
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("spacing")),
      .value = cbor_move(spacingItem)});

  std::vector< double > direction( dimension * dimension );
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    const std::vector< double > dimensionDirection = this->GetDirection( ii );
    for( unsigned int jj = 0; jj < dimension; ++jj )
      {
      direction[jj + ii*dimension] = dimensionDirection[jj];
      }
    }
  cbor_item_t * directionItem = cbor_build_bytestring(reinterpret_cast<unsigned char *>(&(direction.at(0))), dimension*dimension*sizeof(double));
  cbor_item_t * directionTag = cbor_new_tag(86);
  cbor_tag_set_item(directionTag, cbor_move(directionItem));
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("direction")),
      .value = cbor_move(directionTag)});

  cbor_item_t * sizeItem = cbor_new_definite_array(dimension);
  for( unsigned int ii = 0; ii < dimension; ++ii )
  {
    cbor_array_set(sizeItem, ii, cbor_move(cbor_build_uint64(this->GetDimensions(ii))));
  }
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("size")),
      .value = cbor_move(sizeItem)});

  cbor_item_t * metaDataItem = cbor_new_definite_map(0);
  cbor_map_add(index,
    (struct cbor_pair){
      .key = cbor_move(cbor_build_string("metadata")),
      .value = cbor_move(metaDataItem)});

  if( buffer != nullptr )
  {
    const SizeValueType numberOfBytesToWrite =
      static_cast< SizeValueType >( this->GetImageSizeInBytes() );
    cbor_item_t * dataItem = cbor_build_bytestring(reinterpret_cast< const unsigned char *>(buffer), numberOfBytesToWrite);
    uint64_t tag = 0;
    // Todo: support endianness
    // https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml
    switch (this->GetComponentType()) {
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
        .key = cbor_move(cbor_build_string("data")),
        .value = cbor_move(dataTag)});
  }

  size_t cborBufferSize;
  size_t length;
  unsigned char * cborBuffer;

  if (allocateCBORBuffer)
  {
    length = cbor_serialize_alloc(index, cborBufferPtr, &cborBufferSize);
  }
  else
  {
    length = cbor_serialize_alloc(index, &cborBuffer, &cborBufferSize);
    FILE* file = fopen(this->GetFileName(), "wb");
    fwrite(cborBuffer, 1, length, file);
    free(cborBuffer);
    fclose(file);
  }

  cbor_decref(&index);
  
  return length;
}


void
WASMImageIO
::ReadImageInformation()
{
  this->SetByteOrderToLittleEndian();

  const std::string path = this->GetFileName();

  std::string::size_type cborPos = path.rfind(".cbor");
  if ( ( cborPos != std::string::npos )
       && ( cborPos == path.length() - 5 ) )
  {
    this->ReadCBOR(nullptr);
    return;
  }

  rapidjson::Document document;
  std::ifstream inputStream;
  const auto indexPath = path + "/index.json";
  this->OpenFileForReading( inputStream, indexPath.c_str(), true );
  std::string str((std::istreambuf_iterator<char>(inputStream)),
                    std::istreambuf_iterator<char>());
  if (document.Parse(str.c_str()).HasParseError())
    {
    itkExceptionMacro("Could not parse JSON");
    return;
    }
  this->SetJSON(document);

  const unsigned int dimension = this->GetNumberOfDimensions();
  const auto dataPath = path + "/data";
  int count = 0;

  const auto directionPath = dataPath +  "/direction.raw";
  std::ifstream directionStream;
  this->OpenFileForReading( directionStream, directionPath.c_str(), false );
  count = 0;
  for( unsigned int jj = 0; jj < dimension; ++jj )
  {
    std::vector< double > direction( dimension );
    for( unsigned int ii = 0; ii < dimension; ++ii )
      {
      directionStream.read(reinterpret_cast< char * >(&(direction[ii])), sizeof(double));
      }
    this->SetDirection( count, direction );
    ++count;
  }

}


void
WASMImageIO
::Read( void *buffer )
{
  const std::string path(this->GetFileName());

  std::string::size_type cborPos = path.rfind(".cbor");
  if ( ( cborPos != std::string::npos )
       && ( cborPos == path.length() - 5 ) )
  {
    this->ReadCBOR(buffer);
    return;
  }

  const std::string dataFile = (path + "/data/data.raw").c_str();
  std::ifstream dataStream;
  this->OpenFileForReading( dataStream, dataFile.c_str() );

  if (this->RequestedToStream())
  {
    this->OpenFileForReading( dataStream, dataFile.c_str() );
    this->StreamReadBufferAsBinary( dataStream, buffer );
  }
  else
  {
    this->OpenFileForReading( dataStream, dataFile.c_str() );
    const SizeValueType numberOfBytesToBeRead =
      static_cast< SizeValueType >( this->GetImageSizeInBytes() );
    if ( !this->ReadBufferAsBinary( dataStream, buffer, numberOfBytesToBeRead ) )
      {
      itkExceptionMacro(<< "Read failed: Wanted "
                        << numberOfBytesToBeRead
                        << " bytes, but read "
                        << dataStream.gcount() << " bytes.");
      }
  }
}


bool
WASMImageIO
::CanWriteFile(const char *name)
{
  std::string filename = name;

  if( filename == "" )
    {
    return false;
    }

  bool extensionFound = false;
  std::string::size_type iwiPos = filename.rfind(".iwi");
  if ( iwiPos != std::string::npos )
    {
    extensionFound = true;
    }

  if ( !extensionFound )
    {
    itkDebugMacro(<< "The filename extension is not recognized");
    return false;
    }

  std::string::size_type zstdPos = filename.rfind(".zstd");
  // WASMZstdImageIO is required
  if ( zstdPos != std::string::npos )
    {
    return false;
    }

  return true;
}


rapidjson::Document
WASMImageIO
::GetJSON()
{
  rapidjson::Document document;
  document.SetObject();
  rapidjson::Document::AllocatorType& allocator = document.GetAllocator();

  rapidjson::Value imageType;
  imageType.SetObject();

  const unsigned int dimension = this->GetNumberOfDimensions();
  imageType.AddMember("dimension", rapidjson::Value(dimension).Move(), allocator );

  const std::string componentString = WASMComponentTypeFromIOComponentEnum( this->GetComponentType() );
  rapidjson::Value componentType;
  componentType.SetString( componentString.c_str(), allocator );
  imageType.AddMember("componentType", componentType.Move(), allocator );

  const std::string pixelString = WASMPixelTypeFromIOPixelEnum( this->GetPixelType() );
  rapidjson::Value pixelType;
  pixelType.SetString( pixelString.c_str(), allocator );
  imageType.AddMember("pixelType", pixelType.Move(), allocator );

  imageType.AddMember("components", rapidjson::Value( this->GetNumberOfComponents() ).Move(), allocator );

  document.AddMember( "imageType", imageType.Move(), allocator );

  rapidjson::Value origin(rapidjson::kArrayType);
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    origin.PushBack(rapidjson::Value().SetDouble(this->GetOrigin( ii )), allocator);
    }
  document.AddMember( "origin", origin.Move(), allocator );

  rapidjson::Value spacing(rapidjson::kArrayType);
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    spacing.PushBack(rapidjson::Value().SetDouble(this->GetSpacing( ii )), allocator);
    }
  document.AddMember( "spacing", spacing.Move(), allocator );

  rapidjson::Value directionValue;
  directionValue.SetString( "data:application/vnd.itk.path,data/direction.raw", allocator );
  document.AddMember( "direction", directionValue.Move(), allocator );

  rapidjson::Value size(rapidjson::kArrayType);
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    size.PushBack(rapidjson::Value().SetInt( this->GetDimensions( ii ) ), allocator);
    }
  document.AddMember( "size", size.Move(), allocator );

  std::string dataFileString( "data:application/vnd.itk.path,data/data.raw" );
  rapidjson::Value dataFile;
  dataFile.SetString( dataFileString.c_str(), allocator );
  document.AddMember( "data", dataFile, allocator );

  return document;
}

void
WASMImageIO
::WriteImageInformation()
{
  const std::string path = this->GetFileName();

  std::string::size_type cborPos = path.rfind(".cbor");
  if (cborPos != std::string::npos)
  {
    return;
  }

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
  const unsigned int dimension = this->GetNumberOfDimensions();

  const auto directionPath = dataPath + "/direction.raw";
  if ( !itksys::SystemTools::FileExists(dataPath, false) )
    {
      itksys::SystemTools::MakeDirectory(dataPath);
    }
  std::ofstream directionFile;
  this->OpenFileForWriting(directionFile, directionPath.c_str(), false);
  for( unsigned int ii = 0; ii < dimension; ++ii )
    {
    const std::vector< double > dimensionDirection = this->GetDirection( ii );
    for( unsigned int jj = 0; jj < dimension; ++jj )
      {
      directionFile.write(reinterpret_cast< const char *>(&(dimensionDirection[jj])), sizeof(double) );
      }
    }

  std::ofstream outputStream;
  this->OpenFileForWriting( outputStream, indexPath.c_str(), true, true );
  rapidjson::OStreamWrapper ostreamWrapper( outputStream );
  rapidjson::PrettyWriter< rapidjson::OStreamWrapper > writer( ostreamWrapper );
  document.Accept( writer );
  outputStream.close();
}


void
WASMImageIO
::Write( const void *buffer )
{
  const std::string path(this->GetFileName());

  std::string::size_type cborPos = path.rfind(".cbor");
  if ( ( cborPos != std::string::npos )
       && ( cborPos == path.length() - 5 ) )
  {
    this->WriteCBOR(buffer);
    return;
  }

  const std::string fileName = path + "/data/data.raw";

  if (this->RequestedToStream())
  {
    if (!itksys::SystemTools::FileExists(path.c_str()))
    {
      this->WriteImageInformation();
      std::ofstream file;
      this->OpenFileForWriting(file, fileName, false);

      // write one byte at the end of the file to allocate (this is a
      // nifty trick which should not write the entire size of the file
      // just allocate it, if the system supports sparse files)
      std::streampos seekPos = this->GetImageSizeInBytes();
      file.seekp(seekPos, std::ios::cur);
      file.write("\0", 1);
      file.seekp(0);
    }

    std::ofstream file;
    // open and stream write
    this->OpenFileForWriting(file, fileName, false);

    this->StreamWriteBufferAsBinary(file, buffer);
  }
  else
  {
    this->WriteImageInformation();
    std::ofstream outputStream;
    this->OpenFileForWriting( outputStream, fileName, true, false );
    const SizeValueType numberOfBytes = this->GetImageSizeInBytes();
    outputStream.write(static_cast< const char * >( buffer ), numberOfBytes); \
  }
}

} // end namespace itk
