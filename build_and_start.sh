#!/usr/bin/env bash

if [ -z "$(which docker)" ]; then
  echo "ERROR: couldn't find docker executable, please check if Docker is installed"
  exit 1
fi

docker build -t aerokhina-wolt-2022 .
if [ $? -eq 0 ]; then
  docker run -ti --rm -p 3000:3000 aerokhina-wolt-2022
fi
