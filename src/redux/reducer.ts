import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './slices/app'
import userSlice from './slices/user'
import translationSlice from './slices/translation'
import storage from './storage'
import { persistReducer } from 'redux-persist'

const userPersistConfig = {
  key: 'user',
  blacklist: ['flags'],
  storage,
}

const appPersistConfig = {
  key: 'app',
  blacklist: ['flags'],
  storage,
}

const reducer = combineReducers({
  app: persistReducer(appPersistConfig, appSlice),
  user: persistReducer(userPersistConfig, userSlice),
  translation: translationSlice,
})

export default reducer
