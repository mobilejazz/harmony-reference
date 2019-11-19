#!/bin/bash

# get the commit id for the latest commit in HEAD
DOCKER_IMAGE_TAG="$(git rev-parse --short HEAD)"

# first prepare build the image
docker build -t joselufo/harmony-reference:$DOCKER_IMAGE_TAG -f ../Dockerfile ../.

# copying and adding the new docker image tag into the enviroment file
echo "HARMONY_REFERENCE_VERSION=${DOCKER_IMAGE_TAG}" > ../docker/.env

cat password.txt | docker login --username joselufo --password-stdin

docker push joselufo/harmony-reference:$DOCKER_IMAGE_TAG

# copying all the require files to run the application into the server
scp ../docker/compose.yml ../docker/compose.prod.yml up.sh ../docker/.env password.txt root@"${SERVER_ADDRESS}":~/app/
