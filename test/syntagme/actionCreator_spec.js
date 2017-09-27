// @flow
import type {
  Action,
} from 'types'

import syntagme from 'syntagme'

describe('syntagme.actionCreator', () => {
  var app
  beforeEach(() => {
    app = syntagme()
  })
  describe('specify action and function', () => {
    var ationCreator: (action: Action) => void
    beforeEach(() => {
      function actionCreator (action) {
      }
      app.actionCreator('TEST', actionCreator)
    })
    it('should be registered　in app.actionCreators')
  })
  describe('specify action but not string', () => {
    it('should be throw exception')
  })
  describe('specify action but not string', () => {
    it('should be throw exception')
  })
})
