#!/bin/bash

cd /app

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
