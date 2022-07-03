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
#include <emscripten/bind.h>

// https://emscripten.org/docs/porting/Debugging.html?highlight=debugging#handling-c-exceptions-from-javascript
std::string getExceptionMessage(intptr_t exceptionPtr) {
  return std::string(reinterpret_cast<std::exception *>(exceptionPtr)->what());
}

EMSCRIPTEN_BINDINGS(itk_wasm_debug_bindings) {
  emscripten::function("getExceptionMessage", &getExceptionMessage);
}
