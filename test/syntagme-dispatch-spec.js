var syntagme = require('syntagme')

describe('syntagme.dispatch', function () {
  var handler
  var stuff
  beforeEach(function () {
    stuff = syntagme()
    handler = sinon.stub()
    stuff.dispatcher.register(handler)
  })
  describe('execute with payload', function () {
    beforeEach(function () {
      stuff.dispatch({
        source: 'TEST',
        action: {type: 'TEST_ACTION'}
      })
    })

    describe('handler called once', function () {
      it('should be true', function () {
        assert.ok(handler.calledOnce)
      })
    })
    describe('handle payload', function () {
      it('should be equal', function () {
        assert.deepEqual({
          source: 'TEST',
          action: {type: 'TEST_ACTION'},
        }, handler.args[0][0])
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
