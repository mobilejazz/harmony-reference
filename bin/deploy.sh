#!/bin/sh

# get the commit id for the latest commit in HEAD
DOCKER_IMAGE_TAG="$(git rev-parse --short HEAD)"

# first prepare build the image
docker build -t joselufo/harmony-reference:"$DOCKER_IMAGE_TAG" -f ../Dockerfile ../.

# copying and adding the new docker image tag into the enviroment file
echo "HARMONY_REFERENCE_VERSION=${DOCKER_IMAGE_TAG}" > ../docker/.env

docker login -u "$DOCKER_REGISTRY_USER" -p "$DOCKER_REGISTRY_PASSWORD" || exit

docker push joselufo/harmony-reference:"$DOCKER_IMAGE_TAG"

echo "Transfering files to the server"

# copying all the require files to run the application into the server
scp ../docker/compose.yml ../docker/compose.prod.yml up.sh ../docker/.env root@"${SERVER_ADDRESS}":~/app/
