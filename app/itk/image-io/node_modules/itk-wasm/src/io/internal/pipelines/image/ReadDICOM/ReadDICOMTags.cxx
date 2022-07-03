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
#include <algorithm>
#include <fstream>
#include <iostream>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>
#include <string.h>

#include <iconv.h>

#include "rapidjson/document.h"
#include "rapidjson/stringbuffer.h"
#include "rapidjson/writer.h"

#include "itkCommonEnums.h"
#include "itkGDCMImageIO.h"
#include "itkGDCMSeriesFileNames.h"
#include "itkImageIOBase.h"
#include "itkMetaDataObject.h"

#include "itkPipeline.h"
#include "itkInputTextStream.h"
#include "itkOutputTextStream.h"

const std::string      DEFAULT_ENCODING("ISO_IR 6");
const std::string      DEFAULT_ISO_2022_ENCODING("ISO 2022 IR 6");
constexpr const char * ASCII = "ASCII";

// delimiters: CR, LF, FF, ESC, TAB (see
//  https://dicom.nema.org/medical/dicom/current/output/html/part05.html#sect_6.1.3,
//  table 6.1-1)
// Also includes 05/12 (BACKSLASH in IR 13 or YEN SIGN in IR 14), since that
//  separates Data Element Values and it resets to initial charset.
//  See: dicom part 5, sect 6.1.2.5.3
constexpr const char * DEFAULT_DELIMS = "\x1b\x09\x0a\x0c\x0d\x5c";
// DEFAULT_DELIMS + "^" and "="
constexpr const char * PATIENT_NAME_DELIMS = "\x1b\x09\x0a\x0c\x0d\x5c^=";

std::string
unpackMetaAsString(const itk::MetaDataObjectBase::Pointer & metaValue)
{
  using MetaDataStringType = itk::MetaDataObject<std::string>;
  MetaDataStringType::Pointer value = dynamic_cast<MetaDataStringType *>(metaValue.GetPointer());
  if (value != nullptr)
  {
    return value->GetMetaDataObjectValue();
  }
  return {};
}

// If not found, then pos == len
size_t
findDelim(const char * str, size_t len, size_t pos = 0, const char * delims = DEFAULT_DELIMS)
{
  while (pos < len && strchr(delims, str[pos]) == nullptr)
  {
    ++pos;
  }
  return pos;
}

std::string
trimWhitespace(const std::string & term)
{
  auto start = term.begin();
  auto end = term.end();

  while (start != end && std::isspace(*start))
  {
    ++start;
  }

  // need to --end once before checking isspace
  do
  {
    --end;
  } while (end != start && std::isspace(*end));

  return std::string(start, end + 1);
}

std::string
normalizeTerm(const std::string & term)
{
  return trimWhitespace(term);
}

const char *
definedTermToIconvCharset(const std::string & defTerm)
{
  // be strict about comparing defined terms, so no fancy parsing
  // that could possibly make these operations faster.
  // See:
  // https://dicom.nema.org/medical/dicom/current/output/chtml/part02/sect_D.6.2.html
  if (defTerm == "ISO_IR 6" || defTerm == "ISO 2022 IR 6")
  {
    return ASCII;
  }
  if (defTerm == "ISO_IR 100" || defTerm == "ISO 2022 IR 100")
  {
    return "ISO-8859-1"; // Latin 1
  }
  if (defTerm == "ISO_IR 101" || defTerm == "ISO 2022 IR 101")
  {
    return "ISO-8859-2"; // Latin 2
  }
  if (defTerm == "ISO_IR 109" || defTerm == "ISO 2022 IR 109")
  {
    return "ISO-8859-3"; // Latin 3
  }
  if (defTerm == "ISO_IR 110" || defTerm == "ISO 2022 IR 110")
  {
    return "ISO-8859-4"; // Latin 4
  }
  if (defTerm == "ISO_IR 144" || defTerm == "ISO 2022 IR 144")
  {
    return "ISO-8859-5"; // Cyrillic
  }
  if (defTerm == "ISO_IR 127" || defTerm == "ISO 2022 IR 127")
  {
    return "ISO-8859-6"; // Arabic
  }
  if (defTerm == "ISO_IR 126" || defTerm == "ISO 2022 IR 126")
  {
    return "ISO-8859-7"; // Greek
  }
  if (defTerm == "ISO_IR 138" || defTerm == "ISO 2022 IR 138")
  {
    return "ISO-8859-8"; // Hebrew
  }
  if (defTerm == "ISO_IR 148" || defTerm == "ISO 2022 IR 148")
  {
    return "ISO-8859-9"; // Latin 5, Turkish
  }
  if (defTerm == "ISO_IR 13" || defTerm == "ISO 2022 IR 13")
  {
    // while technically not strict, SHIFT_JIS succeeds JIS X 0201
    // See: https://en.wikipedia.org/wiki/JIS_X_0201
    return "SHIFT_JIS"; // Japanese
  }
  if (defTerm == "ISO_IR 166" || defTerm == "ISO 2022 IR 166")
  {
    return "TIS-620"; // Thai
  }
  if (defTerm == "ISO 2022 IR 87")
  {
    // see: https://en.wikipedia.org/wiki/JIS_X_0208
    return "ISO-2022-JP"; // Japanese
  }
  if (defTerm == "ISO 2022 IR 159")
  {
    // see: https://en.wikipedia.org/wiki/JIS_X_0212
    return "ISO-2022-JP-1"; // Japanese
  }
  if (defTerm == "ISO 2022 IR 149")
  {
    return "EUC-KR"; // Korean
  }
  if (defTerm == "ISO 2022 IR 58")
  {
    return "EUC-CN"; // Chinese
  }
  if (defTerm == "ISO_IR 192")
  {
    return "UTF-8";
  }
  if (defTerm == "GB18030")
  {
    return "GB18030";
  }
  if (defTerm == "GBK")
  {
    return "GBK";
  }
  return nullptr;
}

