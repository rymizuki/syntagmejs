# syntagme.js

Syntagme is a flux's flamework.

[![npm version](https://badge.fury.io/js/syntagme.svg)](http://badge.fury.io/js/syntagme)
[![Bower version](https://badge.fury.io/bo/syntagme.svg)](http://badge.fury.io/bo/syntagme)
[![Build Status](https://travis-ci.org/rymizuki/syntagmejs.svg?branch=master)](https://travis-ci.org/rymizuki/syntagmejs)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/906eea6b21ab40359f7d325e30a495bf)](https://www.codacy.com/app/ry-mizuki/syntagmejs)
[![Codacy Badge](https://api.codacy.com/project/badge/coverage/906eea6b21ab40359f7d325e30a495bf)](https://www.codacy.com/app/ry-mizuki/syntagmejs)
[![Dependency Status](https://gemnasium.com/rymizuki/syntagmejs.svg)](https://gemnasium.com/rymizuki/syntagmejs)

## Installation

[bower](http://bower.io/):
```
bower install --save syntagme
```

[npm](https://www.npmjs.com/):
```
npm install --save syntagme
```

## Example

### Simplest case

```javascript
import syntagme from 'syntagme'

const app = syntagme()

app.actionCreator('INCREMENT', () => {
  return { value: 1 }
})

app.reducer(function counterReducer (payload, previous_state={}) {
  switch (payload.action.type) {
    case 'INCREMENT':
      return Object.assign({}, previous_state, { count: payload.action.value + 1 })
  }
})

app.listen()

app.subscribe(function listener (state) {
  console.log('count:', state.count)
})

app.action('INCREMENT')
console.log(app.getState().count) // 2
```

### Promise on ActionCreator

```javascript
import syntagme from 'syntagme'

const app = syntagme()

app.actionCreator('FETCH', ({ type }) => {
  return new Promise((resolve, reject) => {
    http.get(`/api/message?type=${ type }`)
      .then((response)   => { resolve({data: response.data}) })
      .catch((rejection) => { reject(rejection) })
  })
})

app.reducer(function actionReducer (payload, previous_state={}) {
  switch (payload.action.type) {
    case 'FETCH':
      return Object.assign({}, previous_state, {error: null, loading: true})
    case 'FETCH_RESOLVE':
      return Object.assign({}, previous_state, {error: null, loading: false, payload.action.data})
    case 'FETCH_REJECT':
      return Object.assign({}, previous_state, {error: payload.action.rejection, loading: false, data: null})
  }
})
app.listen()

app.subscribe(function listener (state) {
  console.log('count:', state.count)
})

app.action('FETCH', { type: 'greeting' })
```

## Documentation

### app.listen()

Subscribe to state and start executing dispatcher.
If dispatch is executed before listen, it gets an error.

### app.subscribe(listener: (state) => void)

Subscribe to store updates.
`listener` is executed when state is updated.

### app.reducer(reducer: (payload, state) => (state | null))

Register the reducer.
Reducers are executed in the order in which they are registered.

If you do not return the new state, subscribe will not be executed.

### app.actionCreator(type: ActionType, actionCreator: () => Promise | null)

Register the ActionCreator.
Dispatch the evaluation result of the specified function as Action.

When returning Promise, `_RESOLVE` when resolving, and `_REJECT` when rejecting are combined with type and dispatched.

### app.action(type: ActionType, args)

Dispatch the ActionCreator registered based on type.

An error occurs if you specify an unregistered ActionType.

## License

MIT
