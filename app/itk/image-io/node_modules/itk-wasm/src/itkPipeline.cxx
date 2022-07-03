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
#include "itkPipeline.h"
#ifndef ITK_WASM_NO_FILESYSTEM_IO
#include <rang.hpp>
#endif
#include "CLI/Formatter.hpp"

namespace itk
{
namespace wasm
{

Pipeline
::Pipeline(std::string description, int argc, char **argv):
  App(description),
  m_argc(argc),
  m_argv(argv)
{
  this->footer("Enjoy ITK!");

  this->positionals_at_end(false);

  this->add_flag("--memory-io", m_UseMemoryIO, "Use itk-wasm memory IO")->group("");
  // Set m_UseMemoryIO before it is used by other memory parsers
  this->preparse_callback([this](size_t arg)
   {
   m_UseMemoryIO = false;
    for (int ii = 0; ii < this->m_argc; ++ii)
    {
      const std::string arg(this->m_argv[ii]);
      if (arg == "--memory-io")
      {
        m_UseMemoryIO = true;
      }
    }
   });
}

auto
Pipeline
::exit(const CLI::Error &e) -> int
{
  /// Avoid printing anything if this is a CLI::RuntimeError
  if(e.get_name() == "RuntimeError")
      return e.get_exit_code();

  if(e.get_name() == "CallForHelp" || e.get_name() == "CallForAllHelp")
  {
    std::string outputString;
    if(e.get_name() == "CallForHelp")
    {
      outputString = help();
    }
    else
    {
      outputString = help("", CLI::AppFormatMode::All);
    }

    // Based on GooFit
#ifndef ITK_WASM_NO_FILESYSTEM_IO
    std::cout << rang::fg::reset << rang::fgB::blue << rang::style::italic << rang::style::dim << "       Welcome to";
    // Just in case, for clang format:
    // clang-format off
    std::string splash = R"raw(
  __/\\\\\\\\\\\__/\\\\\\\\\\\\\\\__/\\\________/\\\_        
  _\/////\\\///__\///////\\\/////__\/\\\_____/\\\//__       
  _____\/\\\___________\/\\\_______\/\\\__/\\\//_____      
    _____\/\\\___________\/\\\_______\/\\\\\\//\\\_____     
    _____\/\\\___________\/\\\_______\/\\\//_\//\\\____    
      _____\/\\\___________\/\\\_______\/\\\____\//\\\___   
      _____\/\\\___________\/\\\_______\/\\\_____\//\\\__  
        __/\\\\\\\\\\\_______\/\\\_______\/\\\______\//\\\_ 
        _\///////////________\///________\///________\///__
  )raw";
    // clang-format on

    std::cout << rang::fg::reset << rang::style::bold;
    bool cur_yellow = false;
    for(int i = 0; i < splash.size(); i++) {
        const char splash_char = splash[i];
        bool is_letter = splash_char == '/' || splash_char == '\\';

        if(is_letter && !cur_yellow) {
            std::cout << rang::fg::reset << rang::fgB::yellow;
            cur_yellow = true;
        } else if(!is_letter && cur_yellow) {
            std::cout << rang::fg::reset << rang::fgB::blue;
            cur_yellow = false;
        }
        std::cout << splash[i];
        if(splash[i] == '\n')
            std::cout << std::flush;
    }
    std::cout << rang::style::reset << rang::bg::reset << rang::fg::reset;
    std::cout << std::endl;
#else
    std::cout << "       Welcome to ITK\n" << std::endl;
#endif
    std::istringstream stream(outputString);
    std::string line;
    bool description = true;
    bool usage = false;
    bool positionals = false;
    bool options = false;
    bool optionGroup = false;
    while (std::getline(stream, line)) {
      if (description) {
        std::cout << rang::fgB::magenta << rang::style::bold;
        std::cout << line << std::endl;
        std::cout << rang::fg::reset << rang::style::reset;
        description = false;
        usage = true;
      } else if(usage) {
        std::cout << rang::fg::yellow;
        std::cout << line.substr(0, 6);
        std::cout << rang::fg::reset; 
        std::cout << rang::fg::magenta;
        size_t optionsLoc = line.find("[OPTIONS]");
        size_t stop = optionsLoc - 7;
        size_t start = optionsLoc + 9;
        if (optionsLoc == std::string::npos)
        {
          stop = line.find("[");
          start = stop;
        }
        std::cout << line.substr(6, stop);
        std::cout << rang::style::bold; 
        std::cout << rang::fg::cyan;
        std::cout << line.substr(start);
        if (optionsLoc != std::string::npos)
        {
          std::cout << rang::fg::green;
          // Options should be passed after positions so the pipeline can be
          // specialized based on the type of the positionals
          std::cout << " [OPTIONS]";
        }
        std::cout << std::endl;
        std::cout << rang::fg::reset << rang::style::reset; 
        usage = false;
      } else if(positionals) {
        if (line == "") {
          std::cout << line << std::endl;
          positionals = false;
        } else {
          const size_t loc = line.find(' ', 3);
          std::cout << rang::fg::cyan;
          std::cout << line.substr(0, loc);
          std::cout << rang::fg::reset; 
          std::cout << line.substr(loc) << std::endl;
        }
      } else if(options) {
        if (line == "") {
          std::cout << line << std::endl;
          options = false;
        } else {
          const size_t loc = line.find(' ', 3);
          std::cout << rang::fg::green;
          std::cout << line.substr(0, loc);
          std::cout << rang::fg::reset; 
          std::cout << line.substr(loc) << std::endl;
        }
      } else if(optionGroup) {
        if (line == "") {
          std::cout << line << std::endl;
          optionGroup = false;
        } else {
          const size_t loc = line.find(' ', 3);
          std::cout << rang::fg::green;
          std::cout << line.substr(0, loc);
          std::cout << rang::fg::reset; 
          std::cout << line.substr(loc) << std::endl;
        }
      } else if(line == "Positionals:") {
        std::cout << rang::fg::yellow;
        std::cout << line << std::endl;
        std::cout << rang::fg::reset; 
        positionals = true;
      } else if(line == "Options:") {
        std::cout << rang::fg::yellow;
        std::cout << line << std::endl;
        std::cout << rang::fg::reset; 
        options = true;
      } else if(line == "Enjoy ITK!") {
        std::cout << rang::fg::blue << rang::style::italic;
        std::cout << line << std::endl;
        std::cout << rang::fg::reset << rang::style::reset; 
        options = true;
      } else if(line.back() == ':') {
        optionGroup = true;
        std::cout << rang::fg::yellow;
        std::cout << line << std::endl;
        std::cout << rang::fg::reset; 
      } else {
        std::cout << line << std::endl;
      }
    }
    return e.get_exit_code();
  }
#ifndef ITK_WASM_NO_FILESYSTEM_IO
  std::cout << (e.get_exit_code() == 0 ? rang::fgB::blue : rang::fgB::red);
#endif
  int rval = CLI::App::exit(e);
#ifndef ITK_WASM_NO_FILESYSTEM_IO
  std::cout << rang::fg::reset;
#endif
  return rval;
}

Pipeline
::~Pipeline()
{

}

bool Pipeline::m_UseMemoryIO{false};

} // end namespace wasm
} // end namespace itk
