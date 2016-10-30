'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const rename = require('gulp-rename');

const imagemin = require('gulp-imagemin');

const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');

const nunjucks = require('nunjucks');
const jinja = require('gulp-nunjucks');
const htmlmin = require('gulp-htmlmin');

const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config');
const fs = require('fs');

const WebpackDevServer = require('webpack-dev-server');

gulp.task('image', () => {
  return gulp.src('./assets/images/**/*.*')
    .pipe(imagemin())
    .on('error', util.log)
    .pipe(gulp.dest('public/images'));
});

gulp.task('css', () => {
  return gulp.src('./assets/scss/*.scss')
    .pipe(sass())
    .on('error', util.log)
    .pipe(gulp.dest('public'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('public'));
});

gulp.task('page', () => {
  const env = new nunjucks.Environment([
    new nunjucks.FileSystemLoader('./assets/pages'),
    new nunjucks.FileSystemLoader('./assets/layouts')
  ]);
  return gulp.src('./assets/pages/*.jinja')
    .pipe(jinja.compile({}, {env}))
    .on('error', util.log)
    .pipe(htmlmin())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('public'));
});

gulp.task('server', () => {
  const devConfig = merge(config, {
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server',
        './assets/js/app'
      ]
    }
  });

  const compiler = webpack(devConfig);
  compiler.plugin('done', (stats) => {
    util.log('[webpack]', stats.toString({
      version: true,
      timings: true,
      assets: true,
      chunks: true,
      chunkModules: true,
      modules: true
    }));
    fs.writeFile('./webpack.json', JSON.stringify(stats.toJson('verbose')));
  });

  const server = new WebpackDevServer(compiler, {
    hot: true,
    contentBase: './public'
  });

  server.listen(8080);
});

gulp.task('js', (cb) => {
  webpack(config, (e, stats) => {
    if (e) {
      throw new PluginError('[webpack]', e);
    } else {
      log('[webpack]', stats.toString({
        version: true,
        timings: true,
        assets: true,
        chunks: true,
        chunkModules: true,
        modules: true
      }));
      fs.writeFile('./webpack.json', JSON.stringify(stats.toJson('verbose')));
    }
    cb();
  });
});

gulp.task('watch:css', () => {
  return gulp.watch([
    './assets/scss/**/*.scss'
  ], ['css']);
});

gulp.task('watch:page', () => {
  return gulp.watch([
    './assets/pages/**/*.jinja'
  ], ['page']);
});

gulp.task('watch:image', () => {
  return gulp.watch([
    './assets/images/**/*.*'
  ], ['image']);
});

gulp.task('watch', ['watch:image', 'watch:page', 'watch:css']);
gulp.task('build:dev', ['image', 'css', 'page', 'server']);
gulp.task('dev', ['build:dev', 'watch']);
gulp.task('build', ['image', 'css', 'page', 'js']);

