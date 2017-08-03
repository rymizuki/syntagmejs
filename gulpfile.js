var gulp = require('gulp')
var path = require('path')

var test_files = [
  'node_modules/sinon-browser-only/sinon.js',
  'node_modules/power-assert/build/power-assert.js',
  'node_modules/q/q.js',
  'test/index.js',
]

gulp.task('script', function () {
  var webpack = require('webpack')
  var stream  = require('webpack-stream')
  var config  = require('./webpack.config.js')
  var uglify  = require('gulp-uglify')
  var rename  = require('gulp-rename')
  return stream(config, webpack)
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
})

gulp.task('test', ['script'], function (done) {
  var Server = require('karma').Server
  return new Server({
    configFile: __dirname + '/karma.conf.coffee',
    singleRun: true,
    browsers: ['PhantomJS'],
  }, done)
    .start()
})

gulp.task('test-browsers', function (done) {
  var Server = require('karma').Server
  return new Server({
    configFile: path.join(__dirname, 'karma.conf.coffee'),
    browsers: ['PhantomJS', 'Chrome', 'Safari'],
  }, done)
    .start()
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
