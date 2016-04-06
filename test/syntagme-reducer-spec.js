var syntagme = require('syntagme')

describe('syntagme.reducer', function () {
  beforeEach(function () {
    this.syntagme = syntagme()
  })
  describe('single reduce', function () {
    var subscriber
    beforeEach(function (done) {
      subscriber = sinon.stub()
      this.syntagme.subscribe(subscriber)
      this.syntagme.reducer(function (payload, previous) {
        previous || (previous = {})
        if (payload.action.type == 'TEST')
          return { count: (previous.count || 0) + payload.action.count }
        else
          return previous
      })
      this.syntagme.listen(done)
    })
    describe('when handled', function () {
      describe('subscriber', function () {
        beforeEach(function () {
          this.syntagme.dispatch({
            source: 'ACTION',
            action: { type: 'TEST', count: 1 },
          })
        })
        describe('called', function () {
          it('should be true', function () {
            assert.ok(subscriber.calledTwice)
          })
        })
        describe('state', function () {
          it('should be reduced', function () {
            assert.deepEqual({
              count: 1
            }, subscriber.args[1][0])
          })
        })
      })
    })
  })
  describe('multiple reduce', function () {
    var subscriber
    beforeEach(function (done) {
      subscriber = sinon.stub()
      this.syntagme.subscribe(subscriber)
      this.syntagme.reducer(function (payload, previous) {
        if (payload.action.type !== 'TEST_1') return
        previous || (previous = {})
        var data = previous
        data.reducer1 = true
        data.count    = 1
        return data
      }),
      this.syntagme.reducer(function (payload, previous) {
        if (payload.action.type !== 'TEST_2') return
        previous || (previous = {})
        var data = previous
        data.reducer2 = true
        data.count    = 2
        return data
      })
      this.syntagme.listen(done)
    })
    describe('when handled action', function () {
      beforeEach(function () {
        this.syntagme.dispatch({
          source: 'ACTION',
          action: { type: 'TEST_1', count: 1, },
        })
      this.syntagme.dispatch({
          source: 'ACTION',
          action: { type: 'TEST_2', count: 1, },
        })
      })
      describe('called', function () {
        it('should be true', function () {
          assert.ok(subscriber.calledOnce)
        })
      })
      describe('state', function () {
        it('should be reduced', function () {
          assert.deepEqual({
            reducer1: true,
            reducer2: true,
            count: 2,
          }, subscriber.args[0][0])
        })
      })
    })
  })
  describe('order reduce', function () {
    var subscriber
    beforeEach(function (done) {
      subscriber = sinon.stub()
      this.syntagme.subscribe(subscriber)
      this.syntagme.reducer([
        function (payload, previous) {
          previous || (previous = {})
          var data = previous
          data.reducer1 = true
          data.count    = 1
          return data
        },
        function (payload, previous) {
          previous || (previous = {})
          var data = previous
          data.reducer2 = true
          data.count    = 2
          return data
        },
        function (payload, previous) {
          previous || (previous = {})
          var data = previous
          data.reducer3 = true
          data.count    = 3
          return data
        }
      ])
      this.syntagme.listen(done)
    })
    describe('when handled action', function () {
      beforeEach(function () {
        this.syntagme.dispatch({
          source: 'ACTION',
          action: { type: 'TEST', count: 1, },
        })
      })
      describe('called', function () {
        it('should be true', function () {
          assert.ok(subscriber.calledOnce)
        })
      })
      describe('state', function () {
        it('should be reduced', function () {
          assert.deepEqual({
            reducer1: true,
            reducer2: true,
            reducer3: true,
            count: 3,
          }, subscriber.args[0][0])
        })
      })
    })
  })
})
