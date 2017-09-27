// @flow
import type {
  Reducer,
  Reducers,
  Config,
  State,
  Payload,
  Subscriber,
  Listener,
  ActionCreator,
} from 'types'

import Dispatcher     from './dispatcher'
import Store          from './store'
import config         from './config'
import handleAction   from './regacy-handle-action'
import ActionCreators from './action-creators'
import ActionHandler  from './action-handler'

export default class Syntagme {
  store:          Store
  actions:        ActionCreators
  actionHandler:  ActionHandler
  config:         Config
  constructor (args: Object = {}) {
    this.store          = args.store          || new Store
    this.actions        = args.actionCreators || new ActionCreators
    this.actionHandler  = args.actionHandler  || new ActionHandler({
      dispatcher: args.dispatcher || new Dispatcher
    })
    this.config         = config
    this.connect()
  }
  connect () {
    this.actionHandler.connect(this.store)
  }
  listen (listener?: Listener) {
    this.store.listen(() => {
      this.actionHandler.start()
      if (listener) listener.call(null)
    })
  }
  subscribe(subscriber: Subscriber) {
    this.store.subscribe(subscriber)
  }
  getState () :State {
    return this.store.getState()
  }
  reducer (reducer: (Reducer | Reducers)) {
    return this.store.reducer(reducer)
  }

  actionCreator (type: string, ac: ActionCreator) {
    this.actions.register(type, ac)
  }
  action (type: string, args?: Object) {
    const creator = this.actions.find(type)
    if (creator == null) throw new Error(`Action ${ type } is not defined.`)
    const payload = creator.create(args || {})
    return this.actionHandler.dispatch(payload)
  }

  // regacy api
  dispatch (payload: *) {
    if (!this.actionHandler.isStarted()) {
      throw new Error('syntagme was not listening. call `app.listen()`')
    }
    this.actionHandler.dispatcher.dispatch(payload)
  }
  handleAction (type: string, actionCreator: ActionCreator) {
    return handleAction.call(this, type, actionCreator)
  }
  ac (type: string, actionCreator: ActionCreator) {
    return this.handleAction(type, actionCreator)
  }
}
