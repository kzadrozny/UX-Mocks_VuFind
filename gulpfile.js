var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

//Compile Less to css
gulp.task('less', function(){
  return gulp.src('src/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

//Compile Sass to css
gulp.task('compileSass', function() {
  return gulp.src(['src/less/**/*.scss'])
    .pipe(maps.init()) // Sass source map 1/2
    .pipe(sass())
    .pipe(maps.write('./')) // Sass source map 2/2
    .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.reload({
      stream: true
    }))
});

// Watch Files
gulp.task('watchFiles', ['browserSync', 'compileSass', 'less'], function() {
  gulp.watch('src/less/**/*.scss', ['compileSass'], browserSync.reload);
  gulp.watch('src/less/**/*.less', ['less'], browserSync.reload);
  gulp.watch('*.html', browserSync.reload);
});

// Load and refresh on local
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task("build", ['less', 'compileSass', 'watchFiles']);

gulp.task("default", ['build']);