// seq should be the sequence after the ESC char
// return value should match in definedTermToIconvCharset
const char *
iso2022EscSelectCharset(const char * seq)
{
  if (seq[0] == '(' && seq[1] == 'B')
  {
    return "ISO 2022 IR 6";
  }
  if (seq[0] == '-' && seq[1] == 'A')
  {
    return "ISO 2022 IR 100";
  }
  if (seq[0] == '-' && seq[1] == 'B')
  {
    return "ISO 2022 IR 101";
  }
  if (seq[0] == '-' && seq[1] == 'C')
  {
    return "ISO 2022 IR 109";
  }
  if (seq[0] == '-' && seq[1] == 'D')
  {
    return "ISO 2022 IR 110";
  }
  if (seq[0] == '-' && seq[1] == 'L')
  {
    return "ISO 2022 IR 144";
  }
  if (seq[0] == '-' && seq[1] == 'G')
  {
    return "ISO 2022 IR 127";
  }
  if (seq[0] == '-' && seq[1] == 'F')
  {
    return "ISO 2022 IR 126";
  }
  if (seq[0] == '-' && seq[1] == 'H')
  {
    return "ISO 2022 IR 138";
  }
  if (seq[0] == '-' && seq[1] == 'M')
  {
    return "ISO 2022 IR 148";
  }
  // technically 'J' corresponds to IR 14, byt SHIFT_JIS should still work
  if (seq[0] == '-' && (seq[1] == 'I' || seq[1] == 'J'))
  {
    return "ISO 2022 IR 13";
  }
  if (seq[0] == '-' && seq[1] == 'T')
  {
    return "ISO 2022 IR 166";
  }
  if (seq[0] == '$' && seq[1] == 'B')
  {
    return "ISO 2022 IR 87";
  }
  if (seq[0] == '$' && seq[1] == '(' && seq[2] == 'D')
  {
    return "ISO 2022 IR 159";
  }
  if (seq[0] == '$' && seq[1] == ')' && seq[2] == 'C')
  {
    return "ISO 2022 IR 149";
  }
  if (seq[0] == '$' && seq[1] == ')' && seq[2] == 'A')
  {
    return "ISO 2022 IR 58";
  }
  if ((seq[0] == ')' && seq[1] == 'I') || (seq[0] == '(' && seq[1] == 'J'))
  {
    return "ISO 2022 IR 13";
  }
  return "";
}

// seq should point after the ESC char. Returned length will
// not include ESC char.
size_t
iso2022EscSeqLength(const char * seq)
{
  if (seq[0] == '$' && seq[1] >= '(' && seq[1] <= '/')
  {
    return 3;
  }
  return 2;
}

