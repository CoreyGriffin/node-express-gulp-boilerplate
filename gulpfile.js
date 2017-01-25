'use strict';
const gulp = require('gulp'),
      runSequence = require('run-sequence'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass');

//default gulp task run with "gulp"
gulp.task('default', () => {
      runSequence(['sass'])
});

//Compile sass files into main.css
gulp.task('sass', () => {
      return gulp.src('public/stylesheets/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('public/stylesheets'));
});
