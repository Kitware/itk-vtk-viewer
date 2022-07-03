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
#include "itkWASMMeshIOFactory.h"
#include "itkWASMMeshIO.h"
#include "itkVersion.h"

namespace itk
{

WASMMeshIOFactory
::WASMMeshIOFactory()
{
  this->RegisterOverride( "itkMeshIOBase",
                          "itkWASMMeshIO",
                          "WASM Mesh IO",
                          1,
                          CreateObjectFunction< WASMMeshIO >::New() );
}


WASMMeshIOFactory
::~WASMMeshIOFactory()
{}


const char *
WASMMeshIOFactory
::GetITKSourceVersion() const
{
  return ITK_SOURCE_VERSION;
}


const char *
WASMMeshIOFactory
::GetDescription() const
{
  return "WASM MeshIO Factory, allows the loading of WASM images into Insight";
}


// Undocumented API used to register during static initialization.
// DO NOT CALL DIRECTLY.

static bool WASMMeshIOFactoryHasBeenRegistered;

void WebAssemblyInterface_EXPORT WASMMeshIOFactoryRegister__Private(void)
{
  if( ! WASMMeshIOFactoryHasBeenRegistered )
    {
    WASMMeshIOFactoryHasBeenRegistered = true;
    WASMMeshIOFactory::RegisterOneFactory();
    }
}

} // end namespace itk
