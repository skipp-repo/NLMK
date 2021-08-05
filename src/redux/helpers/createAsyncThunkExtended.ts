import { createAsyncThunk } from '@reduxjs/toolkit'
import getUserToken from '../../utils/getUserToken'
import { RootState } from '../types'

type ReduxApi = {
  getState(): any
  dispatch(): Promise<any>
}

type SecondArg = {
  state: any
  token: string
  dispatch: Function
  getState: Function
}

type CB = (params: any, { state, token, dispatch, getState }: SecondArg) => void

const wrapThunk = (cb: CB) => {
  return async (params, api) => {
    try {
      const { getState, dispatch } = api
      const state = getState() as RootState
      const { user } = state

      const token = user.token || (await getUserToken())

      return cb(params, { token, state, getState, dispatch })
    } catch (error) {
      throw error
    }
  }
}

const createAsyncThunkExtended = (name, func: CB) => {
  return createAsyncThunk(name, wrapThunk(func))
}

export default createAsyncThunkExtended
