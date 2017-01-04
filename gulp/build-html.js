'use strict';

const gulp = require('gulp-help')(require('gulp'));
const util = require('gulp-util');

const {Environment, FileSystemLoader} = require('nunjucks');
const jinja = require('gulp-nunjucks');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');

gulp.task('build:html', 'Build production version ./assets/pages/*.jinja into HTML files', () => {
  const env = new Environment([
    new FileSystemLoader('./assets/pages'),
    new FileSystemLoader('./assets/layouts')
  ]);
  return gulp.src('./assets/pages/*.jinja')
    .on('error', util.log)
    .pipe(jinja.compile({}, {env}))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest('public'));
});