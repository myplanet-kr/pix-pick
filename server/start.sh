#!/bin/sh

echo "running image process server"
npm run server --prefix /var/www/pix-pick&
npm run start --prefix /app