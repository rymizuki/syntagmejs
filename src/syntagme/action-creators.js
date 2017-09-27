// @flow
import type {
  Source,
  Action,
  ActionType,
  PayloadPromise,
  Payload,
} from 'types'

type Promise = {
  then: (onResolve: (response: *) => *)  => *,
  catch: (onReject: (rejection: *) => *) => *
}
type ActionCreatorFunc = (args: *) => Promise | Action

import isPromise from 'syntagme/utils/is-promise'
import isObject  from 'syntagme/utils/is-object'

const SOURCE_ACTION               = 'ACTION'
const SOURCE_ASYNC_ACTION         = 'ASYNC_ACTION'
const SOURCE_ASYNC_ACTION_RESOLVE = 'ASYNC_ACTION_RESOLVE'
const SOURCE_ASYNC_ACTION_REJECT  = 'ASYNC_ACTION_REJECT'

class ActionCreator {
  type:    ActionType
  creator: ActionCreatorFunc
  options: Object
  constructor (
    type:    ActionType,
    creator: ActionCreatorFunc,
    options: Object = {}) {
    this.type    = type
    this.creator = creator
    this.options = options
  }
  create (stuff: Object): Payload {
    const type: ActionType             = this.type
    let   data: Promise | Object = this.creator(stuff)

    const source = isPromise(data) ? SOURCE_ASYNC_ACTION :
                   isObject(data)  ? SOURCE_ACTION :
                   null
    if (null == source)
      throw new Error('ActionCreator mus be returned plain-object or promise.')

    if (source == SOURCE_ASYNC_ACTION) {
      const promise: PayloadPromise = data
        .then((response)  => { return this.handleResolveAction(response) })
        .catch((rejection) => { throw this.handleRejectAction(rejection) })
      return this.createPayload(source, type, stuff, promise)
    } else {
      return this.createPayload(source, type, data)
    }
  }

  createPayload (source, type, data, promise?: PayloadPromise): Payload {
    const payload: Payload = {
      source,
      action: { type, data },
    }
    if (promise) payload.promise = promise
    return payload
  }
  handleResolveAction (response): Payload {
    return this.createPayload(
      SOURCE_ASYNC_ACTION_RESOLVE,
      `${ this.type }_RESOLVE`,
      response
    )
  }
  handleRejectAction (rejection): Payload {
    return this.createPayload(
      SOURCE_ASYNC_ACTION_REJECT,
      `${ this.type }_REJECT`,
      rejection,
    )
  }
}

class ActionCreators {
  creators: Array<ActionCreator>
  constructor () {
    this.creators = []
  }
  find (type: ActionType): (ActionCreator | null) {
    for (let i = 0; i < this.creators.length; i++) {
      let creator = this.creators[i]
      if (creator.type == type) return creator
    }
    return null
  }
  includes (type: ActionType): boolean {
    return !!this.find(type)
  }
  register (type: string, ac: ActionCreatorFunc) {
    if (this.includes(type))
      throw new Error(`Already exists action "${ type }" in ActionCreator.`)
    this.creators.push(new ActionCreator(type, ac))
  }
}

export default ActionCreators
