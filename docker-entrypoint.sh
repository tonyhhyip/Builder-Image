#!/bin/bash

DIR="$( cd "$(dirname $( dirname "${BASH_SOURCE[0]}" ))" && pwd )"
cd "$DIR"

if [ "$1" == "build" ] || [ "$1" == "" ]; then
  # actually build the site
  # use the build command (with proper NODE_ENV)
  echo
  echo "build the site"
  echo "=============="
  npm run build
else
  # pass command to gulp
  yarn run gulp -- "$@"
fi
