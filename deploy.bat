#!/bin/bash

cp -r dist/ ../heroku-deploy/
cd ../heroku-deploy
git add -A .
git commit -m "a new deployment via deploy.bat"
cd -
echo "deploy sequence ran"
