#!/usr/bin/env bash

set -eo pipefail

debug=true
for param; do
  if [[ $param == '--no-debug' ]]; then
    debug=false
  else
    newparams+=("$param")
  fi
done
set -- "${newparams[@]}"  # overwrites the original positional params

TAG=$(date '+%Y%m%d')-$(git rev-parse --short HEAD)

if test ! -z ${DOCKERHUB_ITKWASM_PASSWORD+x}; then
  echo $DOCKERHUB_ITKWASM_PASSWORD | docker login --username "$DOCKERHUB_ITKWASM_USERNAME" --password-stdin
fi

docker push itkwasm/wasi:${TAG}
docker push itkwasm/wasi:latest
docker push itkwasm/emscripten-base:latest

docker push itkwasm/emscripten:${TAG}
docker push itkwasm/emscripten:latest
docker push itkwasm/wasi-base:latest

if $debug; then
  docker push itkwasm/wasi:${TAG}-debug
  docker push itkwasm/wasi:latest-debug

  docker push itkwasm/emscripten-base:latest-debug
  docker push itkwasm/emscripten:${TAG}-debug
  docker push itkwasm/emscripten:latest-debug
  docker push itkwasm/wasi-base:latest-debug
fi