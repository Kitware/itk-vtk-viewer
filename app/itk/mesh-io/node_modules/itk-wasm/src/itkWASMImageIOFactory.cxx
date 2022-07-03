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
#include "itkWASMImageIOFactory.h"
#include "itkWASMImageIO.h"
#include "itkVersion.h"

namespace itk
{

WASMImageIOFactory
::WASMImageIOFactory()
{
  this->RegisterOverride( "itkImageIOBase",
                          "itkWASMImageIO",
                          "WASM Image IO",
                          1,
                          CreateObjectFunction< WASMImageIO >::New() );
}


WASMImageIOFactory
::~WASMImageIOFactory()
{}


const char *
WASMImageIOFactory
::GetITKSourceVersion() const
{
  return ITK_SOURCE_VERSION;
}


const char *
WASMImageIOFactory
::GetDescription() const
{
  return "WASM ImageIO Factory, allows the loading of ITK WASM images into Insight";
}


// Undocumented API used to register during static initialization.
// DO NOT CALL DIRECTLY.

static bool WASMImageIOFactoryHasBeenRegistered;

void WebAssemblyInterface_EXPORT WASMImageIOFactoryRegister__Private(void)
{
  if( ! WASMImageIOFactoryHasBeenRegistered )
    {
    WASMImageIOFactoryHasBeenRegistered = true;
    WASMImageIOFactory::RegisterOneFactory();
    }
}

} // end namespace itk