class CharStringToUTF8Converter
{
public:
  // See: setSpecificCharacterSet(const char *)
  CharStringToUTF8Converter(const std::string & spcharsets)
    : CharStringToUTF8Converter(spcharsets.c_str())
  {}
  CharStringToUTF8Converter(const char * spcharsets)
    : handlePatientName(false)
  {
    this->setSpecificCharacterSet(spcharsets);
  };

  /**
   * Input must be the DICOM SpecificCharacterSet element value.
   * See:
   * https://dicom.nema.org/medical/dicom/current/output/html/part03.html#sect_C.12.1.1.2
   */
  void
  setSpecificCharacterSet(const char * spcharsets)
  {
    std::string        specificCharacterSet(spcharsets);
    std::string        token;
    std::istringstream tokStream(specificCharacterSet);

    m_charsets.clear();

    int count = 0;
    while (std::getline(tokStream, token, '\\'))
    {
      token = normalizeTerm(token);

      // case: first element is empty. Use default ISO-IR 6 encoding.
      if (token.size() == 0 && count == 0)
      {
        m_charsets.push_back(DEFAULT_ENCODING);
        // "Hack" to handle case where ISO-646 (dicom default encoding) is
        // implicitly first in the list. Since we check for charset existence when
        // switching charsets as per ISO 2022, we put both regular and ISO 2022
        // names for the default encoding.
        m_charsets.push_back(DEFAULT_ISO_2022_ENCODING);
      }
      else if (m_charsets.end() == std::find(m_charsets.begin(), m_charsets.end(), token))
      {
        // case: no duplicates
        const char * chname = definedTermToIconvCharset(token);
        // handle charsets that do not allow code extensions
        if (count > 0 && (token == "GB18030" || token == "GBK" || token == "ISO_IR 192"))
        {
          std::cerr << "WARN: charset " << token << " does not support code extensions; ignoring" << std::endl;
        }
        else if (chname != nullptr && chname != ASCII)
        {
          // ISO_IR 6 isn't a formally recognized defined term, so use ASCII
          // above.
          m_charsets.push_back(token);
        }
      }
      else
      {
        std::cerr << "WARN: Found duplicate charset '" + token + "'; ignoring" << std::endl;
      }
      ++count;
    }

    if (count == 0)
    {
      // use default encoding
      m_charsets.push_back(DEFAULT_ENCODING);
    }

    if (m_charsets.size() == 0)
    {
      std::cerr << "WARN: Found no suitable charsets!" << std::endl;
    }
  }

  std::string
  convertCharStringToUTF8(const std::string & str)
  {
    size_t len = str.size();
    return this->convertCharStringToUTF8(str.c_str(), len);
  }

  std::string
  convertCharStringToUTF8(const char * str, size_t len)
  {
    // m_charsets must always have at least 1 element prior to calling
    const char * initialCharset = definedTermToIconvCharset(m_charsets[0]);
    if (initialCharset == nullptr)
    {
      return {};
    }

    iconv_t cd = iconv_open("UTF-8", initialCharset);
    if (cd == (iconv_t)-1)
    {
      return {};
    }

    int                     utf8len = len * 4;
    std::unique_ptr<char[]> result(new char[utf8len + 1]()); // UTF8 will have max length of utf8len

    // make a copy because iconv requires a char *
    char * copiedStr = (char *)malloc(len + 1);
    strncpy(copiedStr, str, len);

    char * inbuf = copiedStr;
    char * outbuf = result.get();
    size_t inbytesleft = len;
    size_t outbytesleft = utf8len;

    // special case: only one charset, so assume string is just that charset.
    if (m_charsets.size() == 1)
    {
      iconv(cd, &inbuf, &inbytesleft, &outbuf, &outbytesleft);
    }
    else
    {
      size_t fragmentStart = 0;
      size_t fragmentEnd = 0;

      while (fragmentStart < len)
      {
        const char * delims = this->handlePatientName ? PATIENT_NAME_DELIMS : DEFAULT_DELIMS;
        // fragmentEnd will always be end of current fragment (exclusive end)
        fragmentEnd = findDelim(str, len, fragmentStart + 1, delims);
        inbuf = copiedStr + fragmentStart;
        inbytesleft = fragmentEnd - fragmentStart;

        iconv(cd, &inbuf, &inbytesleft, &outbuf, &outbytesleft);

        fragmentStart = fragmentEnd;
        bool isEsc = str[fragmentEnd] == 0x1b;

        if (fragmentStart < len)
        {
          const char * nextCharset;
          int          seek = 0;

          if (isEsc)
          { // case: ISO 2022 escape encountered
            const char * escSeq = copiedStr + fragmentStart + 1;

            const char * nextTerm = iso2022EscSelectCharset(escSeq);
            nextCharset = definedTermToIconvCharset(std::string(nextTerm));
            if (nextCharset == nullptr || m_charsets.end() == std::find(m_charsets.begin(), m_charsets.end(), nextTerm))
            {
              std::cerr << "WARN: bailing because invalid charset: " << nextTerm << std::endl;
              break; // bail out
            }

            // ISO-2022-JP is a variant on ISO 2022 for japanese, and so
            // it defines its own escape sequences. As such, do not skip the
            // escape sequences for ISO-2022-JP, so iconv can properly interpret
            // them.
            if (0 != strcmp("ISO-2022-JP", nextCharset) && 0 != strcmp("ISO-2022-JP-1", nextCharset))
            {
              seek = iso2022EscSeqLength(escSeq) + 1;
            }
          }
          else
          { // case: hit a CR, LF, or FF
            // reset to initial charset
            nextCharset = initialCharset;
          }

          if (0 != iconv_close(cd))
          {
            std::cerr << "WARN: bailing because iconv_close" << std::endl;
            break; // bail out
          }
          cd = iconv_open("UTF-8", nextCharset);
          if (cd == (iconv_t)-1)
          {
            std::cerr << "WARN: bailing because iconv_open" << std::endl;
            break; // bail out
          }

          fragmentStart += seek;
        }
      }
    }

    free(copiedStr);
    iconv_close(cd);

    // since result is filled with NULL bytes, string constructor will figure out
    // the correct string ending.
    return std::string(result.get());
  }

