// @flow

import type {
  ActionHandler,
  Payload,
} from '../types'

let dispatching_fg: boolean = false

export default class Dispatcher {
  handlers: Array<ActionHandler>
  constructor () {
    this.handlers = []
  }
  dispatch (payload: Payload) {
    if (payload.action == null || payload.action.type == null) {
      throw new Error('ActionType is not defined!')
    }
    if (dispatching_fg) {
      throw new Error(`Dispatcher in progress.\n "${ payload.action.type }" cannot dispatch.`)
    }
    console.debug('[DISPATCHER]', payload.source, payload.action.type, payload)
    try {
      dispatching_fg = true
      for (let i = 0; i < this.handlers.length; i++) {
        this.handlers[i](payload)
      }
    } catch (err) {
      throw err // rethrow
    } finally {
      dispatching_fg = false
    }
  }
  register (handler: ActionHandler) {
    this.handlers.push(handler)
  }
}
