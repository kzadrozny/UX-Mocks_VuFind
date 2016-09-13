var gulp = require('gulp');
var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('/*.html', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task("default", ["sass"], function() {
});