  bool
  getHandlePatientName()
  {
    return this->handlePatientName;
  }

  void
  setHandlePatientName(bool yn)
  {
    this->handlePatientName = yn;
  }

private:
  std::vector<std::string> m_charsets;
  bool                     handlePatientName;
};

namespace itk
{

/** \class DICOMTagReader
 *
 * \brief Reads DICOM tags from a DICOM object.
 */
class DICOMTagReader
{
public:
  using MetaDictType = itk::MetaDataDictionary;
  using TagMapType = std::map<std::string, std::string>;

  DICOMTagReader()
    : m_dirtyCache(true)
  {
    m_GDCMImageIO = GDCMImageIO::New();
  }

  /** Sets file name. */
  void
  SetFileName(const std::string & file)
  {
    m_fileName = file;
    m_GDCMImageIO->SetFileName(file);
    m_dirtyCache = true;
  }

  /** Verify file can be read. */
  bool
  CanReadFile(const std::string & file)
  {
    return m_GDCMImageIO->CanReadFile(file.c_str());
  }

  std::string
  ReadTag(const std::string & tag)
  {

    if (m_dirtyCache)
    {
      m_GDCMImageIO->SetUseStreamedReading(true);
      m_GDCMImageIO->ReadImageInformation();
      m_tagDict = m_GDCMImageIO->GetMetaDataDictionary();
      auto specificCharacterSet = unpackMetaAsString(m_tagDict["0008|0005"]);
      m_decoder = CharStringToUTF8Converter(specificCharacterSet);
      m_dirtyCache = false;
    }

    auto value = unpackMetaAsString(m_tagDict[tag]);
    return m_decoder.convertCharStringToUTF8(value);
  }

  TagMapType
  ReadAllTags()
  {

    if (m_dirtyCache)
    {
      m_GDCMImageIO->SetUseStreamedReading(true);
      m_GDCMImageIO->ReadImageInformation();
      m_tagDict = m_GDCMImageIO->GetMetaDataDictionary();
      auto specificCharacterSet = unpackMetaAsString(m_tagDict["0008|0005"]);
      m_decoder = CharStringToUTF8Converter(specificCharacterSet);
      m_dirtyCache = false;
    }

    TagMapType allTagsDict;
    for (auto it = m_tagDict.Begin(); it != m_tagDict.End(); ++it)
    {
      auto value = unpackMetaAsString(it->second);
      allTagsDict[it->first] = m_decoder.convertCharStringToUTF8(value);
    }

    return allTagsDict;
  }

private:
  std::string               m_fileName;
  itk::GDCMImageIO::Pointer m_GDCMImageIO;
  MetaDictType              m_tagDict;
  CharStringToUTF8Converter m_decoder = CharStringToUTF8Converter("");
  bool                      m_dirtyCache;
};

} // end namespace itk

