//@flow
'use strict';

const fs = require('fs');

const gulp = require('gulp-help')(require('gulp'));
const util = require('gulp-util');
const {dev} = require('../webpack.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('server', 'Start a webpack-dev-server for the project at http://localhost:8080', () => {
  const compiler = webpack(dev);
  compiler.plugin('done', (stats) => {
    fs.writeFile('./webpack.json', JSON.stringify(stats.toJson('verbose')));
  });

  const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: './public'
  });

  server.listen(8080);
});
