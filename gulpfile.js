var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var browserSync = require('browser-sync').create();
var outputPath = 'styleguide';


gulp.task('sass', function(){
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in src/scss and children dirs
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('styleguide:generate', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(styleguide.generate({
        title: 'SunnyDale',
        server: true,
        rootPath: outputPath,
        overviewPath: 'README.md'
      }))
    .pipe(gulp.dest(outputPath));
});
 
gulp.task('styleguide:applystyles', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['browserSync', 'sass', 'styleguide'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass', 'styleguide']);
  gulp.watch('/*.html', browserSync.reload);
})

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
})

gulp.task("default", ["sass"], function() {
});