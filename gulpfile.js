'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const imageMin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

//  A slight delay to reload browsers
// connected to browser-sync after restarting nodemon
let BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('default', function(){
  //default task stuff will run by simply running "gulp"
  runSequence(['sass','browserSync', 'watch'])
});

gulp.task('nodemon', (e) => {
  let called = false;
  return nodemon({
    //nodemon our express Server
    script: 'app.js',
    //watch core server file(s) that require server reboot
    watch: ['app.js']
  }).on('start', () => {
    //ensure server start only got called once
    if (!called) { e(); }
    called = true;
  }).on('restart', () => {
    //reload connected browsers after slight delay
    setTimeout(() => {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

//live reload/ nodemon gulp task
gulp.task('browserSync', ['nodemon', 'sass'], () => {
  browserSync({
    //inform browser-sync to proxy our expressjs app
    proxy: 'http://localhost:3000',
    //inform browser-sync to use the following port for proxied app
    port: 4000,
    //open the proxied app in google chrome
    browser: ['google-chrome']
  });
});

//task for converting preprocessor into css
gulp.task('sass', () => {
  return gulp.src('./public/styles/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

//watching files for changes
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('public/styles/**', ['sass']);
  gulp.watch('public/scripts/**/*.js', browserSync.reload);
  gulp.watch('public/images/**/*.+(png|jpg|gif|svg)', browserSync.reload);
  gulp.watch('public/*.html', browserSync.reload);
});


// ------- CODE OPTIMIZATION FOR PRODUCTION --------------
//useref concatenates scripts in the correct order based on the order in html
//uglify and gulp-if minfies only if its a JS file or CSS file
gulp.task('useref', function(){
  return gulp.src('public/*.html')
    .pipe(useref())
    //minfies only JS files
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

//using imagemin to optimize images
gulp.task('images', function(){
  return gulp.src('/public/images/**/*.+(png|jpg|gif|svg)')
  //caching images that run through minification
    .pipe(cache(imageMin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

//copy font files to the dist folder
gulp.task('fonts', function(){
  return gulp.src('public/assets/fonts/**/*')
  .pipe(gulp.dist('dist/fonts'))
});

//cleaning house
gulp.task('clean:dist', function(){
  return del.sync('dist');
});


//combining gulp tasks for PRODUCTION
gulp.task('launch', function(callback){
  runSequence('clean:dist',
  ['sass','useref','images','fonts'],callback)
});
