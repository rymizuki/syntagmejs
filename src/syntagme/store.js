function includes (array, element) {
  if (Array.prototype.includes) {
    return array.includes(element)
  } else {
    // XXX: Polyfil
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
    var O = Object(array);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) { k = 0; }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (element === currentElement ||
         (element !== element && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  }
}

function remove (array, element) {
  let clone = array
  let index = array.indexOf(element)
  if (index) {
    clone.splice(array.indexOf(element), 1)
  }
  return clone
}

export default class Store {
  constructor () {
    this.subscribers = []
    this.reducers  = []
  }
  subscribe (fn) {
    this.subscribers.push(fn)
  }
  handle (payload) {
    var current_state = null
    for (let i = 0; i < this.reducers.length; i++) {
      let previous_state = current_state || this.state
      let state = this.reducers[i](payload, previous_state)
      if (state) current_state = state
    }
    if (this.state != current_state) {
      this.state = current_state
      for (let i = 0; i < this.subscribers.length; i++) {
        this.subscribers[i](current_state)
      }
    }
  }
  reducer (reducers) {
    if (!Array.isArray(reducers)) {
      reducers = [reducers]
    }
    for (let i = 0; i < reducers.length; i++) {
      let reducer = reducers[i]
      if ('function' != typeof reducer) {
        throw new Error('Reducer may be not function')
      }
      if (includes(this.reducers, reducer)) {
        this.reducers = remove(this.reudcers, reducer)
      }
    }
    this.reducers = this.reducers.concat(reducers)
    return reducers
  }
  listen (cb) {
    if (cb) cb.call(null)
  }
  getState () {
    return this.state
  }
}
