#!/bin/sh

#npm install
npm run build
docker build -t nextjs-finance .
docker rm -f nextjs-finance
docker run --name=nextjs-finance -h nextjs-finance --restart unless-stopped -p 3030:3030 -d nextjs-finance
# docker rm -f nextjs-finance

docker save -o nextjs-finance.tar nextjs-finance
scp nextjs-finance.tar 192.168.10.10:/home/henninb/nextjs-finance.tar
echo docker load -i nextjs-finance.tar

exit 0
