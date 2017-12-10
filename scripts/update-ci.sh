#!/bin/bash
cd ../
git fetch --all
git reset --hard upstream/master
if  [ $? -eq 0 ]; then
    npm install
    if [ $? -eq 0 ]; then
        npm run build
        if [ $? -eq 0 ]; then
            pm2 restart pax-ci
            printf 'Update completed successfully.'
            exit 0
        else
            printf 'Something went wrong with pm2.'
            exit 4
        fi
    else
        printf 'Something went wrong with npm run build.'
        exit 3
    fi
    printf 'Something went wrong with npm install.'
    exit 2
else
    printf 'Something went wrong with git pull.'
    exit 1
fi

