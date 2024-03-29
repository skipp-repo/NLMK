import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import reducer from './reducer'
import storage from '../storage'
import { getStatus } from './slices/user'

const persistConfig = {
  key: 'root',
  whitelist: [],
  storage,
}

const middlewares = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: true,
})

const persistor = persistStore(store, null)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
