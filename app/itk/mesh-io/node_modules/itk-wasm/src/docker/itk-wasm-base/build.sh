#!/usr/bin/env bash

set -exo pipefail

script_dir="`cd $(dirname $0); pwd`"

TAG=$(date '+%Y%m%d')-$(git rev-parse --short HEAD)
VCS_REF=$(git rev-parse --short HEAD)
VCS_URL="https://github.com/InsightSoftwareConsortium/itk-wasm"
BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

debug=false
wasi=false
version_tag=false
for param; do
  if [[ $param == '--with-debug' ]]; then
    debug=true
  elif [[ $param == '--with-wasi' ]]; then
    wasi=true
  elif [[ $param == '--version-tag' ]]; then
    version_tag=true
  else
    newparams+=("$param")
  fi
done
set -- "${newparams[@]}"  # overwrites the original positional params

wasi_ld_flags="-flto -lwasi-emulated-process-clocks -lwasi-emulated-signal"
wasi_c_flags="-flto -D_WASI_EMULATED_PROCESS_CLOCKS -D_WASI_EMULATED_SIGNAL"

emscripten_debug_ld_flags="-fno-lto -s ALLOW_MEMORY_GROWTH=1"
emscripten_debug_c_flags="-fno-lto -Wno-warn-absolute-paths"

wasi_debug_ld_flags="-fno-lto -lwasi-emulated-process-clocks -lwasi-emulated-signal"
wasi_debug_c_flags="-fno-lto -D_WASI_EMULATED_PROCESS_CLOCKS -D_WASI_EMULATED_SIGNAL"

docker build -t itkwasm/emscripten-base:latest \
        --build-arg IMAGE=itkwasm/emscripten-base \
        --build-arg CMAKE_BUILD_TYPE=Release \
        --build-arg VCS_REF=${VCS_REF} \
        --build-arg VCS_URL=${VCS_URL} \
        --build-arg BUILD_DATE=${BUILD_DATE} \
        $script_dir $@
if $version_tag; then
        docker build -t itkwasm/emscripten-base:${TAG} \
                --build-arg IMAGE=itkwasm/emscripten-base \
                --build-arg CMAKE_BUILD_TYPE=Release \
                --build-arg VERSION=${TAG} \
                --build-arg VCS_REF=${VCS_REF} \
                --build-arg VCS_URL=${VCS_URL} \
                --build-arg BUILD_DATE=${BUILD_DATE} \
                $script_dir $@
fi

if $wasi; then
  docker build -t itkwasm/wasi-base:latest \
          --build-arg IMAGE=itkwasm/wasi-base \
          --build-arg CMAKE_BUILD_TYPE=Release \
          --build-arg VCS_REF=${VCS_REF} \
          --build-arg VCS_URL=${VCS_URL} \
          --build-arg BUILD_DATE=${BUILD_DATE} \
          --build-arg BASE_IMAGE=dockcross/web-wasi \
          --build-arg LDFLAGS="${wasi_ld_flags}" \
          --build-arg CFLAGS="${wasi_c_flags}" \
          $script_dir $@
        if $version_tag; then
                docker build -t itkwasm/wasi-base:${TAG} \
                        --build-arg IMAGE=itkwasm/wasi-base \
                        --build-arg CMAKE_BUILD_TYPE=Release \
                        --build-arg VERSION=${TAG} \
                        --build-arg VCS_REF=${VCS_REF} \
                        --build-arg VCS_URL=${VCS_URL} \
                        --build-arg BUILD_DATE=${BUILD_DATE} \
                        --build-arg BASE_IMAGE=dockcross/web-wasi \
                        --build-arg LDFLAGS="${wasi_ld_flags}" \
                        --build-arg CFLAGS="${wasi_c_flags}" \
                        $script_dir $@
        fi
fi


if $debug; then
  docker build -t itkwasm/emscripten-base:latest-debug \
          --build-arg IMAGE=itkwasm/emscripten-base \
          --build-arg CMAKE_BUILD_TYPE=Debug \
          --build-arg USE_DCMTK=OFF \
          --build-arg VCS_REF=${VCS_REF} \
          --build-arg VCS_URL=${VCS_URL} \
          --build-arg BUILD_DATE=${BUILD_DATE} \
          --build-arg LDFLAGS="${emscripten_debug_ld_flags}" \
          --build-arg CFLAGS="${emscripten_debug_c_flags}" \
          $script_dir $@
  if $version_tag; then
        docker build -t itkwasm/emscripten-base:${TAG}-debug \
                --build-arg IMAGE=itkwasm/emscripten-base \
                --build-arg CMAKE_BUILD_TYPE=Debug \
                --build-arg USE_DCMTK=OFF \
                --build-arg VERSION=${TAG}-debug \
                --build-arg VCS_REF=${VCS_REF} \
                --build-arg VCS_URL=${VCS_URL} \
                --build-arg BUILD_DATE=${BUILD_DATE} \
                --build-arg LDFLAGS="${emscripten_debug_ld_flags}" \
                --build-arg CFLAGS="${emscripten_debug_c_flags}" \
                $script_dir $@
  fi
  if $wasi; then
    docker build -t itkwasm/wasi-base:latest-debug \
            --build-arg IMAGE=itkwasm/wasi-base \
            --build-arg CMAKE_BUILD_TYPE=Debug \
            --build-arg VCS_REF=${VCS_REF} \
            --build-arg VCS_URL=${VCS_URL} \
            --build-arg BUILD_DATE=${BUILD_DATE} \
            --build-arg BASE_IMAGE=dockcross/web-wasi \
            --build-arg LDFLAGS="${wasi_debug_ld_flags}" \
            --build-arg CFLAGS="${wasi_debug_c_flags}" \
            $script_dir $@
    if $version_tag; then
        docker build -t itkwasm/wasi-base:${TAG}-debug \
                --build-arg IMAGE=itkwasm/wasi-base \
                --build-arg CMAKE_BUILD_TYPE=Debug \
                --build-arg VERSION=${TAG} \
                --build-arg VCS_REF=${VCS_REF} \
                --build-arg VCS_URL=${VCS_URL} \
                --build-arg BUILD_DATE=${BUILD_DATE} \
                --build-arg BASE_IMAGE=dockcross/web-wasi \
                --build-arg LDFLAGS="${wasi_debug_ld_flags}" \
                --build-arg CFLAGS="${wasi_debug_c_flags}" \
                $script_dir $@
    fi
  fi
fi
