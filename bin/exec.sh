#!/bin/sh

ssh ${SERVER_USER}@"${SERVER_ADDRESS}" "cd ${SERVICE_PATH} && chmod u+x up.sh && ./up.sh"

