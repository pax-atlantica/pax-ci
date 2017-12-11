#!/bin/bash
git pull --rebase upstream master
if  [ $? -eq 0 ]; then
    npm install
    if [ $? -eq 0 ]; then
        npm run build
        if [ $? -eq 0 ]; then
            pm2 restart server-index
            printf 'Update completed succesfully.'
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

