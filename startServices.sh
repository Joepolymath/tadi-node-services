#!/bin/bash


docker-compose up -d rabbitmq mongodb


sleep 10

echo "STARTING USERS SERVICE"
docker-compose up -d users

sleep 10

echo "STARTING NOTIFICATIONS SERVICE"

docker-compose up -d notifications

sleep 10

echo "STARTING CHATS SERVICE"

docker-compose up -d chats

sleep 10

echo "STARTING PROXY"

docker-compose up proxy
