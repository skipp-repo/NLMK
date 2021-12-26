import { Action as ReduxAction, AnyAction } from 'redux'
import type { store } from './store'

export type RootState = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch

export type Handler<State, Action extends ReduxAction = AnyAction> = (
  state: State,
  action: Action,
) => State

export type HandlerAction<T = never> = AnyAction & {
  payload: T
}

export type Handlers<State> = {
  [key: string]: Handler<State, HandlerAction>
}
