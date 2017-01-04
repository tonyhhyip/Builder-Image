'use strict';

const gulp = require('gulp-help')(require('gulp'));
const util = require('gulp-util');

const {Environment, FileSystemLoader} = require('nunjucks');
const jinja = require('gulp-nunjucks');
const rename = require('gulp-rename');

gulp.task('dev:html', 'Build development version ./assets/pages/*.jinja into HTML files', () => {
  const env = new Environment([
    new FileSystemLoader('./assets/pages', {watch: true}),
    new FileSystemLoader('./assets/layouts', {watch: true})
  ]);
  return gulp.src('./assets/pages/*.jinja')
    .on('error', util.log)
    .pipe(jinja.compile({}, {env}))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('public'));
});