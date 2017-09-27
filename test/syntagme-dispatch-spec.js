// @flow

import assert from 'power-assert'
import sinon  from 'sinon'
import Q      from 'q'

import syntagme from 'syntagme'

import type { SinonStub } from 'sinon'
const { Syntagme } = syntagme

describe('syntagme.dispatch', function () {
  let handler: SinonStub
  let stuff:   Syntagme
  beforeEach(function (done) {
    stuff = syntagme()
    handler = sinon.stub()
    stuff.actionHandler.dispatcher.register(handler)
    stuff.listen(done)
  })
  describe('execute with payload', function () {
    beforeEach(function () {
      stuff.dispatch({
        source: 'ACTION',
        action: {type: 'TEST_ACTION', data: {}}
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
          action: {type: 'INIT', data: {}},
        }, handler.args[0][0])
        assert.deepEqual({
          source: 'ACTION',
          action: {type: 'TEST_ACTION', data: {}},
        }, handler.args[1][0])
      })
    })
  })
})
