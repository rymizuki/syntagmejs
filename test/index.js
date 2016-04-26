var testsContext = require.context('.', true, /-spec.js$/)
testsContext.keys().forEach(testsContext)

var testsContext = require.context('../src', true, /.js$/)
testsContext.keys().forEach(testsContext)
