const gulp = require('gulp')
const path = require('path')

gulp.task('script', function () {
  const webpack = require('webpack')
  const stream  = require('webpack-stream')
  const config  = require('./webpack.config.js')
  const uglify  = require('gulp-uglify')
  const rename  = require('gulp-rename')
  return stream(config, webpack)
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'))
})

gulp.task('test', ['script'], function (done) {
  const Server = require('karma').Server
  return new Server({
    configFile: __dirname + '/karma.conf.coffee',
    singleRun: true,
    browsers: ['PhantomJS'],
  }, done)
    .start()
})

gulp.task('test-browsers', function (done) {
  const Server = require('karma').Server
  return new Server({
    configFile: path.join(__dirname, 'karma.conf.coffee'),
    browsers: ['PhantomJS', 'Chrome', 'Safari'],
  }, done)
    .start()
})

gulp.task('examples', function () {
  const webserver = require('gulp-webserver')
  gulp.src('examples', {read: false})
    .pipe(webserver())
})

gulp.task('watch', ['test-browsers'], function () {
  gulp.watch('script/**/*', ['script'])
})

gulp.task('build', ['script'])
gulp.task('default', ['build'])
