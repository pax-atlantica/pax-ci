const shell = require('shelljs');
const promise = require ('bluebird');

exports.rebuild = function () {
	//console.log('response code @@@@@@@@@@@',shell.exec('git pull --rebase upstream master').code);
	console.log('git status code = ',shell.exec('git status').code)
    if (shell.exec('git status', (code)=> 
        {    
            if ( code !== 0 ) {
                return console.log('not able to execute git status, please verify current repo and settings')
            }
            var rebaseText = ' in step after git status, will be the rebasing step @@@@@@@@@@@@@@@@@@@@@@@@@@@ ';
            //console.log(rebaseText) &&&;
            shell.exec('echo '+rebaseText/*'git pull --rebase upstream master'&&&*/,(code)=> {
                if ( code !== 0 ){
                    return console.log('not able to pull rebase from upstream, please verify you re sending the right webhooks ')
                }
                shell.exec('npm install', code => {  
                    if ( code !== 0 ){
                        return console.log('not able to npm install, please verify you have the right to install ');
                    }     
                    shell.exec('npm run build', code => {
                        console.log('code after npm build step',code)
                    })
                } )
            })
             
        })
    );     
}

console.log('in models');
