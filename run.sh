#!/bin/sh

echo npx create-next-app example-nextjs
# echo 'http://localhost:3000'
touch .env.local
npm install
npm run dev

exit 0
