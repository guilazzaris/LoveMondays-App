const gulp = require('gulp');
const connect = require('gulp-connect');
const runSequence  = require('run-sequence');

gulp.task('connect:dev', function() {
  return connect.server({
		root: 'public',
		port: 8000,
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
	return gulp.watch(['public/**/*', 'gulpfile.js', 'package.json'], ['connect:reload']);
});

gulp.task('dev', function(callback) {
  return runSequence('connect:dev', 'watch', callback);
});