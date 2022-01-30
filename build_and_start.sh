#!/usr/bin/env bash

if [ -z "$(which npm)" ]; then
  echo "ERROR: couldn't find npm, please check if Node.js is installed"
  exit 1
fi
if [ -z "$(which docker)" ]; then
  echo "ERROR: couldn't find docker executable, please check if Docker is installed"
  exit 1
fi

npm install
npm run build
docker build -t aerokhina-wolt-2022 .
docker run -ti --rm -p 3000:3000 aerokhina-wolt-2022
