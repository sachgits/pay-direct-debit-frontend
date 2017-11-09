#!/bin/bash

if [ -d "node_modules_local" ]; then
    rm -rf node_modules_local
fi

if [ -d "node_modules" ]; then
  mv node_modules node_modules_local
fi

docker build --file docker/build_and_test.Dockerfile -t govukpay/directdebit-frontend-build:local . &&\
docker run --volume $(pwd):/app:rw govukpay/directdebit-frontend-build:local &&\
docker build -t govukpay/products-ui:local .

if [ -d "node_modules" ]; then
  rm -rf node_modules
fi

if [ -d "node_modules_local" ]; then
  mv node_modules_local node_modules
fi
