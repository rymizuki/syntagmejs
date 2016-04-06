import Dispatcher   from './dispatcher'
import Store        from './store'
import config       from './config'
import createAction from './action-creator'
import utils        from './utils'

class Syntagme {
  constructor (args = {}) {
    this.store      = args.store      || new Store
    this.dispatcher = args.dispatcher || new Dispatcher
    this.utils      = utils
    this.config     = config
    this.listening_fg = false
    this.connect()
  }
  connect () {
    this.dispatcher.register(this.store.handle.bind(this.store))
    this.connected_fg = true
  }
  subscribe(fn) {
    this.store.subscribe(fn)
  }
  listen (cb) {
    this.store.listen(() => {
      this.listening_fg = true
      this.dispatcher.dispatch({source: 'SYNTAGME', action: {type: 'INIT'}})
      if (cb) cb.call(null)
    })
  }
  reducer (reducer) {
    return this.store.reducer(reducer)
  }
  dispatch (payload) {
    if (!this.listening_fg) {
      throw new Error('syntagme was not listening. call `app.listen()`')
    }
    this.dispatcher.dispatch(payload)
  }
  handleAction (type, fn) {
    return createAction.call(this, type, fn)
  }
  ac (type, fn) {
    return this.handleAction(type, fn)
  }

}

function syntagme () {
  return new Syntagme()
}

module.exports = syntagme
module.exports.Syntagme = Syntagme
