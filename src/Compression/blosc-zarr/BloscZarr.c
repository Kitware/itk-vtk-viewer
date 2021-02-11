#include <stdio.h>
#include <blosc.h>

int main(int argc, char * argv[]){
  if (argc < 6)
    {
    printf("Usage: %s <input_array_file> <output_array_file> <compressor> <input_size> <output_size> [clevel] [csize] [typesize] [shuffle]", argv[0]);
    printf("If clevel (compression level) argument supplied, compression is applied to the input binary file.\n");
    printf("Otherwise, decompression is applied to the input binary file.\n");
    return 1;
    }
  const char * input_filename = argv[1];
  const char * output_filename = argv[2];
  const char * compressor = argv[3];
  const size_t input_size = atoi(argv[4]);
  const size_t output_size = atoi(argv[5]);
  // 0 to 9
  int clevel = -1;
  size_t typesize = 1;
  int shuffle = 1;
  if (argc > 6)
    {
    clevel = atoi(argv[6]);
    }
  if (argc > 7)
    {
    typesize = atoi(argv[7]);
    }
  if (argc > 8)
    {
    shuffle = atoi(argv[8]);
    }


  /* Register the filter with the library */
  // printf("Blosc version info: %s (%s)\n", BLOSC_VERSION_STRING, BLOSC_VERSION_DATE);

  /* Initialize the Blosc compressor */
  blosc_init();

  const int nthreads = 1;
  const int pnthreads = blosc_set_nthreads(nthreads);
  // printf("Using %d threads (previously using %d)\n", nthreads, pnthreads);

  int rcode = blosc_set_compressor(compressor);
  if (rcode < 0)
    {
    printf("Error setting %s compressor. Does it really exist?", compressor);
    blosc_destroy();
    return rcode;
    }
  // printf("Using %s compressor\n", compressor);


  FILE * input_array_file = fopen(input_filename, "rb");
  if(input_array_file == NULL)
    {
    printf("Error opening input file: %s\n", input_filename);
    blosc_destroy();
    return 1;
    }
  void * input_array = malloc(input_size);
  if(input_array == NULL)
    {
    printf("Input memory allocation failed");
    blosc_destroy();
    fclose(input_array_file);
    return 1;
    }
  const size_t read_size = fread(input_array, 1, input_size, input_array_file);
  fclose(input_array_file);
  if(read_size != input_size)
    {
    printf("Could only read %zu bytes from input file.\n", read_size);
    blosc_destroy();
    free(input_array);
    return 1;
    }
  void * output_array = malloc(output_size + BLOSC_MAX_OVERHEAD);
  if(output_array == NULL)
    {
    printf("Output memory allocation failed");
    blosc_destroy();
    free(input_array);
    return 1;
    }

  if (clevel >= 0)
    {
    printf("Compression level %d", clevel);
    /* Compress */
    const int compressed_size = blosc_compress(clevel, shuffle, typesize, input_size, input_array, output_array, output_size + BLOSC_MAX_OVERHEAD);
    free(input_array);
    /* After using it, destroy the Blosc environment */
    blosc_destroy();
    if (compressed_size < 0)
      {
      printf("Compression error.  Error code: %d\n", compressed_size);
      free(output_array);
      return compressed_size;
      }

    printf("Compression: %zu -> %d (%.1fx)\n", input_size, compressed_size, (1.*input_size) / compressed_size);

    FILE * output_array_file = fopen(output_filename, "wb");
    if(output_array_file == NULL)
      {
      printf("Error opening output file: %s\n", output_filename);
      free(output_array);
      return 1;
      }
    const size_t write_size = fwrite(output_array, 1, compressed_size, output_array_file);
    fclose(output_array_file);
    free(output_array);
    if(write_size != compressed_size)
      {
      printf("Could not write read %zu bytes to output file.\n", write_size);
      return 1;
      }
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
      printf("Decompression error.  Error code: %d\n", decompressed_size);
      free(output_array);
      return decompressed_size;
      }
    FILE * output_array_file = fopen(output_filename, "wb");
    if(output_array_file == NULL)
      {
      printf("Error opening output file: %s\n", output_filename);
      free(output_array);
      return 1;
      }
    const size_t write_size = fwrite(output_array, 1, output_size, output_array_file);
    fclose(output_array_file);
    free(output_array);
    if(write_size != output_size)
      {
      printf("Could not write read %zu bytes to output file.\n", write_size);
      return 1;
      }
    }

  return 0;
}
