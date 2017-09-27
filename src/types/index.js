// @flow

export type Reducer = (payload: Payload, state: State) => State
export type Reducers = Array<Reducer>

export type Config = {
  prefix: Object,
}

export type State = Object

export type Source =  'SYNTAGME'             |
                      'ACTION'               |
                      'ASYNC_ACTION'         |
                      'ASYNC_ACTION_RESOLVE' |
                      'ASYNC_ACTION_REJECT'

export type Subscriber = (state: State) => void
export type Listener = () => void
export type ActionHandler = (payload: Payload) => void

export type ActionCreator = Object | () => Object

export type ActionType = string

export type Action = {
  type: ActionType,
  data: Object
}

export type Payload = {
  source: Source,
  action: Action,
  promise?: PayloadPromise,
}

export type PayloadPromise = {
  then: (onResolve: (payload: Payload) => *) => *,
  catch: (onReject: (payload: Payload) => *) => *,
}