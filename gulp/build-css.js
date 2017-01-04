//@flow
'use strict';

const gulp = require('gulp-help')(require('gulp'));
const util = require('gulp-util');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const clearCss = require('gulp-clean-css');

const processor = [
  autoprefixer({
    browsers: ['last 5 version']
  })
];

gulp.task('build:css', 'Build production version ./assets/scss/*.scss into ./public', () => {
  return gulp.src('./assets/scss/**/*.scss')
    .on('error', util.log)
    .pipe(sass())
    .pipe(postcss(processor))
    .pipe(clearCss())
    .pipe(gulp.dest('public'));
});