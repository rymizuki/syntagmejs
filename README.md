# syntagme.js

Syntagme is a flux's flamework.

[![Build Status](https://travis-ci.org/rymizuki/syntagmejs.svg?branch=master)](https://travis-ci.org/rymizuki/syntagmejs)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/906eea6b21ab40359f7d325e30a495bf)](https://www.codacy.com/app/ry-mizuki/syntagmejs)
[![Codacy Badge](https://api.codacy.com/project/badge/coverage/906eea6b21ab40359f7d325e30a495bf)](https://www.codacy.com/app/ry-mizuki/syntagmejs)
[![Dependency Status](https://gemnasium.com/rymizuki/syntagmejs.svg)](https://gemnasium.com/rymizuki/syntagmejs)

## Installation

## Example

### Simplest case

```javascript
import syntagme from 'syntagme'

syntagme.reducer(function counterReducer (payload, previous_state={}) {
  switch (payload.action.type) {
    case 'INCREMENT':
      return Object.assign({}, previous_state, { count: (previous_state.count || 0) + 1 })
  }
})

syntagme.subscribe(function listener (state) {
  console.log('count:', state.count)
})

syntagme.ac('INCREMENT') // count: 1
```

### Promise on ActionCreator

```javascript
import syntagme from 'syntagme'

syntagme.reducer(function actionReducer (payload, previous_state={}) {
  switch (payload.action.type) {
    case 'FETCH':
      return Object.assign({}, previous_state, {error: null, loading: true})
    case 'FETCH_RESOLVE':
      return Object.assign({}, previous_state, {error: null, loading: false, payload.action.data})
    case 'FETCH_REJECT':
      return Object.assign({}, previous_state, {error: payload.action.rejection, loading: false, data: null})
  }
})

syntagme.subscribe(function listener (state) {
  console.log('count:', state.count)
})

syntagme.ac('FETCH', function createAction () {
  return new Promise((resolve, reject) => {
    repository.fetch()
      .then((response)   => { resolve({data: response.data}) })
      .catch((rejection) => { reject(rejection) })
  })
})
```

## Documentation

### syntagme.connect()

### syntagme.subscribe(listener)

### syntagme.reducer(reducer)

### syntagme.ac(action_type [, fn])

## License

MIT
