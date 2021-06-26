import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './slices/app'

const reducer = combineReducers({
  app: appSlice,
})

export default reducer
