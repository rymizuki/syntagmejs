// @flow
import assert from 'power-assert'
import sinon  from 'sinon'
import Q      from 'q'

import syntagme from 'syntagme'

const { Syntagme } = syntagme
import type { SinonSpy } from 'sinon'

describe('syntagme', () => {
  let app: Syntagme
  beforeEach(() => {
    app = syntagme()
  })
  describe('initialize', () => {
    it('should be return Syntagme instance', () => {
      assert.ok(app instanceof Syntagme)
    })
    it('should be connected', () => {
      assert.ok(app.connected_fg)
    })
    it('should not be listen', () => {
      assert.ok(!app.listening_fg)
    })
    describe('getState', () => {
      it('should be empty', () => {
        assert.equal(app.getState(), null)
      })
    })
  })
  describe('listen', () => {
    beforeEach(() => {
      app.listen()
    })
    describe('exec dispatch', () => {
      let spy: SinonSpy
      beforeEach(() => {
        spy = sinon.spy(app.dispatcher, 'dispatch')
      })
      afterEach(() => {
        spy.restore()
      })

      let payload = { source: 'ACTION', action: { type: 'TEST' }}
      beforeEach(() => {
        app.dispatch(payload)
      })
      it('should be call dispatcher.dispatch', () => {
        assert.deepEqual(spy.args[0][0], payload)
      })
    })
    describe('exec handleAction', () => {
      let spy: SinonSpy
      beforeEach(() => {
        spy = sinon.spy(app.dispatcher, 'dispatch')
      })
      afterEach(() => {
        spy.restore()
      })

      describe('when action is object', () => {
        beforeEach(() => {
          app.handleAction('TEST', { message: 'example' })
        })
        it('should be dispatch action', () => {
          assert.ok(spy.calledOnce)
          assert.deepEqual(spy.args[0][0], {
            source: 'ACTION',
            action: {
              type: 'TEST',
              message: 'example',
            }
          })
        })
      })
      describe('when action is promise', () => {
        describe('when resolved action', () => {
          beforeEach(() => {
            return app.handleAction('TEST', () => {
              return Q.when({ message: 'example' })
            })
          })
          it('should be dispatch async-paylod', () => {
            assert.deepEqual(spy.args[0][0], {
              source: 'ASYNC_ACTION',
              action: {
                type: 'TEST'
              }
            })
          })
          it('should be dispatch resolve-payload', () => {
            assert.deepEqual(spy.args[1][0], {
              source: 'ASYNC_ACTION_RESOLVE',
              action: {
                type: 'TEST_RESOLVE',
                message: 'example'
              }
            })
          })
        })
        describe('when rejected action', () => {
          beforeEach(() => {
            return app.handleAction('TEST', () => {
              return Q.Promise((resolve, reject) => {
                return reject({ message: 'example' })
              })
            })
          })
          it('should be dispatch async-paylod', () => {
            assert.deepEqual(spy.args[0][0], {
              source: 'ASYNC_ACTION',
              action: {
                type: 'TEST'
              }
            })
          })
          it('should be dispatch reject-payload', () => {
            assert.deepEqual(spy.args[1][0], {
              source: 'ASYNC_ACTION_REJECT',
              action: {
                type: 'TEST_REJECT',
                rejection: {
                  message: 'example',
                }
              }
            })
          })
        })
      })
    })
    describe('subscribe', () => {
      let subscriber
      let stub
      beforeEach(() => {
        stub = sinon.stub()
        subscriber = function (state) {
          stub(state)
        }
      })
      beforeEach(() => {
        app.subscribe(subscriber)
      })
      describe('reducer', () => {
        describe('when specify function', () => {
          let reducer
          beforeEach(() => {
            reducer = function (payload, state) {
              return { message: 'hello' }
            }
            app.reducer(reducer)
          })
          it('should be registered in store', () => {
            assert.equal(reducer, app.store.reducers[0])
          })
        })
        describe('when specify array', () => {
          let reducer
          beforeEach(() => {
            reducer = [
              function (payload, state) { return { message: 'hello' } },
              function (payload, state) { return { message: 'hello world' } },
            ]
            app.reducer(reducer)
          })
          it('should be all registered in store', () => {
            assert.deepEqual(reducer, app.store.reducers)
          })
        })

        describe('exec dispatch', () => {
          beforeEach(() => {
            app.reducer(function (payload, state = {}) {
              state.message = 'a'
              return state
            })
            app.reducer([
              function (payload, state) {
                state.message += 'b'
                return state
              },
              function (payload, state) {
                state.message += 'c'
                return state
              },
            ])
            app.reducer(function (payload, state) {
              state.message += 'd'
              return state
            })
            app.handleAction('TEST', {})
          })
          it('should be executed in order', () => {
            assert.deepEqual({ message: 'abcd' }, app.getState())
          })
        })
      })
    })
  })
})
