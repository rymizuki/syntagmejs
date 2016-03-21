let dispatching_fg = false

export default class Dispatcher {
  constructor () {
    this.handlers = []
  }
  dispatch (payload) {
    console.debug('[DISPATCHER]', payload.source, payload.action.type, payload)
    if (payload.action.type == null) {
      throw new Error('Action type is not defined!')
    }
    if (dispatching_fg) {
      throw new Error('Dispatcher in progress')
    }
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
  register (fn) {
    this.handlers.push(fn)
  }
}
