import { createAsyncThunk } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import getUserToken from '../../utils/getUserToken'
import { RootState } from '../types'

type ReduxApi = {
  getState(): any
  dispatch(): Promise<any>
}

type SecondArg = {
  state: any
  dispatch?: Dispatch
  getState: Function
}

type CB<T> = (params: T, { state, dispatch, getState }: SecondArg) => void

const wrapThunk = <T>(cb: CB<T>) => {
  return async (params, api) => {
    try {
      const { getState, dispatch } = api
      const state = getState() as RootState

      return cb(params, { state, getState, dispatch })
    } catch (error) {
      throw error
    }
  }
}

const createAsyncThunkExtended = <A = any, B = void>(name, func: CB<B>) => {
  // @ts-ignore
  return createAsyncThunk<A, B, SecondArg>(name, wrapThunk(func))
}

export default createAsyncThunkExtended
