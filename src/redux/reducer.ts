import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './slices/app'
import userSlice from './slices/user'

const reducer = combineReducers({
  app: appSlice,
  user: userSlice,
})

export default reducer
