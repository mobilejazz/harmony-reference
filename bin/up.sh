#!/bin/bash

cd ~/app || exit

source env-vars-pull.sh

# Log in into the gitlab container register to push the docker image built
docker login registry.mobilejazz.com  --username "$DOCKER_REGISTRY_USER" --password "$DOCKER_REGISTRY_PASSWORD" || exit

# create an array with all the docker-compose files in the directory
mapfile -t docker_compose_files < <(ls | grep 'compose')

# merge .env-prod variables into the default .env file
cat .env-prod >> .env

# todo: instead of hardcode the indexes, do it dinamically
# execute docker-compose command with all the compose files to merge it
docker-compose -f "${docker_compose_files[0]}" -f "${docker_compose_files[1]}" pull
docker-compose -f "${docker_compose_files[0]}" -f "${docker_compose_files[1]}" up -d
