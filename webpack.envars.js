// Set the `ENV` global variable to be used in the app.
var path = require('path');
var webpack = require('webpack');
var config;

if (process.env.IONIC_APP_SCRIPTS_DIR) {
    var config = require(path.join(process.env.IONIC_APP_SCRIPTS_DIR, 'config', 'webpack.config.js'));
}
else {
    var config = require(path.join(__dirname, 'test-config', 'webpack.test.js'))
}


var env = process.env.IONIC_ENV || 'dev';
var envVars;

try {
    envVars = require(path.join(__dirname, 'env', env + '.json'));
} catch(e) {
    envVars = {};
}

Object.keys(envVars).forEach(function(key) {
 envVars[key] =    JSON.stringify(envVars[key]).replace(/"/g, '\"');
});
config.plugins = config.plugins || [];
config.plugins.push(
    new webpack.DefinePlugin({
        ENV: Object.assign(envVars)
    })
);

if(env === 'prod') {
    // This helps ensure the builds are consistent if source hasn't changed:
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;
