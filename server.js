const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const ENV = require(path.join(__dirname + '/env/' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'dev') + '.json'));
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    next();
  }
}

// We force HTTPS and GZIP compression on production
if (ENV.PRODUCTION) {
    app.use(forceSSL());
    app.use(compression());
}

app.use(express.static(__dirname + '/www'));

// We redirect all GET requests to our 'index.html' to let Ionic handle the rooting
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(port, function() {
    console.log('Listening on port ' + port + '. isProduction : ' + ENV.PRODUCTION);
});
