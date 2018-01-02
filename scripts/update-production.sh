#!/bin/bash
cd ../pax/
git fetch --all
git reset --hard upstream/master
if  [ $? -eq 0 ]; then
    npm install
    if [ $? -eq 0 ]; then
        pm2 restart index
        if [ $? -eq 0 ]; then
            printf 'Update completed successfully.'
            exit 0
        else
            printf 'Something went wrong with pm2.'
            exit 3
        fi
    else
        printf 'Something went wrong with npm install.'
        exit 2
    fi
else
    printf 'Something went wrong with git pull.'
    exit 1
fi
