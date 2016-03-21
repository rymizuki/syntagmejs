export default function actionCreator (type, fn) {
  var result = fn()
  if (result && 'function' == typeof result.then) {
    this.dispatch({
      source: 'ACTION',
      action: { type }
    })
    return result
      .then((action) => {
        if (null == action.type) {
          action.type = (type + this.config.prefix.RESOLVE)
        }
        this.dispatch({
          source: 'ACTION_RESOLVE',
          action,
        })
        return action
      })
      .catch((rejection) => {
        this.dispatch({
          source: 'ACTION_REJECT',
          action: { type: (type + this.config.prefix.REJECT), rejection }
        })
        return rejection
      })
  } else {
    if (null == result.type) {
      result.type = type
    }
    this.dispatch({ source: 'ACTION', action: result, })
  }
  return result
}
