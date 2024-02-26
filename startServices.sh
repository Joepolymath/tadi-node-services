#!/bin/bash


docker-compose up -d rabbitmq mongodb


sleep 20 

echo "STARTING USERS SERVICE"
docker-compose up -d users

sleep 10

echo "STARTING NOTIFICATIONS SERVICE"

docker-compose up -d notifications

sleep 10

echo "STARTING PROXY"

docker-compose up proxy
