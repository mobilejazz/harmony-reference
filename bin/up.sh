#!/bin/bash

source env-vars-pull.sh

# Log in into the gitlab container register to push the docker image built
docker login registry.mobilejazz.com  --username "$DOCKER_REGISTRY_USER" --password "$DOCKER_REGISTRY_PASSWORD" || exit

# merge .env-prod variables into the default .env file
cat .env-prod >> .env

# execute docker-compose command with all the compose files to merge it
docker-compose -f compose.prod.yml pull
docker-compose -f compose.prod.yml up -d
