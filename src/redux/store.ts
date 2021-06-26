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
// @ts-ignore
import createChromeStorage from 'redux-persist-chrome-storage'
import reducer from './reducer'
import localStorage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  whitelist: [],
  storage:
    location.hostname === 'localhost' ? localStorage : createChromeStorage(window.chrome, 'sync'),
}

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: true,
})

const persistor = persistStore(store)

export { store, persistor }
