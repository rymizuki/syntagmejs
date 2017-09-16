import type {
  ActionCreatorFunc,
  ActionPromise,
} from 'types'

export default function actionCreator (
  type:  string,
  stuff: ActionCreatorFunc
  ) :ActionPromise | void {
  if ('function' === typeof stuff) {
    this.dispatch({
      source: 'ASYNC_ACTION',
      action: { type }
    })
    var result: ActionPromise = stuff()
    if (null == result || 'function' !== typeof result.then) {
      throw new Error('Action must be return promise object.')
    }
    return result
      .then((action) => {
        if (null == action.type) {
          action.type = (type + this.config.prefix.RESOLVE)
        }
        this.dispatch({
          source: 'ASYNC_ACTION_RESOLVE',
          action,
        })
        return action
      })
      .catch((rejection) => {
        this.dispatch({
          source: 'ASYNC_ACTION_REJECT',
          action: { type: (type + this.config.prefix.REJECT), rejection }
        })
        return rejection
      })
  } else {
    if ('object' !== typeof stuff || Array.isArray(stuff)) {
      throw new Error('Action must be Object or Function.')
    }
    if (null == stuff.type) {
      stuff.type = type
    }
    this.dispatch({ source: 'ACTION', action: stuff, })
  }
}
