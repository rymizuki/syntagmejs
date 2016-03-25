var testsContext = require.context('.', true, /-spec.js$/)
testsContext.keys().forEach(testsContext)

var testsContext = require.context('../script', true, /.js$/)
testsContext.keys().forEach(testsContext)
