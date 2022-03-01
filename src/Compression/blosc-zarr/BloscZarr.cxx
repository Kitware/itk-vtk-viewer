#include <stdio.h>
#include <blosc.h>

#include "itkPipeline.h"
#include "itkInputBinaryStream.h"
#include "itkOutputBinaryStream.h"
#include <fstream>

int main(int argc, char * argv[]){

  itk::wasm::Pipeline pipeline ("Compress or decompress binaries with Blosc", argc, argv);

  itk::wasm::InputBinaryStream input_binary_stream;
  pipeline.add_option("input-binary-stream", input_binary_stream, "The input binary stream")->required();

  itk::wasm::OutputBinaryStream output_binary_stream;
  pipeline.add_option("output-binary-stream", output_binary_stream, "The output binary stream")->required();

  std::string compressor;
  pipeline.add_option("compressor", compressor, "Blosc compressor")->required();

  size_t input_size;
  pipeline.add_option("input-size", input_size, "Input binary size in bytes")->required();

  bool decompress = false;
  const auto decompress_option = pipeline.add_flag("-d,--decompress", decompress, "Decompress instead of compress");

  size_t output_size = 0;
  pipeline.add_option("--output-size", output_size, "Output binary size in bytes")->needs(decompress_option);

  int compression_level = 3;
  pipeline.add_option("-c,--compression-level", compression_level, "Compression level in compression, 0 to 9")->excludes(decompress_option);

  size_t typesize = 1;
  pipeline.add_option("--typesize", typesize, "Assumed type size in compression")->excludes(decompress_option);

  bool no_shuffle = false;
  pipeline.add_flag("--no-shuffle", no_shuffle, "Do not add bitshuffle support in compression")->excludes(decompress_option);

  bool verbose = false;
  pipeline.add_flag("-v,--verbose", verbose, "Output status information");

  ITK_WASM_PARSE(pipeline);

  /* Register the filter with the library */
  if (verbose)
    {
    printf("Blosc version info: %s (%s)\n", BLOSC_VERSION_STRING, BLOSC_VERSION_DATE);
    }

  /* Initialize the Blosc compressor */
  blosc_init();

  const int nthreads = 1;
  const int pnthreads = blosc_set_nthreads(nthreads);
  if (verbose)
    {
    printf("Using %d threads (previously using %d)\n", nthreads, pnthreads);
    }

  int rcode = blosc_set_compressor(compressor.c_str());
  if (rcode < 0)
    {
    printf("Error setting %s compressor. Does it really exist?\n", compressor.c_str());
    blosc_destroy();
    return rcode;
    }
  if (verbose)
    {
    printf("Using %s compressor\n", compressor.c_str());
    }

  void * input_array = malloc(input_size);
  if(input_array == NULL)
    {
    printf("Input memory allocation failed\n");
    blosc_destroy();
    return 1;
    }
  input_binary_stream.Get().read(static_cast<char *>(input_array), input_size);
  const auto read_size = input_binary_stream.Get().gcount();
  if(read_size != input_size)
    {
    printf("Could only read %zu bytes from input file.\n", read_size);
    blosc_destroy();
    free(input_array);
    return 1;
    }
  if (!decompress)
    {
    output_size = input_size;
    }
  else if(output_size == 0)
    {
    blosc_destroy();
    free(input_array);
    CLI::Error err("Runtime error", "--output-size must be specified for decompression", 1);
    pipeline.exit(err);
    return 1;
    }
  void * output_array = malloc(output_size + BLOSC_MAX_OVERHEAD);
  if(output_array == NULL)
    {
    printf("Output memory allocation failed\n");
    blosc_destroy();
    free(input_array);
    return 1;
    }

  if (!decompress)
    {
    if (verbose)
      {
      printf("Compression level %d\n", compression_level);
      }
    /* Compress */
    const size_t compressed_size = blosc_compress(compression_level, !no_shuffle, typesize, input_size, input_array, output_array, output_size + BLOSC_MAX_OVERHEAD);
    free(input_array);
    /* After using it, destroy the Blosc environment */
    blosc_destroy();
    if (compressed_size < 0)
      {
      printf("Compression error. Error code: %lu\n", compressed_size);
      free(output_array);
      return compressed_size;
      }

    if (verbose)
      {
      printf("Compression: %zu -> %lu (%.1fx)\n", input_size, compressed_size, (1.*input_size) / compressed_size);
      }

    output_binary_stream.Get().write(static_cast<char *>(output_array), compressed_size);
    free(output_array);
    }
  else
    {
    /* Decompress */
    const int decompressed_size = blosc_decompress(input_array, output_array, output_size);
    free(input_array);
    /* After using it, destroy the Blosc environment */
    blosc_destroy();
    if (decompressed_size < 0)
      {
      printf("Decompression error. Error code: %d\n", decompressed_size);
      free(output_array);
      return decompressed_size;
      }
    output_binary_stream.Get().write(static_cast<char *>(output_array), output_size);
    free(output_array);
    }

  return 0;
}
