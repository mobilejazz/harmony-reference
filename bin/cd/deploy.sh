#!/usr/bin/env bash
set -e exit

source ./env-vars.sh

scp ../../docker/cd/docker-compose.yml ../../docker/cd/.env root@"${SERVER}":~/continuous-integration/
