const sh = require('shelljs');

console.log(sh.pwd())
sh.echo('B4 exec');

sh.exec('bash scripts/models/testwebhook.sh');

sh.echo('after exec');


