#!/bin/sh

echo set -gx DOCKER_HOST tcp://192.168.10.10:2375
echo export DOCKER_HOST=tcp://192.168.10.10:2375
echo export DOCKER_HOST=ssh://henninb@192.168.10.10
#
docker context create remote --docker "host=ssh://henninb@192.168.10.10"
echo docker context use remote
docker context ls

echo npm install
npm run build
docker build -t nextjs-finance .

docker save nextjs-finance | docker --context remote load

echo export DOCKER_HOST=ssh://henninb@192.168.10.10
export DOCKER_HOST=tcp://192.168.10.10:2375
docker rm -f nextjs-finance
docker run --name=nextjs-finance -h nextjs-finance --restart unless-stopped -p 3030:3030 -d nextjs-finance
docker ps -a
# docker rm -f nextjs-finance

# docker save -o nextjs-finance.tar nextjs-finance
# scp nextjs-finance.tar 192.168.10.10:/home/henninb/nextjs-finance.tar
# echo docker load -i nextjs-finance.tar

exit 0
