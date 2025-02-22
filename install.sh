#!/bin/bash

if [ $# -eq 0 ]; then
    AVAILABLE=0
else
    AVAILABLE=1
fi

get_value() {
    local step=$1
    shift
    for arg in "$@"; do
        if [[ "$arg" == $step=* ]]; then
            echo "${arg#*=}"
            return 0
        elif [[ "$arg" == "$step" ]]; then
            echo ""
            return 0
        fi
    done
    return 1
}

is_available() {
    local step=$1
    shift
    if [ "$AVAILABLE" -eq 0 ]; then
        return 1
    fi
    for arg in "$@"; do
        if [[ "$arg" == $step* ]]; then
            return 0
        fi
    done
    return 1
}

mkdir -p /homelab-toolchain/static-file-server/config
cd /homelab-toolchain/static-file-server

if ! is_available "port" "$@"; then
    echo "ERROR: Please provide PORT to be used."
    exit 1
else 
    port_to_set=$(get_value "port" "$@")
fi

if ! is_available "homeFolder" "$@"; then
    echo "ERROR: Please provide HOME_FOLDER to be used."
    exit 1
else
    home_folder_to_set=$(get_value "homeFolder" "$@")
fi

COMPOSE_FILE="docker-compose.yml" 
wget -O $COMPOSE_FILE https://raw.githubusercontent.com/homelab-toolchain/static-file-server/refs/heads/main/docker-compose.yml
if [[ ! -f "$COMPOSE_FILE" ]]; then
    echo "The file $COMPOSE_FILE was not found."
    exit 1
fi

UPGRADE_FILE="upgrade.sh"
wget -O $UPGRADE_FILE https://raw.githubusercontent.com/homelab-toolchain/static-file-server/refs/heads/main/upgrade.sh
if [[ ! -f "$UPGRADE_FILE" ]]; then
    echo "The file $UPGRADE_FILE was not found."
    exit 1
fi

touch /homelab-toolchain/static-file-server/.env
{
    echo "PORT=$port_to_set"
    echo "HOME_FOLDER=$home_folder_to_set"
} >> /homelab-toolchain/static-file-server/.env

docker compose up -d