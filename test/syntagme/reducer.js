describe('syntagme.reducer', function () {
  beforeEach(function () {
    this.syntagme = syntagme()
  })
  describe('single reduce', function () {
    var subscriber
    beforeEach(function () {
      subscriber = sinon.stub()
      this.syntagme.subscribe(subscriber)
      this.syntagme.reducer(function (payload, previous) {
        previous || (previous = {})
        return { count: (previous.count || 0) + payload.action.count }
      })
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
            assert.ok(subscriber.calledOnce)
          })
        })
        describe('state', function () {
          it('should be reduced', function () {
            assert.deepEqual({
              count: 1
            }, subscriber.args[0][0])
          })
        })
      })
    })
  })
  describe('multi reduce', function () {
    var subscriber
    beforeEach(function () {
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
