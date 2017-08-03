path = require('path')

module.exports = (config) ->
  config.set
    # base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: ""

    # frameworks to use
    # available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      "mocha"
    ]

    # list of files / partterns to load in the browser
    files: [
      'node_modules/sinon-browser-only/sinon.js',
      'node_modules/power-assert/build/power-assert.js',
      'node_modules/q/q.js',
      'test/index.js'
    ]

    # list of files to exclude
    exclude: [
    ]

    # preprocess matching files before serving them to the browser
    # available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/index.js': ['webpack']
    }

    # test results reporter to use
    # possible values: 'dots', 'progress'
    # availabel reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      "spec"
      "growl"
      "coverage"
    ]

    # web server port
    port: 9876

    # enable / disable colors in the output (reporters and logs)
    colors: true

    # level of logging
    # possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO

    # enable / disable watching file and excuting tests whenever any file changes
    autoWatch: true

    # start these brosers
    # available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      "PhantomJS"
      "Chrome"
      "Safari"
    ]

    # Continuous Integration mode
    # if true, Karma captures browsers, runs the tests and exits
    singleRun: false

    webpack:
      resolve:
        extensions: ['.js']
        modules: [
          path.join(__dirname, 'src')
        ]
      module:
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            enforce: 'post',
            test: /\.js$/,
            exclude: /(test|node_modules)/,
            loader: 'istanbul-instrumenter-loader'
          }
        ]

    coverageReporter:
      reporters: [
        { type: 'text' },
        { type: 'lcovonly', subdir: 'report-lcovonly' },
      ]
