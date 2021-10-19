import { combineReducers } from '@reduxjs/toolkit'
import appSlice from './slices/app'
import userSlice from './slices/user'
import translationSlice from './slices/translation'
import autocompleteSlice from './slices/autocomplete'
import vocabsSlice from './slices/vocabs'
import glossariesSlice from './slices/glossaries'
import documentsSlice from './slices/documents'
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

const glossariesPeristConfig = {
  key: 'glossaries',
  blacklist: ['flags'],
  storage,
}

const vocabsPersistConfig = {
  key: 'vocabs',
  blacklist: ['flags'],
  storage,
}

const documentsPeristConfig = {
  key: 'documents',
  blacklist: ['flags'],
  storage,
}

const reducer = combineReducers({
  app: persistReducer(appPersistConfig, appSlice),
  user: persistReducer(userPersistConfig, userSlice),
  autocomplete: autocompleteSlice,
  translation: translationSlice,
  vocabs: persistReducer(vocabsPersistConfig, vocabsSlice),
  glossaries: persistReducer(glossariesPeristConfig, glossariesSlice),
  documents: persistReducer(documentsPeristConfig, documentsSlice),
})

export default reducer
