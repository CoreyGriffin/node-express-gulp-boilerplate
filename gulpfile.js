'use strict';
const gulp = require('gulp'),
      runSequence = require('run-sequence'),
      sourcemaps = require('gulp-sourcemaps'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      rename = require('gulp-rename'),
      uglify = require('gulp-uglify'),
      minifyCSS = require('gulp-clean-css'),
      nodemon = require('gulp-nodemon'),
      browserSync = require('browser-sync');


//default gulp task run with "gulp"
gulp.task('default', ['sass', 'browserSync'], () => {
  gulp.watch('public/stylesheets/**', ['sass']);
  gulp.watch('public/scripts/**/*.js', browserSync.reload);
  gulp.watch('public/images/**/*.+(png|jpg|gif|svg)', browserSync.reload);
  gulp.watch('public/*.html', browserSync.reload);
});

//Compile sass files into main.css
gulp.task('sass', () => {
      return gulp.src('public/stylesheets/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('public/stylesheets'))
      .pipe(browserSync.reload({
      stream: true
      }))
});

// //Browser-Sync for live reload
gulp.task('browserSync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: 5000
  });
});

gulp.task('nodemon', (cb) => {
    let called = false;
    return nodemon({script: 'app.js'}).on('start', () => {
      if (!called) {
        called = true;
        cb();
      }
    });
});

//--------- RUN FOR PRODUCTION FILES ----------

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

//Uglify JS task
