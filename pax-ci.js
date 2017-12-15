const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const shell = require('shelljs');

const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SETUP
fs.access('./logs/build.log', err => {
  if (err) {
    fs.mkdirSync('./logs');
    fs.writeFileSync('./logs/build.log', '');
  }
});

// HELPERS
const execBuild = (cb) => {
  shell.exec('./scripts/update-production.sh', (code, stdout, stderr) => {
    if (code === 0) {
      fs.appendFile('./logs/build.log', `Successful build at ${new Date()}.\n`, err => {
        if (err) {
          cb (err, null);
        } else {
          cb (null, true);
        }
      });
    } else {
      fs.appendFile('./logs/build.log', `Failed build at ${new Date()}.\n`, err => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, false);
        }
      });
    }
  });
};

// ROUTING
app.post('/admin/build', (req, res) => {
  if (req.body.action === 'closed' && req.body.pull_request.merged === true) {
    res.send('BUILDING');
    execBuild((err, success) => {
      if (err) {
        console.error(err);
        res.end('BUILD FAILED');
      } else if (success) {
        res.end('BUILD SUCCESS');
      } else if (!success) {
        res.end('BUILD FAILED');
      }
    });
  } else {
    console.log('NOT A MERGE');
    console.log(req.body.action);
    console.log(req.body.merged);
    res.end('NOT A SUCCESFULL MERGE.');
  }
});

app.post('/admin/status/', (req, res) => {
  // Return system and pax status.
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
