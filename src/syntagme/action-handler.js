// @flow
import type {
  Payload
} from 'types'
import type Dispatcher from './dispatcher'
import type Store      from './store'

export default class ActionHandler {
  dispatcher:   Dispatcher
  connected_fg: boolean
  started_fg:   boolean
  constructor ({ dispatcher }: { dispatcher: Dispatcher }) {
    this.dispatcher = dispatcher
    this.connected_fg = false
  }
  connect (store: Store) {
    this.dispatcher.register(store.handle.bind(store))
    this.connected_fg = true
  }
  dispatch (payload: Payload) {
    this.dispatcher.dispatch(payload)

    if (payload.source == 'ASYNC_ACTION' && payload.promise != null) {
      const promise = payload.promise
      delete payload.promise
      return promise
        .then((payload: Payload) => {
          this.dispatcher.dispatch(payload)
          return payload
        })
        .catch((payload: Payload) => {
          this.dispatcher.dispatch(payload)
          throw payload
        })
    }
  }
  start() {
    this.started_fg = true
    this.dispatcher.dispatch({
      source: 'SYNTAGME',
      action: {
        type: 'INIT',
        data: {}
      }
    })
  }
  isStarted () :boolean {
    return this.started_fg
  }
}