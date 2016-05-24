const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jasmine = require('gulp-jasmine-phantom');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const runSequence  = require('run-sequence');

/*
 * Define global tasks
 */

gulp.task('jshint', function() {
  return gulp.src(['public/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jasmine', function () {
  return gulp.src(['specs/**/*_spec.js'])
    .pipe(jasmine());
});

gulp.task('styles', function() {
  return gulp.src(['public/sass/*.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/css'));
});

gulp.task('clean:styles', function() {
  return gulp.src(['public/css/ionic.min.css'])
    .pipe(clean());
});

gulp.task('copy:styles', ['clean:styles'], function() {
  return gulp.src(['bower_components/ionic/release/css/ionic.min.css'])
    .pipe(gulp.dest('public/css'));
});

gulp.task('clean:scripts', function() {
  return gulp.src(['public/js/jquery.min.js', 'public/js/ionic.bundle.min.js'])
    .pipe(clean());
});

gulp.task('copy:scripts', ['clean:scripts'], function() {
  return gulp.src(['bower_components/jquery/dist/jquery.min.js', 'bower_components/ionic/release/js/ionic.bundle.min.js'])
    .pipe(gulp.dest('public/js'));
});

/*
 * Tasks to connect and reload server
 */

gulp.task('connect:reload', function() {
  return gulp.src('public')
    .pipe(connect.reload());
});

gulp.task('connect:dev', function() {
  return connect.server({
    root: 'public',
    port: 8000,
    livereload: true,
    middleware: function(connect) {
      return [connect().use('/bower_components', connect.static('bower_components'))];
  }});
});

gulp.task('connect:build', function() {
  return connect.server({
    root: 'build',
    port: 8001,
    livereload: true
  });
});

/*
 * Watch task
 */

gulp.task('watch', function() {
    return gulp.watch(['public/**/*', 'specs/**/*', 'gulpfile.js', 'bower.json', 'package.json', 'public/index.html'], ['dev:reload']);
});

/*
 * Define dev tasks
 */

gulp.task('dev:reload', function(callback) {
    return runSequence('styles', 'connect:reload', callback);
});

gulp.task('dev', function(callback) {
  return runSequence(['jasmine', 'styles'], 'copy:styles', 'copy:scripts', 'connect:dev', 'watch', callback);
});

/*
 * Define build Tasks
 */

gulp.task('clean:build', function() {
  return gulp.src('build')
    .pipe(clean());
});

gulp.task('building', ['clean:build'], function() {
  return gulp.src(['public/**/*', '!public/sass/**/*.scss'])
    .pipe(gulp.dest('build'));
});

gulp.task('uglify', function() {
  return gulp.src(['build/js/*'])
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build', function(callback) {
  return runSequence('styles', 'copy:styles', 'copy:scripts', 'building', 'uglify', 'connect:build', callback);
});







