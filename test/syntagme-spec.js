var syntagme = require('syntagme')

describe('syntagme', function () {
  var stuff
  beforeEach(function () {
    stuff = syntagme()
  })
  describe('.config', function () {
    it('should be object', function () {
      assert.equal(typeof stuff.config, 'object')
    })
  })
  describe('.ac', function () {
    it('should be function', function () {
      assert.equal(typeof stuff.ac, 'function')
    })
  })
  describe('.dispatch', function () {
    it('should be function', function () {
      assert.equal(typeof stuff.dispatch, 'function')
    })
  })
  describe('.reducer', function () {
    it('should be function', function () {
      assert.equal(typeof stuff.reducer, 'function')
    })
  })
})
