'use strict';
const gulp = require('gulp'),
      runSequence = require('run-sequence'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      minifyCSS = require('gulp-clean-css');


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


//Minify CSS and create main.min.css file for production build
gulp.task('minifyCSS', () => {
      return gulp.src(['public/stylesheets/*.css', '!public/stylesheets/*.min.css'])
      .pipe(minifyCSS({debug: true}, (details) => {
            console.log('Original ' + details.name + ': ' + 'size: ' + details.stats.originalSize);
            console.log('Minified ' + details.name + ': ' + 'size: ' + details.stats.minifiedSize);
      }))
      .pipe(rename({ suffix: '.min'}))
      .pipe(gulp.dest('public/stylesheets'));
});
