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
#include "itkIOComponentEnumFromWASMComponentType.h"

namespace itk
{

IOComponentEnum
IOComponentEnumFromWASMComponentType(const std::string & wasmComponentType)
{
  if( wasmComponentType == "int8" )
    {
    return IOComponentEnum::CHAR;
    }
  else if( wasmComponentType == "uint8" )
    {
    return IOComponentEnum::UCHAR;
    }
  else if( wasmComponentType == "int16" )
    {
    return IOComponentEnum::SHORT;
    }
  else if( wasmComponentType == "uint16" )
    {
    return IOComponentEnum::USHORT;
    }
  else if( wasmComponentType == "int32" )
    {
    return IOComponentEnum::INT;
    }
  else if( wasmComponentType == "uint32" )
    {
    return IOComponentEnum::UINT;
    }
  else if( wasmComponentType == "int64" )
    {
    return IOComponentEnum::LONGLONG;
    }
  else if( wasmComponentType == "uint64" )
    {
    return IOComponentEnum::ULONGLONG;
    }
  else if( wasmComponentType == "float32" )
    {
    return IOComponentEnum::FLOAT;
    }
  else if( wasmComponentType == "float64" )
    {
    return IOComponentEnum::DOUBLE;
    }
  return IOComponentEnum::UNKNOWNCOMPONENTTYPE;
}

} // end namespace itk
