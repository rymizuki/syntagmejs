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
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
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
    this.listeners = []
    this.reducers  = []
  }
  subscribe (fn) {
    this.listeners.push(fn)
  }
  handle (payload) {
    var state = null
    for (let i = 0; i < this.reducers.length; i++) {
      let previous_state = state || this.state
      state = this.reducers[i](payload, previous_state)
    }
    if (this.state != state) {
      this.state = state
      for (let i = 0; i < this.listeners.length; i++) {
        this.listeners[i](state)
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
  getState () {
    return this.state
  }
}
