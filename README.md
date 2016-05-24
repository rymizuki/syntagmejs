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

app.ac('INCREMENT', {value: 1}) // count: 2
```

### Promise on ActionCreator

```javascript
import syntagme from 'syntagme'

const app = syntagme()

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

app.ac('FETCH', function createAction () {
  return new Promise((resolve, reject) => {
    repository.fetch()
      .then((response)   => { resolve({data: response.data}) })
      .catch((rejection) => { reject(rejection) })
  })
})
```

## Documentation

### app.subscribe(listener)

### app.reducer(reducer)

### app.ac(action_type [, object|promisify])

## License

MIT
