#!/bin/bash

docker-compose -f ../docker/compose.yml -f ../docker/compose.local.yml down
docker-compose -f ../docker/compose.yml -f ../docker/compose.local.yml up -d --remove-orphans --build
