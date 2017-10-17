const webpack = require('webpack');
const shell = require('shelljs');
const config = require('./webpack.prod.conf');

process.env.NODE_ENV = 'production';

const assetsPath = './public';

shell.rm('-rf', assetsPath);
shell.mkdir('-p', assetsPath);
shell.config.silent = true;

webpack(config, (err, stats) => {
  if (err) throw err;
  console.log(stats.toString({
    modules: true,
    children: true,
    chunks: true,
    chunkModules: true,
  }));
});
