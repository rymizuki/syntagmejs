var syntagme = require('syntagme')

describe('syntagme.ac', function () {
  beforeEach(function () {
    this.syntagme = syntagme()
  })
  beforeEach(function () {
    sinon.stub(this.syntagme, 'dispatch')
  })

  describe('args typeof string', function () {
    it('should be throws', function () {
      assert.throws(() => {
        this.syntagme.ac('TEST', 'action')
      }, /Action must be Object or Function/)
    })
  })
  describe('args typeof array', function () {
    it('should be throws', function () {
      assert.throws(() => {
        this.syntagme.ac('TEST', [{name: 'a'}])
      }, /Action must be Object or Function/)
    })
  })
  describe('args object', function () {
    beforeEach(function () {
      this.syntagme.ac('TEST', {name: 'a'})
    })
    it('should be true', function () {
      assert.ok(this.syntagme.dispatch.calledOnce)
    })
    describe('action.type', function () {
      it('should be "TEST"', function () {
        assert.equal('TEST', this.syntagme.dispatch.args[0][0].action.type)
      })
    })
    describe('action.name', function () {
      it('should be "a"', function () {
        assert.equal('a', this.syntagme.dispatch.args[0][0].action.name)
      })
    })
  })
  describe('args not promisify function', function () {
    it('should be throws', function () {
      assert.throws(() => {
        this.syntagme.ac('TEST', function () { return null })
      }, /Action must be return promise object/)
    })
  })
  describe('promise action', function () {
    describe('syntagme.dispatch', function () {
      describe('resolved', function () {
        beforeEach(function () {
          return this.syntagme.ac('TEST', function () {
            return Q.promise(function (resolve) {
              resolve({name: "a"})
            })
          })
        })
        describe('called twice', function () {
          it('should be true', function () {
            assert.equal(2, this.syntagme.dispatch.callCount)
          })
        })
        describe('inital action', function () {
          describe('action', function () {
            it('should be "TEST"', function () {
              assert.deepEqual({
                source: "ASYNC_ACTION",
                action: { type: "TEST" }
              }, this.syntagme.dispatch.args[0][0])
            })
          })
        })
        describe('resolve action', function () {
          describe('action', function () {
            it('should be "TEST"', function () {
              assert.deepEqual({
                source: "ASYNC_ACTION_RESOLVE",
                action: {
                  type: "TEST_RESOLVE",
                  name: "a",
                }
              }, this.syntagme.dispatch.args[1][0])
            })
          })
        })
      })
      describe('reject', function () {
        beforeEach(function () {
          return this.syntagme.ac('TEST', function () {
            return new Q.promise(function (resolve, reject) {
              reject({name: "a"})
            })
          })
        })
        describe('called twice', function () {
          it('should be true', function () {
            assert.equal(2, this.syntagme.dispatch.callCount)
          })
        })
        describe('initial action', function () {
          it('should be "TEST"', function () {
            assert.deepEqual({
              source: 'ASYNC_ACTION',
              action: { type: 'TEST' },
            }, this.syntagme.dispatch.args[0][0])
          })
        })
        describe('reject action', function () {
          it('should be TEST_REJECT', function () {
            assert.deepEqual({
              source: 'ASYNC_ACTION_REJECT',
              action: {
                type: 'TEST_REJECT',
                rejection: { name: 'a' },
              },
            }, this.syntagme.dispatch.args[1][0])
          })
        })
      })
    })
  })
})
