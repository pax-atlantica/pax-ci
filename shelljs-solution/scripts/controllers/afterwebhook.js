const model=require('./../models/after-webhook');
const sh = require('shelljs');

exports.controller= function (hook) {
		//if ( hook.action === 'closed' && hook.merged ) {
			sh.exec('echo '+JSON.stringify(hook)+' > merged-pull-request/PR'+hook.hook.id/*hook.mergedat || 5*/);
			model.rebuild()
		//}
	  sh.echo('hello world from after-hook controller ');
}