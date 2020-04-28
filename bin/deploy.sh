#!/bin/sh

# get the commit id for the latest commit in HEAD
DOCKER_IMAGE_TAG="$(git rev-parse --short HEAD)"

# . ./env-vars-deploy.sh

# first prepare build the image
docker build -t registry.mobilejazz.com/harmony/documentation:"$DOCKER_IMAGE_TAG" -f ../Dockerfile ../.

# copying and adding the new docker image tag into the enviroment file
echo "HARMONY_REFERENCE_VERSION=${DOCKER_IMAGE_TAG}" > ../docker/.env

docker login --username "$DOCKER_REGISTRY_USER" -p "$DOCKER_REGISTRY_PASSWORD" registry.mobilejazz.com || exit

docker push registry.mobilejazz.com/harmony/documentation:"$DOCKER_IMAGE_TAG"

# copying all the require files to run the application into the server
scp ../docker/compose.yml ../docker/compose.prod.yml up.sh ../docker/.env root@"$SERVER_ADDRESS":~/app/
