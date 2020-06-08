#!/bin/bash

registry="914143089783.dkr.ecr.ap-northeast-2.amazonaws.com"

if [ "$1" == "production" ]
then
  env_path="production.env"
  image="914143089783.dkr.ecr.ap-northeast-2.amazonaws.com/noritake:latest"
else
  env_path="development.env"
  image="914143089783.dkr.ecr.ap-northeast-2.amazonaws.com/noritake-dev:latest"
fi

mv .env orig.env
aws s3 cp s3://noritake-envs/noritake/$env_path .env
docker-compose build noritake
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $registry
docker push $image
mv orig.env .env