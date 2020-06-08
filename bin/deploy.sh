#!/bin/bash

if [ "$1" == "production" ]
then
  image="914143089783.dkr.ecr.ap-northeast-2.amazonaws.com/noritake:latest"
else
  image="914143089783.dkr.ecr.ap-northeast-2.amazonaws.com/noritake-dev:latest"
fi

cd eb
cat Dockerrun.aws.json.template | IMAGE=$image envsubst > Dockerrun.aws.json
eb deploy
rm Dockerrun.aws.json
