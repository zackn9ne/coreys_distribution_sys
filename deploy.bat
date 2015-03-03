#!/bin/bash

dir1=$HOME/code/universal-heroku-deployer

cp -r * $dir1
echo "cded into" $dir1
cd "$dir1"

echo "do you want to push to heroku also?"
read yn
case $yn in

[Yy] | [yY] )
echo "Agreed"

git add -A .
git commit -m "a new deployment via deploy.bat"
cd -
echo "deploy sequence ran"
;;
 [nN] | [n|N] )
 echo "Not Agreed"
 exit 1
 ;;

 *) echo "Invalid"
 ;;
esac

*)
