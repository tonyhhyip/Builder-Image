#!/bin/bash

#
# Note: This script runs inside Docker environment and expects
#       correct nvm setup. You can run this script to build
#       locally if:
#         a) You have nvm setup correctly; and
#         b) You have install yarn globally (`npm install -g yarn`)
#

DIR="$( cd "$(dirname $( dirname "${BASH_SOURCE[0]}" ))" && pwd )"
cd "$DIR"

if [ "$1" == "build" ] || [ "$1" == "" ]; then
  # actually build the site
  # use the build command (with proper NODE_ENV)
  echo
  echo "build the site"
  echo "=============="
  yarn build
else
  # pass command to gulp
  yarn run gulp -- "$@"
fi
