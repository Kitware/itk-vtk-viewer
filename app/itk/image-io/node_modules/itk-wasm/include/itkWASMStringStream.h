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
#ifndef itkWASMStringStream_h
#define itkWASMStringStream_h

#include "itkWASMDataObject.h"
#include "rapidjson/document.h"
#include <string_view>

namespace itk
{
/**
 *\class WASMStringStream
 * \brief JSON representation for a std::stringstream
 *
 * JSON representation for a std::stringstream for interfacing across programming languages and runtimes.
 * 
 * { size: sizeInBytes, data: stringDataURI }
 * 
 * When representing text objects, `data` is not expected to include a C null termination character and sizeInBytes does not include this character.
 * 
 * Arrays:
 * 
 * - 0: The associated std::string data.
 * 
 * \ingroup WebAssemblyInterface
 */
class ITK_TEMPLATE_EXPORT WASMStringStream : public WASMDataObject
{
public:
  ITK_DISALLOW_COPY_AND_MOVE(WASMStringStream);

  /** Standard class type aliases. */
  using Self = WASMStringStream;
  using Superclass = WASMDataObject;
  using Pointer = SmartPointer<Self>;
  using ConstPointer = SmartPointer<const Self>;

  itkNewMacro(Self);
  /** Run-time type information (and related methods). */
  itkTypeMacro(WASMStringStream, WASMDataObject);

  void SetString(const std::string & string) {
    this->m_StringStream.str(string);
    this->UpdateJSON();
  }

  const std::string & GetString() {
    this->m_String = m_StringStream.str();
    return this->m_String;
  }

  std::stringstream & GetStringStream() {
    return this->m_StringStream;
  }

  void SetJSON(const char * jsonChar) override
  {
    std::string json(jsonChar);
    rapidjson::Document document;
    if (document.Parse(json.c_str()).HasParseError())
      {
      throw std::runtime_error("Could not parse JSON");
      }
    const rapidjson::Value & dataJson = document["data"];
    const std::string dataString( dataJson.GetString() );
    const char * dataPtr = reinterpret_cast< char * >( std::atol(dataString.substr(35).c_str()) );
    size_t size = document["size"].GetInt();
    const std::string_view string(dataPtr, size);
    m_StringStream.str(std::string{string});

    Superclass::SetJSON(jsonChar);
  }
protected:
  WASMStringStream() = default;
  ~WASMStringStream() override = default;

  void UpdateJSON()
  {
    std::ostringstream jsonStream;
    jsonStream << "{ \"data\": \"data:application/vnd.itk.address,0:";
    jsonStream << reinterpret_cast< size_t >( m_StringStream.str().data() );
    jsonStream << "\", \"size\": ";
    jsonStream << m_StringStream.str().size() + 1;
    jsonStream << "}";
    this->m_JSON = jsonStream.str();
  }

  std::stringstream m_StringStream;
  std::string m_String;

  void
  PrintSelf(std::ostream & os, Indent indent) const override;
};

} // namespace itk

#endif
