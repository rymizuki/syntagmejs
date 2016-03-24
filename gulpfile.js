var gulp = require('gulp')

var test_files = [
  'node_modules/sinon-browser-only/sinon.js',
  'node_modules/power-assert/build/power-assert.js',
  'node_modules/q/q.js',
  'syntagme.js',
  'test/**/*.js',
]

gulp.task('script', function () {
  var webpack = require('webpack-stream')
  var config  = require('./webpack.conf.js')
  return gulp.src('script')
    .pipe(webpack(config))
    .pipe(gulp.dest('.'))
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

gulp.task('coverage', function (done) {
  var istanbul = require('gulp-istanbul')
  var karma    = require('gulp-karma')
  gulp.src(['syntagme.js'])
    .pipe(istanbul({includeUntested: true}))
    .on('finish', function () {
      gulp.src(test_files)
        .pipe(karma({
          configFile: __dirname + '/karma.conf.coffee',
          action:     'run',
          browsers:   ['PhantomJS'],
        }))
        .pipe(istanbul.writeReports({dir: './coverage/report'}))
    })
})

gulp.task('codacy', ['coverage'], function () {
  var codacy = require('gulp-codacy')
  gulp.src(['./coverage/report/lcov.info'], {read: false})
    .pipe(codacy({token: '8158b10d7d004160bda0be54412f3a1d'}))
})

gulp.task('watch', ['test-browsers'], function () {
  gulp.watch('script/**/*', ['script'])
})

gulp.task('build', ['script'])
gulp.task('default', ['build'])
