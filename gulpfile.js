const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const runSequence  = require('run-sequence');


gulp.task('styles', function() {
    return gulp.src(['public/sass/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

gulp.task('connect:dev', function() {
  return connect.server({
		root: 'public',
		port: 8100,
		livereload: true,
		
    middleware: function(connect) {
			return [connect().use('/bower_components', connect.static('bower_components'))];
		}
	});
});

gulp.task('connect:reload', function() {
	return gulp.src('public')
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	return gulp.watch(['public/**/*', 'public/app/**/*', 'gulpfile.js', 'package.json'], ['reload']);
});

gulp.task('dev', function(callback) {
  return runSequence('connect:dev', 'watch', callback);
});

gulp.task('reload', function(callback) {
	return runSequence('styles', 'connect:reload', callback);
});