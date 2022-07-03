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
#include "itkSupportInputMeshTypes.h"
#include "itkWASMExports.h"

#include "rapidjson/document.h"

namespace itk
{

namespace wasm
{

bool lexical_cast(const std::string &input, InterfaceMeshType & meshType)
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

    const rapidjson::Value & jsonMeshType = document["meshType"];
    meshType.dimension = jsonMeshType["dimension"].GetInt();
    meshType.componentType = jsonMeshType["pointPixelComponentType"].GetString();
    meshType.pixelType = jsonMeshType["pointPixelType"].GetString();
    meshType.components = jsonMeshType["pointPixelComponents"].GetInt();
    if (meshType.components == 0)
    {
      meshType.components = jsonMeshType["cellPixelComponents"].GetInt();
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

    meshType.dimension = meshIO->GetPointDimension();

    using IOComponentType = itk::IOComponentEnum;
    const IOComponentType ioComponentEnum = meshIO->GetPointPixelComponentType();
    meshType.componentType = WASMComponentTypeFromIOComponentEnum( ioComponentEnum );

    using IOPixelType = itk::IOPixelEnum;
    const IOPixelType ioPixelEnum = meshIO->GetPointPixelType();
    meshType.pixelType = WASMPixelTypeFromIOPixelEnum( ioPixelEnum );

    meshType.components = meshIO->GetNumberOfPointPixelComponents();
    if (meshType.components == 0)
    {
      meshType.components = meshIO->GetNumberOfPointPixelComponents();
    }
#else
    return false;
#endif
  }
  return true;
}

} // end namespace wasm
} // end namespace itk
