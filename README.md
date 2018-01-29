# Docker-project
Skeleton for docker app with mongodb and express

## Installation

1. Clone this repo ``git clone https://github.com/avvRobertoAlma/docker-project.git``
2. run ``docker-compose up --build``

You are ready!

## Basic Docker Commands

1. ``docker images`` - list of images which have been stored locally
2.  ``docker ps`` - list of running containers 
3. ``docker start [ containerId ]`` - start a stopped container
4. ``docker ps -a`` - list of all containers
5. ``docker stop $(docker ps -a -q)`` - stop all containers
6. ``docker rm $(docker ps -a -q)`` - remove all containers