int main( int argc, char * argv[] )
{
  itk::wasm::Pipeline pipeline("Read the tags from a DICOM file", argc, argv);

  std::string dicomFile;
  pipeline.add_option("DICOMFile", dicomFile, "Input DICOM file.")->required()->check(CLI::ExistingFile);

  itk::wasm::InputTextStream tagsToReadStream;
  pipeline.add_option("--tags-to-read", tagsToReadStream, "A JSON object with a \"tags\" array of the tags to read. If not provided, all tags are read. Example tag: \"0010|0020\".");

  itk::wasm::OutputTextStream tagsStream;
  pipeline.add_option("Tags", tagsStream, "Output tags in the file. JSON object with a \"tags\" array of arrays. Values are encoded as UTF-8 strings.")->required();

  ITK_WASM_PARSE(pipeline);

  itk::DICOMTagReader dicomTagReader;

  dicomTagReader.SetFileName(dicomFile);
  if (!dicomTagReader.CanReadFile(dicomFile))
  {
    std::cerr << "Could not read the input DICOM file" << std::endl;
    return EXIT_FAILURE;
  }

  if (tagsToReadStream.GetPointer() == nullptr)
  {
    const auto dicomTags = dicomTagReader.ReadAllTags();

    rapidjson::Document document;
    document.SetObject();
    rapidjson::Document::AllocatorType& allocator = document.GetAllocator();
    rapidjson::Value tagsArray(rapidjson::kArrayType);
    for (const auto& [tag, value] : dicomTags) {
      rapidjson::Value tagArray(rapidjson::kArrayType);

      rapidjson::Value tagName;
      tagName.SetString(tag.c_str(), allocator);
      tagArray.PushBack(tagName, allocator);

      rapidjson::Value tagValue;
      tagValue.SetString(value.c_str(), allocator);
      tagArray.PushBack(tagValue, allocator);

      tagsArray.PushBack(tagArray.Move(), allocator);
    }
    document.AddMember("tags", tagsArray.Move(), allocator);

    rapidjson::StringBuffer stringBuffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(stringBuffer);
    document.Accept(writer);

    tagsStream.Get() << stringBuffer.GetString();
  }
  else
  {
    rapidjson::Document inputTagsDocument;
    const std::string inputTagsString((std::istreambuf_iterator<char>(tagsToReadStream.Get())),
                                       std::istreambuf_iterator<char>());
    if (inputTagsDocument.Parse(inputTagsString.c_str()).HasParseError())
      {
      CLI::Error err("Runtime error", "Could not parse input tags JSON.", 1);
      return pipeline.exit(err);
      }
    if (!inputTagsDocument.HasMember("tags"))
      {
      CLI::Error err("Runtime error", "Input tags does not have expected \"tags\" member", 1);
      return pipeline.exit(err);
      }

    rapidjson::Document document;
    document.SetObject();
    rapidjson::Document::AllocatorType& allocator = document.GetAllocator();
    rapidjson::Value tagsArray(rapidjson::kArrayType);
    const rapidjson::Value & inputTagsArray = inputTagsDocument["tags"];

    for( rapidjson::Value::ConstValueIterator itr = inputTagsArray.Begin(); itr != inputTagsArray.End(); ++itr )
    {
      rapidjson::Value tagArray(rapidjson::kArrayType);

      const std::string tagString(itr->GetString());
      rapidjson::Value tagName;
      tagName.SetString(tagString.c_str(), allocator);
      tagArray.PushBack(tagName, allocator);

      rapidjson::Value tagValue;
      std::string tagLower(tagString);
      std::transform(tagLower.begin(), tagLower.end(), tagLower.begin(), ::tolower);
      tagValue.SetString(dicomTagReader.ReadTag(tagLower).c_str(), allocator);
      tagArray.PushBack(tagValue, allocator);

      tagsArray.PushBack(tagArray.Move(), allocator);
    }
    document.AddMember("tags", tagsArray.Move(), allocator);

    rapidjson::StringBuffer stringBuffer;
    rapidjson::Writer<rapidjson::StringBuffer> writer(stringBuffer);
    document.Accept(writer);

    tagsStream.Get() << stringBuffer.GetString();
  }

  return EXIT_SUCCESS;
}