#!/bin/sh

ssh root@"${SERVER_ADDRESS}" 'cd ~/app && chmod u+x up.sh && ./up.sh'

