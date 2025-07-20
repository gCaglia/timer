#!/bin/bash

service=${1:-podman}
port=${2:-80}
name=${3:-timer-app}
version=$(cat ./version)

$service build -t timer:$version .
$service run -p $port:5001 --name $name timer:$version