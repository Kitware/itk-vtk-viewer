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
#include "itkSupportInputPolyDataTypes.h"
#include "itkWASMExports.h"

#include "rapidjson/document.h"

namespace itk
{

namespace wasm
{

bool lexical_cast(const std::string &input, InterfacePolyDataType & polyDataType)
{
  if (wasm::Pipeline::GetUseMemoryIO())
  {
#ifndef ITK_WASM_NO_MEMORY_IO
    const unsigned int index = std::stoi(input);
    auto json = getMemoryStoreInputJSON(0, index);
    rapidjson::Document document;
    if (document.Parse(json.c_str()).HasParseError())
      {
      throw std::runtime_error("Could not parse JSON");
      }

    const rapidjson::Value & jsonPolyDataType = document["polyDataType"];
    polyDataType.componentType = jsonPolyDataType["pointPixelComponentType"].GetString();
    polyDataType.pixelType = jsonPolyDataType["pointPixelType"].GetString();
    polyDataType.components = jsonPolyDataType["pointPixelComponents"].GetInt();
    if (polyDataType.components == 0)
    {
      polyDataType.components = jsonPolyDataType["cellPixelComponents"].GetInt();
    }
#else
    return false;
#endif
  }
  else
  {
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    MeshIOBase::Pointer meshIO = MeshIOFactory::CreateMeshIO(input.c_str(), CommonEnums::IOFileMode::ReadMode);
    meshIO->SetFileName(input);
    meshIO->ReadMeshInformation();

    using IOComponentType = itk::IOComponentEnum;
    const IOComponentType ioComponentEnum = meshIO->GetPointPixelComponentType();
    polyDataType.componentType = WASMComponentTypeFromIOComponentEnum( ioComponentEnum );

    using IOPixelType = itk::IOPixelEnum;
    const IOPixelType ioPixelEnum = meshIO->GetPointPixelType();
    polyDataType.pixelType = WASMPixelTypeFromIOPixelEnum( ioPixelEnum );

    polyDataType.components = meshIO->GetNumberOfPointPixelComponents();
    if (polyDataType.components == 0)
    {
      polyDataType.components = meshIO->GetNumberOfPointPixelComponents();
    }
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk
