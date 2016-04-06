var syntagme = require('syntagme')

describe('syntagme.dispatch', function () {
  var handler
  var stuff
  beforeEach(function (done) {
    stuff = syntagme()
    handler = sinon.stub()
    stuff.dispatcher.register(handler)
    stuff.listen(done)
  })
  describe('execute with payload', function () {
    beforeEach(function () {
      stuff.dispatch({
        source: 'TEST',
        action: {type: 'TEST_ACTION'}
      })
    })

    describe('handler called twice', function () {
      it('should be true', function () {
        assert.ok(handler.calledTwice)
      })
    })
    describe('handle payload', function () {
      it('should be equal', function () {
        assert.deepEqual({
          source: 'SYNTAGME',
          action: {type: 'INIT'},
        }, handler.args[0][0])
        assert.deepEqual({
          source: 'TEST',
          action: {type: 'TEST_ACTION'},
        }, handler.args[1][0])
      })
    })
  })
  describe('execute without action.type', function () {
    it('should be throw exception', function () {
      assert.throws(function () {
        stuff.dispatch({})
      }, /ActionType is not defined/)
    })
  })
})
