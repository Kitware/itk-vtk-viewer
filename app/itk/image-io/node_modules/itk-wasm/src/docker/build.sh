#!/usr/bin/env bash

set -exo pipefail

script_dir="`cd $(dirname $0); pwd`"

$script_dir/itk-wasm-base/build.sh --with-wasi --version-tag $@
$script_dir/itk-wasm/build.sh --with-wasi --version-tag $@
