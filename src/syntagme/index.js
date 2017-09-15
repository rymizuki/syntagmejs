// @flow

import type {
  Reducer,
  Config,
  State,
  Payload,
  Subscriber,
  Listener,
  ActionCreator,
} from '../types'

import Dispatcher   from './dispatcher'
import Store        from './store'
import config       from './config'
import createAction from './action-creator'

class Syntagme {
  store: Store
  dispatcher: Dispatcher
  config: Config
  listening_fg: boolean
  connected_fg: boolean
  constructor (args: Object = {}) {
    this.store      = args.store      || new Store
    this.dispatcher = args.dispatcher || new Dispatcher
    this.config     = config
    this.listening_fg = false
    this.connect()
  }
  connect () {
    this.dispatcher.register(this.store.handle.bind(this.store))
    this.connected_fg = true
  }
  subscribe(subscriber: Subscriber) {
    this.store.subscribe(subscriber)
  }
  listen (listener: Listener) {
    this.store.listen(() => {
      this.listening_fg = true
      this.dispatcher.dispatch({
        source: 'SYNTAGME',
        action: {type: 'INIT'}
      })
      if (listener) listener.call(null)
    })
  }
  getState () :State {
    return this.store.getState()
  }
  reducer (reducer: Reducer) {
    return this.store.reducer(reducer)
  }
  dispatch (payload: Payload) {
    if (!this.listening_fg) {
      throw new Error('syntagme was not listening. call `app.listen()`')
    }
    this.dispatcher.dispatch(payload)
  }
  handleAction (type: string, actionCreator: ActionCreator) {
    return createAction.call(this, type, actionCreator)
  }
  ac (type: string, actionCreator: ActionCreator) {
    return this.handleAction(type, actionCreator)
  }

}

function syntagme () :Syntagme {
  return new Syntagme()
}

module.exports = syntagme
module.exports.Syntagme = Syntagme
