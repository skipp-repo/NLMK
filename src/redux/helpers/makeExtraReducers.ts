import makeReducers, { ExtraReducers } from './makeReducers'
import { AsyncThunk } from '@reduxjs/toolkit'

export type MakeExtraReducers = {
  action: AsyncThunk<any, any, any>
  extraReducers?: ExtraReducers
  ignoreError?: boolean | undefined
  apiRequest?: boolean
}

export default ({ action, extraReducers, ignoreError, apiRequest }: MakeExtraReducers): object => {
  const typePrefixArr = action.typePrefix.split('/')
  const name = typePrefixArr[typePrefixArr.length - 1]

  const actions = {
    pending: action.pending,
    fulfilled: action.fulfilled,
    rejected: action.rejected,
  }

  return makeReducers({
    actions,
    actionName: name,
    extraReducers,
    ignoreError,
    apiRequest,
  })
}
