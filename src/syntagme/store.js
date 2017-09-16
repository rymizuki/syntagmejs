// @flow

import type {
  Subscriber,
  Reducer,
  Reducers,
  Payload,
  State,
  Listener,
} from '../types'

import includes from './utils/includes'
import remove   from './utils/remove'

export default class Store {
  subscribers: Array<Subscriber>
  reducers: Reducers
  state: State
  constructor () {
    this.subscribers = []
    this.reducers  = []
  }
  subscribe (subscriber: Subscriber) {
    this.subscribers.push(subscriber)
  }
  handle (payload: Payload) {
    let current_state: ?State = null
    for (let i = 0; i < this.reducers.length; i++) {
      const previous_state = current_state || this.state
      const state = this.reducers[i](payload, previous_state)
      if (state) current_state = state
    }
    if (current_state && this.state != current_state) {
      this.state = current_state
      for (let i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](current_state)
      }
    }
  }
  reducer (stuff: (Reducer | Reducers)): Reducers {
    const reducers: Reducers = Array.isArray(stuff) ? stuff : [ stuff ]
    for (let i = 0; i < reducers.length; i++) {
      const reducer = reducers[i]
      if ('function' != typeof reducer) {
        throw new Error('Reducer may be not function')
      }
      if (includes(this.reducers, reducer)) {
        this.reducers = remove(this.reducers, reducer)
      }
    }
    this.reducers = this.reducers.concat(reducers)
    return reducers
  }
  listen (listener: Listener) {
    if (listener) listener.call(null)
  }
  getState (): State {
    return this.state || null
  }
}
