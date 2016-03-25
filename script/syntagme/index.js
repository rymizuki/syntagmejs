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
    this.connect()
  }
  connect () {
    this.dispatcher.register(this.store.handle.bind(this.store))
  }
  subscribe(fn) {
    this.store.subscribe(fn)
  }
  reducer (reducer) {
    return this.store.reducer(reducer)
  }
  dispatch (payload) {
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
