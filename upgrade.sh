#!/bin/bash

cd /homelab-toolchain/static-file-server
docker compose down
docker compose pull
docker compose up -d