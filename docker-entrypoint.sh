#!/bin/bash

set -e

cd /website

git reset --hard
git pull origin `cat /BRANCH`

yarn run install

yarn run build

