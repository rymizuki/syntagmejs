var gulp = require('gulp')

var test_files = [
  'node_modules/sinon-browser-only/sinon.js',
  'node_modules/power-assert/build/power-assert.js',
  'node_modules/q/q.js',
  'test/index.js',
]

gulp.task('script', function () {
  var webpack = require('webpack-stream')
  var config  = require('./webpack.conf.js')
  var uglify  = require('gulp-uglify')
  var rename  = require('gulp-rename')
  return gulp.src('script')
    .pipe(webpack(config))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
})

gulp.task('test', ['script'], function () {
  var karma = require('gulp-karma')
  gulp.src(test_files)
    .pipe(karma({
      configFile: __dirname + '/karma.conf.coffee',
      action: 'run',
      browsers: ['PhantomJS'],
    }))
})

gulp.task('test-browsers', function () {
  var karma = require('gulp-karma')
  gulp.src(test_files)
    .pipe(karma({
      configFile: __dirname + '/karma.conf.coffee',
      action: 'watch',
      browsers: ['PhantomJS', 'Chrome', 'Safari'],
    }))
})

gulp.task('examples', function () {
  var webserver = require('gulp-webserver')
  gulp.src('examples', {read: false})
    .pipe(webserver())
})

gulp.task('watch', ['test-browsers'], function () {
  gulp.watch('script/**/*', ['script'])
})

gulp.task('build', ['script'])
gulp.task('default', ['build'])
