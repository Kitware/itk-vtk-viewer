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
#include "itkWASMComponentTypeFromIOComponentEnum.h"

namespace itk
{

std::string
WASMComponentTypeFromIOComponentEnum(const IOComponentEnum ioComponent )
{
  switch ( ioComponent )
    {
    case IOComponentEnum::CHAR:
      return "int8";

    case IOComponentEnum::UCHAR:
      return "uint8";

    case IOComponentEnum::SHORT:
      return "int16";

    case IOComponentEnum::USHORT:
      return "uint16";

    case IOComponentEnum::INT:
      return "int32";

    case IOComponentEnum::UINT:
      return "uint32";

    case IOComponentEnum::LONG:
      return "int64";

    case IOComponentEnum::ULONG:
      return "uint64";

    case IOComponentEnum::LONGLONG:
      return "int64";

    case IOComponentEnum::ULONGLONG:
      return "uint64";

    case IOComponentEnum::FLOAT:
      return "float32";

    case IOComponentEnum::DOUBLE:
      return "float64";

    default:
      return "int8";
    }
}

} // end namespace itk
