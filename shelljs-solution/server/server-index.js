const express = require('express');
const bodyParser = require('body-parser');
const analyzeInput = require('./toneAnalyzer.js');
const webHookScript = require('./../scripts/controllers/afterwebhook');
var sh = require('shelljs');


const app = express();

const PORT = 3000;

console.log('SERVER_RUNNING = ', process.env.SERVER_RUNNING);

if ( process.env.SERVER_RUNNING !== '1') {
  sh.exec('pm2 restart pax-ci');
  process.env.SERVER_RUNNING = '1';
  console.log('restarted PM2')
}


app.use(express.static(`${__dirname}/../client/dist/`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/admin/build/npm', (req, res) => {
	const hook = req.body;
	//if ( hook.action === 'closed' && hook.merged) {
		webHookScript.controller(hook);
		// logs requests
		sh.exec('echo '+JSON.stringify(hook)+' > merged-pull-request/PR'+hook.hook.id/*hook.mergedat || 5*/);
	//}
  sh.echo('hello world from /admin/build/npm server-index7717');
  res.send('started build, look at terminal to follow along with the process')

});

app.post('/api/analyze', (req, res) => {
  analyzeInput(req.body.data, (err,response) => {
    res.send(response);
  });
});

app.post('/api/vote', (req, res) => {
  console.log('SERVER_RUNNING = ', process.env.SERVER_RUNNING);
  res.send(null);
});

app.post('/login', (req, res) => {
  res.send(null);
});

app.post('/signup', (req, res) => {
  res.send(null);
});

app.listen(PORT, () => {
  console.log(`really Listening on ${PORT}`);
});
