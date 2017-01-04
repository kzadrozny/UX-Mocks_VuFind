var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();


gulp.task('less', function(){
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'less'], function(){
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('*.html', browserSync.reload);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task("default", ["less", "watch"], function() {
});