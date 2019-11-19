#!/bin/bash

cd ~/app || exit

cat password.txt | docker login --username joselufo --password-stdin

# create an array with all the docker-compose files in the directory
mapfile -t docker_compose_files < <(ls | grep 'compose')

# todo: instead of hardcode the indexes, do it dinamically
# execute docker-compose command with all the compose files to merge it
docker-compose -f "${docker_compose_files[0]}" -f "${docker_compose_files[1]}" down
docker-compose -f "${docker_compose_files[0]}" -f "${docker_compose_files[1]}" up -d --remove-orphans

