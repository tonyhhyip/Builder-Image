require('dotenv').load();
const prodEnv = require('./prod.env');
const devEnv = require('./dev.env');

module.exports = {
  build: {
    env: prodEnv,
  },
  dev: {
    env: devEnv,
    port: process.env.PORT || 8080,
  },
};
